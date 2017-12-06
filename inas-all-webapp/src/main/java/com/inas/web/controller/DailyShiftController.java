package com.inas.web.controller;

import com.inas.model.work.DailyShift;
import com.inas.model.work.DailyShiftVO;
import com.inas.service.work.DailyShiftService;
import com.inas.util.DateUtil;
import com.inas.util.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

/**
 * Created by ZS on 2015/8/3.
 */
@RequestMapping("/dailyShift")
@Controller
public class DailyShiftController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource(name="dailyShiftService")
    private DailyShiftService dailyShiftService;

    @RequestMapping(value = "/getDailyShifts", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDailyShifts(HttpServletRequest request,DailyShiftVO enVo) {
        try {
            if (null != enVo.getSearchMonth() && !"".equals(enVo.getSearchMonth())) {
                List<DailyShiftVO> list = dailyShiftService.queryShiftBy(enVo);
                return JSONUtil.toExtResultAllJson(true, null, list);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtResultAllJson(false, null, null);
        }
        return null;
    }
    @RequestMapping(value = "/getDailyShiftsByDate", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDailyShiftsByDate(HttpServletRequest request, DailyShiftVO dailyShiftVO) throws ParseException {
        if (null != dailyShiftVO.getDailyDateStr() && !"".equals(dailyShiftVO.getDailyDateStr())){
            dailyShiftVO.setDaily_date(DateUtil.parseStringToDate(dailyShiftVO.getDailyDateStr(), DateUtil.FORMAT_DATE));
        }else{
            dailyShiftVO.setDaily_date(DateUtil.parseStringToDate(DateUtil.parseDateToString(DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE));
        }
        List resultList = dailyShiftService.getDailyShiftByDate(dailyShiftVO);
        return JSONUtil.toExtResultJson(resultList);
    }

    @RequestMapping(value = "/saveDailyShift", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveDailyShift(HttpServletRequest request,DailyShiftVO dailyShiftVO) throws ParseException {
        String result = null;
        dailyShiftVO.setDaily_date(DateUtil.parseStringToDate(DateUtil.parseDateToString(DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE));
        try{
            result = JSONUtil.toExtFormJson(dailyShiftService.saveDailyShiftList(dailyShiftVO),"");
        }catch (Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }

//    @RequestMapping(value = "/saveDailyShift", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String saveDailyShift(HttpServletRequest request,String jsonResult) {
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        List jsonList  =JSONUtil.fromJson(jsonResult,ArrayList.class);
//        List<DailyShift> addList=new ArrayList<>();
//        List<DailyShift> updList=new ArrayList<>();
//        DailyShift dailyShift=null;
//
//        for(int i=0;i<jsonList.size();i++){
//            Map row = (Map)jsonList.get(i);
//            dailyShift = new DailyShift();
//            if(null==row.get("id")||"".equals(row.get("id"))){
//                dailyShift.setId(null);
//            }else{
//                dailyShift.setId(Integer.valueOf(row.get("id").toString()));
//            }
//            if(null==row.get("version")||"".equals(row.get("version"))){
//                dailyShift.setVersion(null);
//            }else{
//                dailyShift.setVersion(Integer.valueOf(row.get("version").toString()));
//            }
//            if(null==row.get("daily_day")||"".equals(row.get("daily_day"))){
//                dailyShift.setDaily_day(null);
//            }else{
//                try{
////                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
////                    Date dat=sdf.parse(row.get("daily_day").toString());
//                    dailyShift.setDaily_day(DateUtil.parseStringToDate(row.get("daily_day").toString(),DateUtil.FORMAT_DATE));
//                }catch (Exception e){
//                    e.printStackTrace();
//                }
//            }
//            if(null==row.get("type")||"".equals(row.get("type"))){
//                dailyShift.setType(null);
//            }else{
//                dailyShift.setType(Integer.valueOf(row.get("type").toString()));
//            }
//            if(null==row.get("manager")||"".equals(row.get("manager"))){
//                dailyShift.setManager(null);
//            }else{
//                dailyShift.setManager(Integer.valueOf(row.get("manager").toString()));
//            }
//            if(null==row.get("operator")||"".equals(row.get("operator"))){
//                dailyShift.setOperator(null);
//            }else{
//                dailyShift.setOperator(Integer.valueOf(row.get("operator").toString()));
//            }
//            if(null==row.get("weather")||"".equals(row.get("weather"))){
//                dailyShift.setWeather(null);
//            }else{
//                dailyShift.setWeather(row.get("weather").toString());
//            }
//            if(null==row.get("lowest")||"".equals(row.get("lowest"))){
//                dailyShift.setLowest(null);
//            }else{
//                dailyShift.setLowest(row.get("lowest").toString());
//            }
//            if(null==row.get("highest")||"".equals(row.get("highest"))){
//                dailyShift.setHighest(null);
//            }else{
//                dailyShift.setHighest(row.get("highest").toString());
//            }
//            if(null == dailyShift.getId() || "".equals(dailyShift.getId()) || dailyShift.getId()==0){
//                dailyShift.setCreator(userDetails.getUsername());
//                dailyShift.setCreate_date(new Date());
//                dailyShift.setVersion(1);
//                addList.add(dailyShift);
//            }else {
//                dailyShift.setEditor(userDetails.getUsername());
//                dailyShift.setEdit_date(new Date());
//                updList.add(dailyShift);
//            }
//        }
//        dailyShiftService.saveDailyShiftList(addList,updList);
//        return JSONUtil.toExtFormJson(true,null);
//    }

}
