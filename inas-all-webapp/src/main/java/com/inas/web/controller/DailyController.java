package com.inas.web.controller;

import com.inas.model.data.DataItem;
import com.inas.model.work.DailyItem;
import com.inas.model.work.DailyItemVO;
import com.inas.model.work.DailyShiftVO;
import com.inas.service.system.UserService;
import com.inas.service.work.DailyService;
import com.inas.service.work.DailyShiftService;
import com.inas.util.DateUtil;
import com.inas.util.JSONUtil;
import com.inas.util.WrapperUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by WangJm on 2015/8/26.
 */
@RequestMapping("/work")
@Controller
public class DailyController {

    @Resource
    private DailyService dailyService;

    @Resource
    private UserService userService;

    @RequestMapping(value = "/getDailyItem", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDailyItem(HttpServletRequest request,DailyItemVO dailyItemVO) throws ParseException {
        if(null == dailyItemVO.getSearchDate() || "".equals(dailyItemVO.getSearchDate())){
            dailyItemVO.setDaily_date(DateUtil.parseStringToDate(DateUtil.parseDateToString(DateUtil.FORMAT_SECOND), DateUtil.FORMAT_DATE));
        }else{
            dailyItemVO.setDaily_date(DateUtil.parseStringToDate(dailyItemVO.getSearchDate(),DateUtil.FORMAT_DATE));
        }
        return JSONUtil.toExtResultJson(dailyService.getDailyItemListByDay(dailyItemVO));
    }


    @RequestMapping(value = "/saveDailyItem", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveDailyItem(HttpServletRequest request,DailyItemVO dailyItemVO){
        List jsonList  = JSONUtil.fromJson(dailyItemVO.getJsonResult(), ArrayList.class);
        List<DailyItem> insertList = new ArrayList<>();
        List<DailyItem> updateList = new ArrayList<>();
        String result = null;
        DailyItem dailyItem = null;
        for(int i=0;i<jsonList.size();i++){
            Map row = (Map)jsonList.get(i);
            dailyItem = new DailyItem();
            dailyItem.setId(WrapperUtil.parseObjectToInteger(row.get("id")));
            dailyItem.setSystem_organization_id(WrapperUtil.parseObjectToInteger(row.get("system_organization_id")));
            dailyItem.setEquip(WrapperUtil.parseObjectToString(row.get("equip")));
            dailyItem.setContent(WrapperUtil.parseObjectToString(row.get("content")));
            try {
                dailyItem.setDaily_date(DateUtil.parseStringToDate(DateUtil.parseDateToString(DateUtil.FORMAT_SECOND), DateUtil.FORMAT_DATE));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            dailyItem.setEquip(WrapperUtil.parseObjectToString(row.get("equip")));
            dailyItem.setDaily_time(WrapperUtil.parseObjectToString(row.get("daily_time")));
            dailyItem.setUser_id(userService.getUserByUserName(dailyItemVO.getEditor()).getId());
            dailyItem.setCreate_date(dailyItemVO.getCreate_date());
            dailyItem.setCreator(dailyItemVO.getCreator());
            dailyItem.setEdit_date(dailyItemVO.getEdit_date());
            dailyItem.setEditor(dailyItemVO.getEditor());
            if(null == dailyItem.getId() || "".equals(dailyItem.getId()) || dailyItem.getId() == 0){
                insertList.add(dailyItem);
            }else{
                updateList.add(dailyItem);
            }
        }
        try{
            result = JSONUtil.toExtFormJson(dailyService.saveDailyItem(insertList, updateList),"不可修改非本人添加的记录");
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }

}