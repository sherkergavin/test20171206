package com.inas.web.pmcontroller;

import com.inas.model.data.Bind;
import com.inas.service.data.DataCurrentService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by ZS on 2015/5/7.
 */

@RequestMapping("/data")
@Controller
public class DataCurrentController {
    @Resource(name="dataCurrentService")
    private DataCurrentService dataCurrentService;



    @RequestMapping(value = "/getDataCurrentMenu", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataCurrentMenu() {
            List list=dataCurrentService.getCurrentDataMenu();
        return JSONUtil.toExtFormJson(true, null, list);
    }
    @RequestMapping(value = "/getCurrentData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getCurrentData(HttpServletRequest request,Bind bind) {


        List list=dataCurrentService.getCurrentData(bind.getId(),bind.getType());
        return  JSONUtil.toExtFormJson(true,null,list);
    }

    @RequestMapping(value = "/getCurrentDataByStation", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getCurrentDataByStation(HttpServletRequest request,Integer station_id) {

        return  JSONUtil.toExtFormJson(true,null,dataCurrentService.getCurrentDataByEntityId(station_id));
    }

}
