package com.inas.web.pmcontroller;

/**
 * Created by WangJm on 2015/5/27.
 */

import com.inas.model.data.DataHistory;
import com.inas.model.data.DataHistoryVO;
import com.inas.service.data.DataHistoryService;
import com.inas.util.DateUtil;
import com.inas.util.JSONUtil;
import com.inas.util.WrapperUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/dataHistory")
@Controller
public class DataHistoryController {
    @Resource(name = "dataHistoryService")
    private DataHistoryService dataHistoryService;

    @RequestMapping(value = "/getDataHistoryList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataHistoryList(HttpServletRequest request, DataHistoryVO dataHistory) {
        List jsonList = null;
        List infoList = new ArrayList();
        List dataList = new ArrayList();
        if(!dataHistory.getJsonResult().equals("")){
            jsonList = JSONUtil.fromJson(dataHistory.getJsonResult(), ArrayList.class);
            for(int i=0;i<jsonList.size();i++){
                Map row = (Map)jsonList.get(i);
                dataHistory.setData_item_id(WrapperUtil.parseObjectToInteger(row.get("id")));
                infoList.add(dataHistoryService.getDataHistoryInfo(dataHistory));
                dataList.add(dataHistoryService.getDataHistoryList(dataHistory));
            }
        }else{
            infoList.add(dataHistoryService.getDataHistoryInfo(dataHistory));
            dataList.add(dataHistoryService.getDataHistoryList(dataHistory));
        }
        return JSONUtil.toExtResultJson(infoList,dataList);
    }

    @RequestMapping(value = "/getDataHistoryStatistics", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataHistoryStatistics(HttpServletRequest request, DataHistoryVO dataHistoryVO) {
        DataHistory dataHistory = new DataHistory();
        List jsonList = null;
        dataHistory.setData_item_id(dataHistoryVO.getData_item_id());
        if (!dataHistoryVO.getJsonResult().equals("")) {
            jsonList = JSONUtil.fromJson(dataHistoryVO.getJsonResult(), ArrayList.class);
        }else{
            jsonList = new ArrayList();
            Map row = new HashMap();
            row.put("id",dataHistoryVO.getData_item_id());
            jsonList.add(row);
        }
        try {
            dataHistoryVO.setTo_date(DateUtil.parseStringToDate(dataHistoryVO.getSto_date(), DateUtil.FORMAT_SECOND));
            dataHistoryVO.setFrom_date(DateUtil.parseStringToDate(dataHistoryVO.getSfrom_date(), DateUtil.FORMAT_SECOND));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return JSONUtil.toExtResultJson(dataHistoryService.getDataHistoryStatistics(dataHistoryVO,jsonList));

    }
}
