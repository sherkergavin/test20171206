package com.inas.web.controller;

import com.inas.model.data.*;
import com.inas.model.system.User;
import com.inas.model.work.WorkInstruct;
import com.inas.service.data.MiddleService;
import com.inas.service.data.SwitchService;
import com.inas.service.data.impl.DataItemServiceImpl;
import com.inas.service.data.impl.MiddleServiceImpl;
import com.inas.service.data.impl.RollupDataServiceImpl;
import com.inas.service.system.UserService;
import com.inas.service.system.impl.UserServiceImpl;
import com.inas.util.DateUtil;
import com.inas.util.GlobalConstants;
import com.inas.util.JSONUtil;

import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by JM-SD09 on 2015/9/21.
 */
@RequestMapping("/data")
@Controller
public class MiddleController {


    @Resource(name = "middleService")
     private MiddleService middleService;

   @Resource(name = "switchService")
    private SwitchService switchService;

    @Resource
    private DataItemServiceImpl dataItemService;

    @Resource
    private UserServiceImpl userService;
    @Resource
    private RollupDataServiceImpl rollupService;



    /**
     * 画图数据查询
     *
     * @return
     */
    @RequestMapping(value = "/getMiddleJSON", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
//    @RequestMapping(value = "/getMiddleJSONOld", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
//    @ResponseBody
    public String getMiddleJSON(HttpServletRequest request, MiddleVO middles) {
        String  s  = middleService.getMiddleVOJSON(middles);
        return s;
    }




    @RequestMapping(value = "/getMiddleFindById", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getMiddleFindById(HttpServletRequest request, MiddleVO middleVO) {
        boolean temp = false;
        DateUtil date = new DateUtil();
        try {
            if (middleVO.getRecordTime() == "") {
                return JSONUtil.toExtResultJson(null);
            }
            Date date2 = DateUtil.parseStringToDate(middleVO.getRecordTime(), DateUtil.FORMAT_DATE);
            List<MiddleVO> middleList = middleService.getMiddleFindById(middleVO.getData_item_id());
            List<MiddleVO> middleLists = new ArrayList<MiddleVO>();
            for (int i = 0; i < middleList.size(); i++) {
                MiddleVO middlevo = middleList.get(i);
                middlevo.setUser_name(userService.getUserById(middlevo.getUser_id()).getStaff_real_name());
                if(middlevo.getPressure2_after() != null) {
                    middlevo.setPressure_all(
                            middlevo.getPressure_before() + "/" +
                                    middlevo.getPressure2_before() + "," +
                                    middlevo.getPressure3_before() + "--" +
                                    middlevo.getPressure_after() + "/" +
                                    middlevo.getPressure2_after() + "," +
                                    middlevo.getPressure3_after()
                    );
                } else if(middlevo.getPressure_after()==null && middlevo.getPressure_before()==null) {
                    middlevo.setPressure_all("");
                } else {
                    middlevo.setPressure_all(
                            middlevo.getPressure_before()+"--"+
                                    middlevo.getPressure_after()
                    );
                }
                Date date1 = DateUtil.parseStringToDate(DateUtil.parseDateToString(middlevo.getOrder_time(), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE);
                if (DateUtil.compareToDate(date1, date2) == 0) {
                    middleLists.add(middlevo);
                }
            }
            String s = JSONUtil.toExtResultJson(middleLists);
            return s;
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }

    /**
     * 开关车指令 查询所有泵数据
     *
     * @return
     */
    @RequestMapping(value = "/getSelectMiddleAllData", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getSelectMiddleAllData() {
        List<MiddleVO> list = new ArrayList<>();
        try {
            List<User> userList = userService.getUserList();
            List<MiddleVO> middleList = middleService.getSelectMiddleAllData();
            for (int j = 0; j < middleList.size(); j++) {
                MiddleVO middle = middleList.get(j);
                for (int i = 0; i < userList.size(); i++) {
                    User user = userList.get(i);
                    if (middle.getUser_id() != null && user.getId().intValue() == middle.getUser_id().intValue()) {
                        middle.setUser_name(user.getStaff_real_name());
                    }
                    if(middle.getPressure2_after() != null) {
                        middle.setPressure_all(
                                middle.getPressure_before() + "/" +
                                        middle.getPressure2_before() + "," +
                                        middle.getPressure3_before() + "--" +
                                        middle.getPressure_after() + "/" +
                                        middle.getPressure2_after() + "," +
                                        middle.getPressure3_after()
                        );
                    } else if(middle.getPressure_after()==null && middle.getPressure_before()==null) {
                        middle.setPressure_all("");
                    } else {
                        middle.setPressure_all(
                                middle.getPressure_before()+"--"+
                                        middle.getPressure_after()
                        );
                    }
                    String pressure = middle.getPressure_all();
                    pressure = pressure.replace("null","");
                    middle.setPressure_all(pressure);
                }
                list.add(middle);
            }
            return JSONUtil.toExtResultJson(list);
        } catch (Exception e) {
            System.out.println("--------"+e);
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }
    @RequestMapping(value = "/dateMiddle", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String dateMiddle(HttpServletRequest request, MiddleVO middleVO) {
        middleService.getAllMiddleLists(middleVO);
        return  null;
    }
    /**
     * @return
     */
    @RequestMapping(value = "/saveMiddle", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveMiddle(HttpServletRequest request, MiddleVO middleVO) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.getUserByUserName(userDetails.getUsername());
            Date date = DateUtil.parseStringToDate(middleVO.getRecordTime(), DateUtil.FORMAT_SECOND);
            Date date2 = DateUtil.parseStringToDate(middleVO.getRecordTime(), DateUtil.FORMAT_DATE);
            middleVO.setOrder_time(date);
            middleVO.setUser_id(user.getId());
            middleVO.setStartTime(date);

            List<MiddleVO> middleList = middleService.getMiddleFindById(middleVO.getData_item_id());
            MiddleVO middleVO1 = null;


            List<Middle> middleLists = new ArrayList<Middle>();
            for (int i = 0; i < middleList.size(); i++) {
                Middle middle = middleList.get(i);
                Date date1 = DateUtil.parseStringToDate(DateUtil.parseDateToString(middle.getOrder_time(), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE);
                if (DateUtil.compareToDate(date1, date2) == 0) {
                    middleLists.add(middle);
                }
            }
            List<MiddleVO> list = new ArrayList<MiddleVO>();
            if (middleLists.size() == 0) {
                list = middleService.getMiddleLastListByItemId(middleVO.getData_item_id());
            } else if (middleLists.size() > 0) {
                middleService.saveMiddle(middleVO);
                return JSONUtil.toExtFormJson(true, null);
            }
            if(list.size()>0){
                middleVO1 = list.get(0);
            }
            if (middleVO1 == null && middleLists.size() == 0) {

                middleService.saveMiddle(middleVO);
                return JSONUtil.toExtFormJson(true, null);

            } else if (middleVO1 != null && middleLists.size() > 0) {

                middleService.saveMiddle(middleVO);
                return JSONUtil.toExtFormJson(true, null);

            } else if (middleVO1 != null && middleLists.size() == 0) {

                if (middleVO.getOp_order() == middleVO1.getOp_order() && middleVO1.getOp_order() == 1) {

                    return JSONUtil.toExtFormJson(false, "指令必须为停");

                } else if (middleVO.getOp_order() == middleVO1.getOp_order() && middleVO1.getOp_order() == 0) {

                    return JSONUtil.toExtFormJson(false, "指令必须为开");

                } else if (middleVO.getOp_order() != middleVO1.getOp_order()) {

                    middleService.saveMiddle(middleVO);
                    return JSONUtil.toExtFormJson(true, null);
                }
            }
            return JSONUtil.toExtFormJson(false, null);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }


    @RequestMapping(value = "/updateMiddle", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateMiddle(HttpServletRequest request, MiddleVO middleVO) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.getUserByUserName(userDetails.getUsername());
            Date date = DateUtil.parseStringToDate(middleVO.getRecordTime(), DateUtil.FORMAT_SECOND);
            Date date2 = DateUtil.parseStringToDate(middleVO.getHiddenDateYmdHis(), DateUtil.FORMAT_SECOND);
            middleVO.setUser_id(user.getId());
            middleVO.setOrder_time(date);
            middleVO.setHiddenDateYmd(middleVO.getHiddenDateYmd());
            List<MiddleVO> middleVOList = middleService.getMiddleByIdWithUpdate(middleVO);
            Integer b = 0;
            Date date1 = DateUtil.parseStringToDate(middleVO.getRecordTime(), DateUtil.FORMAT_DATE);

            List<MiddleVO> middleVOLists = new ArrayList<MiddleVO>();
            for (int i = 0; i < middleVOList.size(); i++) {
                MiddleVO middleVO1 = middleVOList.get(i);
                Date date3 = DateUtil.parseStringToDate(DateUtil.parseDateToString(middleVO1.getOrder_time(), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE);
                if (DateUtil.compareToDate(date1, date3) == 0) {
                    middleVOLists.add(middleVO1);
                }
            }
            for (int i = 0; i < middleVOLists.size(); i++) {
                MiddleVO middleVO1 = middleVOLists.get(i);
                if (middleVO1.getOrder_time().getTime() == date2.getTime()) {
                    b = i;
                    break;
                }
            }
            MiddleVO vo = null;
            MiddleVO vos = null;
            if (b == 0 && middleVOLists.size() == 1) {
                middleService.updateMiddle(middleVO);
            } else if (b == 0 && middleVOLists.size() > 1) {
                vo = middleVOLists.get(b + 1);
                if (vo.getOrder_time().getTime() > date.getTime()) {
                    middleService.updateMiddle(middleVO);
                } else {
                    return JSONUtil.toExtFormJson(false, "指令时间不可大于下个指令时间", null);
                }
            } else if (b == middleVOLists.size() - 1 && middleVOLists.size() >= 2) {
                vo = middleVOLists.get(b - 1);
                if (vo.getOrder_time().getTime() < date.getTime()) {
                    middleService.updateMiddle(middleVO);
                } else {
                    return JSONUtil.toExtFormJson(false, "指令时间不可大于上个指令时间", null);
                }
            } else if (b > 0 && b < middleVOLists.size() - 1) {
                vo = middleVOLists.get(b - 1);
                vos = middleVOLists.get(b + 1);
                if (vo.getOrder_time().getTime() < date.getTime()) {
                    if (vos.getOrder_time().getTime() > date.getTime()) {
                        middleService.updateMiddle(middleVO);
                    } else {
                        return JSONUtil.toExtFormJson(false, "指令时间不可大于下个指令时间", null);
                    }
                } else {
                    return JSONUtil.toExtFormJson(false, "指令时间不可小于上个指令时间", null);
                }
            }
            return JSONUtil.toExtFormJson(true, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }}

    /**
     * 根据时间删除泵信息
     */
    @RequestMapping(value = "/delDataMiddLe",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String delDataMiddLE(HttpServletRequest request,Integer data_item_id,String order_time){
        try {
            Middle middle=new Middle();
            Switch sw=new Switch();
                middle.setData_item_id(data_item_id);
               middle.setOrder_time(DateUtil.parseStringToDate(order_time.replace("T", " "), DateUtil.FORMAT_SECOND));
                Date date_page=middle.getOrder_time();
               Date data_end=middleService.selRecord_time(data_item_id);
           if (data_end.getTime()==date_page.getTime()){
                sw.setData_item_id(middle.getData_item_id());
                sw.setState_time(middle.getOrder_time());
                middleService.delDataMiddLe(middle,sw);
              return JSONUtil.toExtFormJson(true,null);
            }else {
                return JSONUtil.toExtFormJson(false, "只能删除离当前时间最近的一条信息");
           }
       } catch (ParseException e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员"+ e.getMessage());
       }
   }


    @RequestMapping(value = "/getSelectByDateMiddle", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getSelectByDateMiddle(HttpServletRequest request, Integer entity_id, String startTime, String endTime, Integer item_id) {
        List<MiddleVO> list = new ArrayList<MiddleVO>();
        try {
            MiddleVO middleVO = new MiddleVO();
            middleVO.setEntity_id(entity_id);
            middleVO.setStartTime(DateUtil.parseStringToDate(startTime.replace("T", " "), DateUtil.FORMAT_SECOND));
            middleVO.setEndTime(DateUtil.parseStringToDate(endTime.replace("T", " "), DateUtil.FORMAT_SECOND));
                              //DateUtil.parseStringToDate(endTime, DateUtil.FORMAT_DATE)
            middleVO.setItem_id(item_id);
            List<MiddleVO> middleVOList = middleService.getSelectByDateMiddle(middleVO);
            List<User> userList = userService.getUserList();
            for (int i = 0; i < middleVOList.size(); i++) {
                MiddleVO middleVO1 = middleVOList.get(i);
                for (int j = 0; j < userList.size(); j++) {
                    User user = userList.get(j);
                    if (middleVO1.getUser_id() != null && middleVO1.getUser_id().intValue() == user.getId().intValue()) {
                        middleVO1.setUser_name(user.getStaff_real_name());
                    }
                }
                if(middleVO1.getPressure2_after() != null) {
                    middleVO1.setPressure_all(
                            middleVO1.getPressure_before() + "/" +
                                    middleVO1.getPressure2_before() + "," +
                                    middleVO1.getPressure3_before() + "--" +
                                    middleVO1.getPressure_after() + "/" +
                                    middleVO1.getPressure2_after() + "," +
                                    middleVO1.getPressure3_after()
                    );
                } else if(middleVO1.getPressure_after()==null && middleVO1.getPressure_before()==null){
                    middleVO1.setPressure_all("");
                } else {
                    middleVO1.setPressure_all(
                            middleVO1.getPressure_before()+"--"+
                            middleVO1.getPressure_after()
                    );
                }
                String pressure = middleVO1.getPressure_all();
                pressure = pressure.replace("null","");
                middleVO1.setPressure_all(pressure);
                list.add(middleVO1);
            }
            return JSONUtil.toExtResultJson(list);
        } catch (Exception e) {
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }


    @RequestMapping(value = "/getEntityIdName", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getEntityIdName() {
        try {
            String s = JSONUtil.toExtResultJson(middleService.getEntityIdName());
            return s;
        } catch (Exception e) {
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }

    @RequestMapping(value = "/getItemIdName", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getItemIdName(Integer entity_id) {
        try {
            //System.out.println("---------------------"+entity_id);
            String s1 = JSONUtil.toExtResultJson(middleService.getItemIdName(entity_id));
            return s1;
        } catch (Exception e) {
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }

    @RequestMapping(value = "/updateMiddleStuts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateMiddleStuts(MiddleVO middleVO) {
        try {
            Date date = DateUtil.parseStringToDate(middleVO.getRecordTime(), DateUtil.FORMAT_DATE);
            middleVO.setOrder_time(date);
            middleService.updateMiddleStuts(middleVO);
            return JSONUtil.toExtFormJson(true, null);
        } catch (Exception e) {
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }


    @RequestMapping(value = "/saveMiddleAndSwitch", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String saveMiddleAndSwitch(HttpServletRequest request, MiddleVO middleVO,Middle middle) {
        try {
            Integer requestid = middleVO.getId();
            //Integer requestid = Integer.valueOf(request.getParameter("id"));
            System.out.println("返回的id:"+requestid);
            if(requestid == null){
                //insert
                UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                User user = userService.getUserByUserName(userDetails.getUsername());
                Integer user_id = user.getId();
                Middle middle1 = new Middle();
                middle1.setUser_id(user_id);
                if (middleVO.getData_item_id()==null) {
                    middle1.setData_item_id(Integer.valueOf(middleVO.getData_item_name()));
                }else{
                    middle1.setData_item_id(Integer.valueOf(middleVO.getData_item_id()));
                }
                middle1.setDescription(middle.getDescription());
                middle1.setOp_order(middle.getOp_order());
                middle1.setPressure_after(middle.getPressure_after());
                middle1.setPressure_before(middle.getPressure_before());
                middle1.setPressure2_after(middle.getPressure2_after());
                middle1.setPressure2_before(middle.getPressure2_before());
                middle1.setPressure3_after(middle.getPressure3_after());
                middle1.setPressure3_before(middle.getPressure3_before());
                middle1.setOrder_time(DateUtil.parseStringToDate(middleVO.getOrder_time1(), DateUtil.FORMAT_SECOND));
                middle1.setRepl_order_time(DateUtil.parseStringToDate(middleVO.getRepl_order_time1(), DateUtil.FORMAT_SECOND));
                middleService.insertMiddLe(middle1);

                Switch swi1 = new Switch();
                swi1.setUser_id(user_id);
                swi1.setId(middle1.getId());
                if(middleVO.getData_item_id()==null) {
                    swi1.setData_item_id(Integer.valueOf(middleVO.getData_item_name()));
                }else{
                    swi1.setData_item_id(middleVO.getData_item_id());
                }
                swi1.setState(middle1.getOp_order());
                swi1.setState_time(DateUtil.parseStringToDate(middleVO.getOrder_time1(), DateUtil.FORMAT_SECOND));
                swi1.setDescription(middle1.getDescription());
                swi1.setPressure_after(middle1.getPressure_after());
                swi1.setPressure_before(middle1.getPressure_before());
                swi1.setPressure2_after(middle1.getPressure2_after());
                swi1.setPressure2_before(middle1.getPressure2_before());
                swi1.setPressure3_after(middle1.getPressure3_after());
                swi1.setPressure3_before(middle1.getPressure3_before());
                switchService.insertSwitCh(swi1);

                return JSONUtil.toExtFormJson(true, null);

            } else if(requestid != null){
                //update
                UserDetails userDetails1 = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                User user1 = userService.getUserByUserName(userDetails1.getUsername());
                Integer user_id1 = user1.getId();
                Integer id = Integer.valueOf(request.getParameter("id"));
                Integer data_item_id = Integer.valueOf(request.getParameter("data_item_id"));
                Date order_time = DateUtil.parseStringToDate(request.getParameter("order_time1"), DateUtil.FORMAT_SECOND);
                Date repl_order_time = DateUtil.parseStringToDate(request.getParameter("repl_order_time1"), DateUtil.FORMAT_SECOND);
                middleVO.setUser_id(user_id1);
                middleVO.setOrder_time(order_time);
                middleVO.setRepl_order_time(repl_order_time);
                List<MiddleVO> list = middleService.searchMiddleById(id, data_item_id);
                Date datebefore = middleService.searchMiddleBeforeUpdate(id);
                System.out.println("修改以前的日期:"+datebefore);
                if (list.size()==2) {
                    Date date1 = list.get(0).getOrder_time();
                    Date date2 = list.get(1).getOrder_time();
                    if (date1.getTime() > date2.getTime()){
                        System.out.println("date1大于date2");
                    } else {
                        Date exchange = date1;
                        date1 = date2;
                        date2 = exchange;
                        if (date1.getTime() > date2.getTime()){
                            System.out.println("date1大于date2!");
                        }
                    }
                    System.out.println("有两个日期,date1=" + date1 + "/" + "data2=" + date2);
                    if (order_time.getTime() < date1.getTime() && order_time.getTime() > date2.getTime()) {
                        System.out.println("可以修改");
                        middleService.saveMiddleAndSwitch(middleVO);
                        return JSONUtil.toExtFormJson(true, null);
                    } else {
                        System.out.println("不可修改!!");
                        return JSONUtil.toExtFormJson(false, "指令时间必须在该前后两条指令的时间中间");
                    }
                } else if (list.size()==1) {
                    Date date = list.get(0).getOrder_time();
                    System.out.println("只有一个日期,date="+date);
                    if (datebefore.getTime() > date.getTime()){
                        System.out.println("当条记录为最后一条记录");
                        if (order_time.getTime() > date.getTime()) {
                            middleService.saveMiddleAndSwitch(middleVO);
                            return JSONUtil.toExtFormJson(true, null);
                        } else {
                            return JSONUtil.toExtFormJson(false, "指令时间必须大于上一条指令的时间");
                        }
                    }else {
                        System.out.println("当条记录为第一条记录");
                        if (order_time.getTime() < date.getTime()) {
                            middleService.saveMiddleAndSwitch(middleVO);
                            return JSONUtil.toExtFormJson(true, null);
                        } else {
                            return JSONUtil.toExtFormJson(false, "指令时间必须小于下一条指令的时间");
                        }
                    }
                }
                System.out.println("只有本记录一条记录,可以直接修改");
                middleService.saveMiddleAndSwitch(middleVO);
                return JSONUtil.toExtFormJson(true,null);
            }
            return JSONUtil.toExtFormJson(true,null);
        } catch (Exception e) {
            System.out.println(e);
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }
//    public String saveMiddleAndSwitch(HttpServletRequest request, MiddleVO middleVO) {
//        try {
//            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//            User user = userService.getUserByUserName(userDetails.getUsername());
//            Integer user_id = user.getId();
//            System.out.println(user.getId());
//            Integer id = Integer.valueOf(request.getParameter("id"));
//            Integer data_item_id = Integer.valueOf(request.getParameter("data_item_id"));
//            Date order_time = DateUtil.parseStringToDate(request.getParameter("order_time1"), DateUtil.FORMAT_SECOND);
////            Integer pressure_before = isEmpty(request.getParameter("pressure_before"))? Integer.valueOf(request.getParameter("pressure_before")) : null;
////            Integer pressure2_before = isEmpty(request.getParameter("pressure2_before"))? Integer.valueOf(request.getParameter("pressure2_before")) : null;
////            Integer pressure3_before = isEmpty(request.getParameter("pressure3_before"))? Integer.valueOf(request.getParameter("pressure3_before")) : null;
////            Integer pressure_after = isEmpty(request.getParameter("pressure_after"))? Integer.valueOf(request.getParameter("pressure_after")) : null;
////            Integer pressure2_after = isEmpty(request.getParameter("pressure2_after"))? Integer.valueOf(request.getParameter("pressure2_after")) : null;
////            Integer pressure3_after = isEmpty(request.getParameter("pressure3_after"))? Integer.valueOf(request.getParameter("pressure3_after")) : null;
////            middleVO.setPressure_before(pressure_before);
////            middleVO.setPressure2_before(pressure2_before);
////            middleVO.setPressure3_before(pressure3_before);
////            middleVO.setPressure_after(pressure_after);
////            middleVO.setPressure2_after(pressure2_after);
////            middleVO.setPressure3_after(pressure3_after);
//            middleVO.setUser_id(user_id);
//            middleVO.setOrder_time(order_time);
//            List<MiddleVO> list = middleService.searchMiddleById(id, data_item_id);
//            Date datebefore = middleService.searchMiddleBeforeUpdate(id);
//            System.out.println("修改以前的日期:"+datebefore);
//            if (list.size()==2) {
//                Date date1 = list.get(0).getOrder_time();
//                Date date2 = list.get(1).getOrder_time();
//                if (date1.getTime() > date2.getTime()){
//                    System.out.println("date1大于date2");
//                } else {
//                    Date exchange = date1;
//                    date1 = date2;
//                    date2 = exchange;
//                    if (date1.getTime() > date2.getTime()){
//                        System.out.println("date1大于date2!");
//                    }
//                }
//                System.out.println("有两个日期,date1=" + date1 + "/" + "data2=" + date2);
//                if (order_time.getTime() < date1.getTime() && order_time.getTime() > date2.getTime()) {
//                    System.out.println("可以修改");
//                    middleService.saveMiddleAndSwitch(middleVO);
//                    return JSONUtil.toExtFormJson(true, null);
//                } else {
//                    System.out.println("不可修改!!");
//                    return JSONUtil.toExtFormJson(false, "指令时间必须在该前后两条指令的时间中间");
//                }
//            } else if (list.size()==1) {
//                Date date = list.get(0).getOrder_time();
//                System.out.println("只有一个日期,date="+date);
//                if (datebefore.getTime() > date.getTime()){
//                    System.out.println("当条记录为最后一条记录");
//                    if (order_time.getTime() > date.getTime()) {
//                        middleService.saveMiddleAndSwitch(middleVO);
//                        return JSONUtil.toExtFormJson(true, null);
//                    } else {
//                        return JSONUtil.toExtFormJson(false, "指令时间必须大于上一条指令的时间");
//                    }
//                }else {
//                    System.out.println("当条记录为第一条记录");
//                    if (order_time.getTime() < date.getTime()) {
//                        middleService.saveMiddleAndSwitch(middleVO);
//                        return JSONUtil.toExtFormJson(true, null);
//                    } else {
//                        return JSONUtil.toExtFormJson(false, "指令时间必须小于下一条指令的时间");
//                    }
//                }
//            }
//            System.out.println("只有本记录一条记录,可以直接修改");
//            middleService.saveMiddleAndSwitch(middleVO);
//            return JSONUtil.toExtFormJson(true, null);
//        }
//        catch (Exception e){
//            System.out.println(e);
//            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
//        }
//
//    }


//    private boolean isEmpty(String str){
//        //return str != null && !str.trim().equals("") ? false: true;
//        return str != null && str.equals("") ? false: true;
//    }

    /**
     * 递归往上找指令时间
     */
//    public MiddleVO getYesTerDayMiddleVO(MiddleVO middleVO) throws Exception {
//        MiddleVO middleVO2 = middleVO;
//        middleVO2.setRecord_time_in_3rd_db(DateUtil.compareAddToDate(middleVO2.getRecord_time_in_3rd_db(), 1));
//        MiddleVO middleVO1 = middleService.getYesTerDayList(middleVO2);
//        if (middleVO1 == null) {
//            getYesTerDayMiddleVO(middleVO2);
//        }
//
//        return middleVO1;
//    }
//    @RequestMapping(value ="/delInstruct" ,method = RequestMethod.POST,produces = "application/json; charset=utf-8")
//    @ResponseBody
//    public String delInstruct(HttpServletRequest request,WorkInstruct workInstruct){
//        workInstructService.delInstructById(workInstruct.getId());
//        return JSONUtil.toExtFormJson(true,null);
//    }
//    @RequestMapping(value = "/delMiddle",method = RequestMethod.POST,produces = "application/json; charset=utf-8")
//    @ResponseBody
//    private  String delMiddle(HttpServletRequest request,Middle middle){
//        System.out.println("----------"+middle.getId());
//        middleService.delMiddleByid(middle.getId());
//       return JSONUtil.toExtFormJson(true,null);
//    }

    /**
     * 根据时间删除信息
     */
//    @RequestMapping(value = "/delMiddLe",method = RequestMethod.POST,produces ="application/json; charset=utf-8")
//    @ResponseBody
//    public  String delMiddLe (HttpServletRequest request,Integer data_item_id,String record_time_in_3rd_db){
////  System.out.println("---------------------"+middle.getData_item_id());
//        DateUtil.parseStringToDate(record_time_in_3rd_db,DateUtil.FORMAT_DATE);
//        middleService.delMiddLeByItem_Id(data_item_id, record_time_in_3rd_db);
//        //DateUtil.parseStringToDate(endTime, DateUtil.FORMAT_DATE)
//        return JSONUtil.toExtFormJson(true,null);
//
//    }

    @RequestMapping(value = "/getAllEntityType", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getAllEntityType(){
        try{
            String s2 = JSONUtil.toExtResultJson(middleService.getAllEntityType());
            return s2;
        }catch(Exception e){
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }

    @RequestMapping(value = "/getEntityByType", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getEntityByType(Integer entity_type_id){
        try{
            String s3 = JSONUtil.toExtResultJson(middleService.getEntityByType(entity_type_id));
            return s3;
        }catch(Exception e){
            return JSONUtil.toExtFormJson(false, "错误!请联系系统管理员 : " + e.getMessage());
        }
    }
    public String Test(){
      return null;
    }
}