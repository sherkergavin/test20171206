package com.inas.web.controller;

import com.inas.model.work.WorkInstruct;
import com.inas.model.work.WorkInstructVO;
import com.inas.service.work.WorkInstructService;
import com.inas.util.DateUtil;
import com.inas.util.JSONUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.*;


@RequestMapping("/workInstruct")
@Controller
public class WorkInstructController {

    @Resource(name="workInstructService")
    private WorkInstructService workInstructService;

    @RequestMapping(value = "/getMonthInstructs", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getOneMonthInstructs(HttpServletRequest request,WorkInstructVO workInstructVO) throws ParseException {
        Calendar cal = Calendar.getInstance();
        cal.setTime(DateUtil.parseStringToDate(workInstructVO.getSearchMonth(),DateUtil.FORMAT_DATE));
        int value = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        cal.set(Calendar.DAY_OF_MONTH, value);
        workInstructVO.setEndDate(DateUtil.parseStringToDate(DateUtil.parseDateToString(cal.getTime(), "yyyy-MM-dd 23:59:59"), DateUtil.FORMAT_SECOND));
        cal.set(Calendar.DAY_OF_MONTH, 1);
        workInstructVO.setStartDate(DateUtil.parseStringToDate(DateUtil.parseDateToString(cal.getTime(), DateUtil.FORMAT_SECOND), DateUtil.FORMAT_SECOND));
        return JSONUtil.toExtFormJson(true,null,workInstructService.getOneMonthInstructs(workInstructVO));
    }

    @RequestMapping(value = "/saveInstruct", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String saveInstruct(HttpServletRequest request,WorkInstructVO workInstruct,String mon){
        String result = null;
        if (mon!=null && !"".equals(mon)){
            try{
                workInstruct.setDaily_date(DateUtil.parseStringToDate(mon, DateUtil.FORMAT_DATE));
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        try{
            result = JSONUtil.toExtFormJson( workInstructService.saveWorkInstruct(workInstruct),"当前日期已填写过工作指示，可选中日期编辑！");
        }catch(Exception e){
            result = JSONUtil.toExtFormJson( false,e.getMessage());
        }
        return result;
    }

    @RequestMapping(value ="/delInstruct" ,method = RequestMethod.POST,produces = "application/json; charset=utf-8")
    @ResponseBody
    public String delInstruct(HttpServletRequest request,WorkInstruct workInstruct){
        workInstructService.delInstructById(workInstruct.getId());
        return JSONUtil.toExtFormJson(true,null);
    }

    @RequestMapping(value ="/getInstructByDate" ,method = RequestMethod.POST,produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getInstructByDate(HttpServletRequest request,WorkInstructVO workInstructVO) throws ParseException {
        if (null==workInstructVO.getSearchMonth() || "".equals(workInstructVO.getSearchMonth())){
            workInstructVO.setDaily_date(DateUtil.parseStringToDate(DateUtil.parseDateToString(DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE));
        }else{
            workInstructVO.setDaily_date(DateUtil.parseStringToDate(workInstructVO.getSearchMonth(),DateUtil.FORMAT_DATE));
        }
        workInstructVO.setStartDate(DateUtil.addDays(workInstructVO.getDaily_date(), -3));;
        workInstructVO.setEndDate(workInstructVO.getDaily_date());
        List<WorkInstruct> tempList = workInstructService.getInstructsByDate(workInstructVO);
        Map resultMap = new HashMap();
        StringBuffer stringBuffer = new StringBuffer();
        for(WorkInstruct workInstruct : tempList){
            stringBuffer.append(DateUtil.parseDateToString(workInstruct.getDaily_date(),DateUtil.FORMAT_DATE));
            stringBuffer.append(": ");
            stringBuffer.append(workInstruct.getContent());
            stringBuffer.append(";");
        }
        resultMap.put("content",stringBuffer.toString());
        return JSONUtil.toExtResultJson(resultMap);
    }
}
