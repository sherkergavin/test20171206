package com.inas.web.amcontroller;

import com.inas.model.alarm.AlarmActive;
import com.inas.model.alarm.AlarmActiveVO;
import com.inas.model.alarm.AlarmHistory;
import com.inas.model.alarm.AlarmHistoryVO;
import com.inas.service.alarm.AlarmService;
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
import java.util.List;

/**
 * Created by WangJm on 2015/12/17.
 */
@RequestMapping("/alarm/show")
@Controller
public class AlarmShowController {

    @Resource(name="alarmService")
    private AlarmService alarmService;

    @RequestMapping(value = "/getAlarmActive", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getAlarmActive(HttpServletRequest request ,AlarmActiveVO alarmActiveVO){
        return JSONUtil.toExtResultJson(alarmService.getAlarmActive(alarmActiveVO));
    }

    @RequestMapping(value = "/getAlarmHistory", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getAlarmHistory(HttpServletRequest request , AlarmHistoryVO alarmHistoryVO) throws ParseException {
        alarmHistoryVO.setStart_time(DateUtil.parseStringToDate(alarmHistoryVO.getEstart_time(), DateUtil.FORMAT_SECOND));
        alarmHistoryVO.setEnd_time(DateUtil.parseStringToDate(alarmHistoryVO.getEend_time(), DateUtil.FORMAT_SECOND));
        return JSONUtil.toExtResultJson(alarmService.getAlarmHistory(alarmHistoryVO));
    }

    @RequestMapping(value = "/updateAlarmActiveToHistory",method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateAlarmActiveToHistory(HttpServletRequest request,String jsonResult){
        String result = null;
        List jsonList  =JSONUtil.fromJson(jsonResult,ArrayList.class);
        AlarmActive alarmActive = null;
        AlarmHistory alarmHistory = null;
        List<AlarmActive> alarmActives = new ArrayList();
        List<AlarmHistory> alarmHistories = new ArrayList();
        for(int i=0;i<jsonList.size();i++){
            alarmActive = new AlarmActive();
            alarmHistory = new AlarmHistory();
            alarmActive.setId(WrapperUtil.parseObjectToInteger(jsonList.get(i)));
            alarmHistory.setId(WrapperUtil.parseObjectToInteger(jsonList.get(i)));
            alarmActives.add(alarmActive);
            alarmHistories.add(alarmHistory);
        }
        try{
            result = JSONUtil.toExtFormJson(alarmService.updateActiveToHistory(alarmActives, alarmHistories),"");
        }catch (Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/updateAlarmHistory",method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateAlarmHistory(HttpServletRequest request,String jsonResult){
        String result = null;
        List jsonList  =JSONUtil.fromJson(jsonResult,ArrayList.class);
        AlarmHistory alarmHistory = null;
        List<AlarmHistory> alarmHistories = new ArrayList();
        for(int i=0;i<jsonList.size();i++){
            alarmHistory = new AlarmHistory();
            alarmHistory.setId(WrapperUtil.parseObjectToInteger(jsonList.get(i)));
            alarmHistories.add(alarmHistory);
        }
        try{
            result = JSONUtil.toExtFormJson(alarmService.updateHistory(alarmHistories),"");
        }catch (Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/deleteAlarmActiveToHistory",method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String deleteAlarmActiveToHistory(HttpServletRequest request,String jsonResult){
        String result = null;
        List jsonList  =JSONUtil.fromJson(jsonResult,ArrayList.class);
        AlarmActive alarmActive = null;
        AlarmHistory alarmHistory = null;
        List<AlarmActive> alarmActives = new ArrayList();
        List<AlarmHistory> alarmHistories = new ArrayList();
        for(int i=0;i<jsonList.size();i++){
            alarmActive = new AlarmActive();
            alarmHistory = new AlarmHistory();
            alarmActive.setId(WrapperUtil.parseObjectToInteger(jsonList.get(i)));
            alarmHistory.setId(WrapperUtil.parseObjectToInteger(jsonList.get(i)));
            alarmActives.add(alarmActive);
            alarmHistories.add(alarmHistory);
        }
        try{
            result = JSONUtil.toExtFormJson(alarmService.deleteAlarmActiveToHistory(alarmActives,alarmHistories),"");
        }catch (Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }
}
