package com.inas.web.controller;

import com.inas.model.data.ChongxiForm;
import com.inas.model.data.RoleJsonVo;
import com.inas.model.workflow.SearchWorkflowModel;
import com.inas.service.data.ChongxiFormService;
import com.inas.util.DateUtil;
import com.inas.util.FtpFileUtil;
import com.inas.util.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by luyufei on 2016/4/15.
 */
@RequestMapping("/workflow")
@Controller
public class ChongxiFormController {

    @Resource(name = "chongxiFormService")
    private ChongxiFormService chongxiFormService;

    private static final String FILEPATH="workflow" ;

    static Integer IniLimit;

    /**
     * 处理传递的匹配查询参数
     *
     * @param request
     * @param searchEnty
     * @return
     */
    @RequestMapping(value = "getChongxiForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getChongxiForm(HttpServletRequest request, SearchWorkflowModel searchEnty) {
        try{
            IniLimit = searchEnty.getLimit() + searchEnty.getStart();

            ChongxiForm cf= new ChongxiForm();

            String plan_start_date="";
            if(searchEnty.getSearch_start_time()!=null&&!searchEnty.getSearch_start_time().equals("")){
                plan_start_date=searchEnty.getSearch_start_time();
                plan_start_date=plan_start_date.replace("T", " ");
                cf.setPlan_start_blunt_turb_date(DateUtil.parseStringToDate(plan_start_date, DateUtil.FORMAT_MINUTE));
            }

            String plan_end_date="";
            if(searchEnty.getSearch_end_time()!=null&&!searchEnty.getSearch_end_time().equals("")){
                plan_end_date=searchEnty.getSearch_end_time();
                plan_end_date=plan_end_date.replace("T", " ");
                cf.setPlan_end_blunt_turb_date(DateUtil.parseStringToDate(plan_end_date, DateUtil.FORMAT_MINUTE));
            }

            String actual_start_date="";
            if(searchEnty.getSearch_actual_start_date()!=null&&!searchEnty.getSearch_actual_start_date().equals("")){
                actual_start_date=searchEnty.getSearch_actual_start_date();
                actual_start_date=actual_start_date.replace("T", " ");
                cf.setActual_start_blunt_turb_date(DateUtil.parseStringToDate(actual_start_date, DateUtil.FORMAT_MINUTE));
            }

            String actual_end_date="";
            if(searchEnty.getSearch_actual_end_date()!=null&&!searchEnty.getSearch_actual_end_date().equals("")) {
                actual_end_date = searchEnty.getSearch_actual_end_date();
                actual_end_date = actual_end_date.replace("T", " ");
                cf.setActual_end_blunt_turb_date(DateUtil.parseStringToDate(actual_end_date, DateUtil.FORMAT_MINUTE));
            }

            if(searchEnty.getSearch_Context()!=null&&!searchEnty.getSearch_Context().equals("")){
                cf.setJob_content(searchEnty.getSearch_Context());
            }

            if(searchEnty.getSearch_unit()!=null&&!searchEnty.getSearch_unit().equals("")){
                cf.setFill_unit(searchEnty.getSearch_unit());
            }

            if(searchEnty.getSearch_place()!=null&&!searchEnty.getSearch_place().equals("")){
                cf.setPlace(searchEnty.getSearch_place());
            }

            if(searchEnty.getSearch_code()!=null&&!searchEnty.getSearch_code().equals("")){
                cf.setCode(searchEnty.getSearch_code());
            }

            if(searchEnty.getSearch_dn()!=null&&!searchEnty.getSearch_dn().equals("")){
                cf.setCaliber_of_pipeline(searchEnty.getSearch_dn()+"");
            }

            if(searchEnty.getSearch_mc()!=null&&!searchEnty.getSearch_mc().equals("")){
                cf.setIs_monitoring_center(searchEnty.getSearch_mc());
            }

            cf.setStart(searchEnty.getStart());
            cf.setLimit(IniLimit);

            List<ChongxiForm> resultList = chongxiFormService.getChongxiForm(cf);

            RoleJsonVo vo = new RoleJsonVo();
            String state = searchEnty.getSearch_state();
            if(searchEnty.getSearch_state()!=null&&!searchEnty.getSearch_state().equals("")){
                List<ChongxiForm> chongxiForms = chongxiFormService.getStateChongxi(resultList,state);
                vo.setList(chongxiForms);
            }else{
                vo.setList(resultList);
            }

            Map<String,String> map = new HashMap<String,String>();
            //调用查询权限的方法
            boolean cx_add = chongxiFormService.hasAccess("cx-add");
            boolean cx_manager_approve = chongxiFormService.hasAccess("cx-manager-approve");
            boolean cx_officer_approve = chongxiFormService.hasAccess("cx-officer-approve");
            boolean cx_dispatcher = chongxiFormService.hasAccess("cx-dispatcher");
            boolean cx_remove = chongxiFormService.hasAccess("cx-remove");


            map.put("cx_add", cx_add+"");
            map.put("cx_manager_approve", cx_manager_approve+"");
            map.put("cx_officer_approve", cx_officer_approve+"");
            map.put("cx_dispatcher", cx_dispatcher+"");
            map.put("cx_remove", cx_remove+"");
            vo.setRole(map);

            Integer totalCnt=chongxiFormService.getCFTotal(cf);

            return JSONUtil.toExtResultJson(totalCnt, vo, searchEnty.getStart(), IniLimit);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    /**
     * 新增冲洗、消毒申请单
     * @param chongxiForm
     * @return
     */
    @RequestMapping(value = "createChongxiForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String createChongxiForm(HttpServletRequest request,ChongxiForm chongxiForm){
        try {
            String filingTime = request.getParameter("filing_time");
            String planingStartBluntTurbTime = request.getParameter("plan_start_blunt_turb_time");
            String planingEndBluntTurbTime = request.getParameter("plan_end_blunt_turb_time");
            String planingStartChInjectionTime = request.getParameter("plan_start_ch_injection_time");
            String planingEndChInjectionTime = request.getParameter("plan_end_ch_injection_time");
            String planingStartRushChTime = request.getParameter("plan_start_rush_ch_time");
            String planingEndRushChTime = request.getParameter("plan_end_rush_ch_time");

            List<ChongxiForm> list=chongxiFormService.getIsCodeRepetition(chongxiForm.getCode());
            if(list!=null&&list.size()>0){
                return JSONUtil.toExtFormJson(false, "编号不可重复,请重新输入", null);
            }

            Date filingDate = null;
            if(!filingTime.equals("") && filingTime!=null){
                filingDate = DateUtil.parseStringToDate(filingTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setFiling_date(filingDate);
            }

            Date planingStartBluntTurbDate=null;
            if(!planingStartBluntTurbTime.equals("") && planingStartBluntTurbTime!=null){
                planingStartBluntTurbDate = DateUtil.parseStringToDate(planingStartBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_blunt_turb_date(planingStartBluntTurbDate);
            }

            Date planingEndBluntTurbDate=null;
            if(!planingEndBluntTurbTime.equals("") && planingEndBluntTurbTime!=null){
                planingEndBluntTurbDate = DateUtil.parseStringToDate(planingEndBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_blunt_turb_date(planingEndBluntTurbDate);
            }
            Date planingStartChInjectionDate=null;
            if(!planingStartChInjectionTime.equals("") && planingStartChInjectionTime!=null){
                planingStartChInjectionDate = DateUtil.parseStringToDate(planingStartChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_ch_injection_date(planingStartChInjectionDate);
            }

            Date planingEndChInjectionDate=null;
            if(!planingEndChInjectionTime.equals("") && planingEndChInjectionTime!=null){
                planingEndChInjectionDate = DateUtil.parseStringToDate(planingEndChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_ch_injection_date(planingEndChInjectionDate);
            }

            Date planingStartRushChDate=null;
            if(!planingStartRushChTime.equals("") && planingStartRushChTime!=null){
                planingStartRushChDate = DateUtil.parseStringToDate(planingStartRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_rush_ch_date(planingStartRushChDate);
            }

            Date planingEndRushChDate=null;
            if(!planingEndRushChTime.equals("") && planingEndRushChTime!=null){
                planingEndRushChDate = DateUtil.parseStringToDate(planingEndRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_rush_ch_date(planingEndRushChDate);
            }


            //获取登录人姓名
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String user = userDetails.getUsername();

            //制表人
            chongxiForm.setLister(user);
            chongxiForm.setLister_time(filingDate);

            //调度经理
            chongxiForm.setDispatche_manager(user);
            chongxiForm.setDispatche_manager_date(filingDate);

            //调度主任
            chongxiForm.setDispatche_center_director("薛明");
            chongxiForm.setDispatche_center_director_date(filingDate);

            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("attachment_file_a");
            MultipartFile imgFile2 = multipartRequest.getFile("attachment_file_b");
            MultipartFile imgFile3=multipartRequest.getFile("attachment_file_c");
            MultipartFile imgFile4=multipartRequest.getFile("attachment_file_d");

            chongxiForm.setAttachment_file_1(FtpFileUtil.uploadFile(imgFile1, FILEPATH));
            chongxiForm.setAttachment_file_2(FtpFileUtil.uploadFile(imgFile2, FILEPATH));
            chongxiForm.setAttachment_file_3(FtpFileUtil.uploadFile(imgFile3, FILEPATH));
            chongxiForm.setAttachment_file_4(FtpFileUtil.uploadFile(imgFile4, FILEPATH));

            int i =chongxiFormService.createChongxiForm(chongxiForm);

            if(i<=0){
                return JSONUtil.toExtFormJson(false, "添加失败", null);
            }

            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    /**
     * 获取权限
     * @param request
     * @return
     */
    @RequestMapping(value = "getCxIsHasAccess", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getCxIsHasAccess(HttpServletRequest request){
        RoleJsonVo vo = new RoleJsonVo();
        Map<String,String> map = new HashMap<String,String>();

        //调用查询权限的方法
        boolean cx_add = chongxiFormService.hasAccess("cx-add");
        boolean cx_manager_approve = chongxiFormService.hasAccess("cx-manager-approve");
        boolean cx_officer_approve = chongxiFormService.hasAccess("cx-officer-approve");
        boolean cx_dispatcher = chongxiFormService.hasAccess("cx-dispatcher");
        boolean cx_remove = chongxiFormService.hasAccess("cx-remove");

        map.put("cx_add", cx_add+"");
        map.put("cx_manager_approve", cx_manager_approve+"");
        map.put("cx_officer_approve", cx_officer_approve+"");
        map.put("cx_dispatcher", cx_dispatcher+"");
        map.put("cx_remove", cx_remove+"");
        vo.setRole(map);

        return JSONUtil.toExtResultAllJson(true, null, vo);
    }

    /**
     * 审批权限,编辑冲洗、消毒申请单
     * @param request
     * @param chongxiForm
     * @return
     */
    @RequestMapping(value = "updateChongxiForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateChongxiForm(HttpServletRequest request,ChongxiForm chongxiForm){
        try {
            String filingTime = request.getParameter("filing_time");
            String planingStartBluntTurbTime = request.getParameter("plan_start_blunt_turb_time");
            String planingEndBluntTurbTime = request.getParameter("plan_end_blunt_turb_time");
            String planingStartChInjectionTime = request.getParameter("plan_start_ch_injection_time");
            String planingEndChInjectionTime = request.getParameter("plan_end_ch_injection_time");
            String planingStartRushChTime = request.getParameter("plan_start_rush_ch_time");
            String planingEndRushChTime = request.getParameter("plan_end_rush_ch_time");

            String actualStartBluntTurbTime = request.getParameter("actual_start_blunt_turb_time");
            String actualEndBluntTurbTime = request.getParameter("actual_end_blunt_turb_time");
            String actualStartChInjectionTime = request.getParameter("actual_start_ch_injection_time");
            String actualEndChInjectionTime = request.getParameter("actual_end_ch_injection_time");
            String actualStartRushChTime = request.getParameter("actual_start_rush_ch_time");
            String actualEndRushChTime = request.getParameter("actual_end_rush_ch_time");

            Date filingDate = null;
            if(!filingTime.equals("") && filingTime!=null){
                filingDate = DateUtil.parseStringToDate(filingTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setFiling_date(filingDate);
            }

            Date planingStartBluntTurbDate=null;
            if(!planingStartBluntTurbTime.equals("") && planingStartBluntTurbTime!=null){
                planingStartBluntTurbDate = DateUtil.parseStringToDate(planingStartBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_blunt_turb_date(planingStartBluntTurbDate);
            }

            Date planingEndBluntTurbDate=null;
            if(!planingEndBluntTurbTime.equals("") && planingEndBluntTurbTime!=null){
                planingEndBluntTurbDate = DateUtil.parseStringToDate(planingEndBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_blunt_turb_date(planingEndBluntTurbDate);
            }
            Date planingStartChInjectionDate=null;
            if(!planingStartChInjectionTime.equals("") && planingStartChInjectionTime!=null){
                planingStartChInjectionDate = DateUtil.parseStringToDate(planingStartChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_ch_injection_date(planingStartChInjectionDate);
            }

            Date planingEndChInjectionDate=null;
            if(!planingEndChInjectionTime.equals("") && planingEndChInjectionTime!=null){
                planingEndChInjectionDate = DateUtil.parseStringToDate(planingEndChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_ch_injection_date(planingEndChInjectionDate);
            }

            Date planingStartRushChDate=null;
            if(!planingStartRushChTime.equals("") && planingStartRushChTime!=null){
                planingStartRushChDate = DateUtil.parseStringToDate(planingStartRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_rush_ch_date(planingStartRushChDate);
            }

            Date planingEndRushChDate=null;
            if(!planingEndRushChTime.equals("") && planingEndRushChTime!=null){
                planingEndRushChDate = DateUtil.parseStringToDate(planingEndRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_rush_ch_date(planingEndRushChDate);
            }

            Date actualStartBluntTurbDate=null;
            if(!actualStartBluntTurbTime.equals("") && actualStartBluntTurbTime!=null){
                actualStartBluntTurbDate = DateUtil.parseStringToDate(actualStartBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_start_blunt_turb_date(actualStartBluntTurbDate);
            }

            Date actualEndBluntTurbDate=null;
            if(!actualEndBluntTurbTime.equals("") && actualEndBluntTurbTime!=null){
                actualEndBluntTurbDate = DateUtil.parseStringToDate(actualEndBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_end_blunt_turb_date(actualEndBluntTurbDate);
            }
            Date actualStartChInjectionDate=null;
            if(!actualStartChInjectionTime.equals("") && actualStartChInjectionTime!=null){
                actualStartChInjectionDate = DateUtil.parseStringToDate(actualStartChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_start_ch_injection_date(actualStartChInjectionDate);
            }

            Date actualEndChInjectionDate=null;
            if(!actualEndChInjectionTime.equals("") && actualEndChInjectionTime!=null){
                actualEndChInjectionDate = DateUtil.parseStringToDate(actualEndChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_end_ch_injection_date(actualEndChInjectionDate);
            }

            Date actualStartRushChDate=null;
            if(!actualStartRushChTime.equals("") && actualStartRushChTime!=null){
                actualStartRushChDate = DateUtil.parseStringToDate(actualStartRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_start_rush_ch_date(actualStartRushChDate);
            }

            Date actualEndRushChDate=null;
            if(!actualEndRushChTime.equals("") && actualEndRushChTime!=null){
                actualEndRushChDate = DateUtil.parseStringToDate(actualEndRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_end_rush_ch_date(actualEndRushChDate);
            }

            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("attachment_file_a");
            MultipartFile imgFile2 = multipartRequest.getFile("attachment_file_b");
            MultipartFile imgFile3=multipartRequest.getFile("attachment_file_c");
            MultipartFile imgFile4=multipartRequest.getFile("attachment_file_d");

            chongxiForm.setAttachment_file_1(FtpFileUtil.uploadFile(imgFile1, FILEPATH));
            chongxiForm.setAttachment_file_2(FtpFileUtil.uploadFile(imgFile2, FILEPATH));
            chongxiForm.setAttachment_file_3(FtpFileUtil.uploadFile(imgFile3, FILEPATH));
            chongxiForm.setAttachment_file_4(FtpFileUtil.uploadFile(imgFile4, FILEPATH));

            int i =chongxiFormService.updateChongxiForm(chongxiForm);

            if(i<=0){
                return JSONUtil.toExtFormJson(false, "修改失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }


    /**
     * 调度员权限编辑冲洗、消毒申请单
     * @param request
     * @param chongxiForm
     * @return
     */
    @RequestMapping(value = "updateDChongxiForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateDChongxiForm(HttpServletRequest request,ChongxiForm chongxiForm){
        try {
            String filingTime = request.getParameter("filing_time");
            String planingStartBluntTurbTime = request.getParameter("plan_start_blunt_turb_time");
            String planingEndBluntTurbTime = request.getParameter("plan_end_blunt_turb_time");
            String planingStartChInjectionTime = request.getParameter("plan_start_ch_injection_time");
            String planingEndChInjectionTime = request.getParameter("plan_end_ch_injection_time");
            String planingStartRushChTime = request.getParameter("plan_start_rush_ch_time");
            String planingEndRushChTime = request.getParameter("plan_end_rush_ch_time");

            String actualStartBluntTurbTime = request.getParameter("actual_start_blunt_turb_time");
            String actualEndBluntTurbTime = request.getParameter("actual_end_blunt_turb_time");
            String actualStartChInjectionTime = request.getParameter("actual_start_ch_injection_time");
            String actualEndChInjectionTime = request.getParameter("actual_end_ch_injection_time");
            String actualStartRushChTime = request.getParameter("actual_start_rush_ch_time");
            String actualEndRushChTime = request.getParameter("actual_end_rush_ch_time");

            Date filingDate = null;
            if(!filingTime.equals("") && filingTime!=null){
                filingDate = DateUtil.parseStringToDate(filingTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setFiling_date(filingDate);
            }

            Date planingStartBluntTurbDate=null;
            if(!planingStartBluntTurbTime.equals("") && planingStartBluntTurbTime!=null){
                planingStartBluntTurbDate = DateUtil.parseStringToDate(planingStartBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_blunt_turb_date(planingStartBluntTurbDate);
            }

            Date planingEndBluntTurbDate=null;
            if(!planingEndBluntTurbTime.equals("") && planingEndBluntTurbTime!=null){
                planingEndBluntTurbDate = DateUtil.parseStringToDate(planingEndBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_blunt_turb_date(planingEndBluntTurbDate);
            }
            Date planingStartChInjectionDate=null;
            if(!planingStartChInjectionTime.equals("") && planingStartChInjectionTime!=null){
                planingStartChInjectionDate = DateUtil.parseStringToDate(planingStartChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_ch_injection_date(planingStartChInjectionDate);
            }

            Date planingEndChInjectionDate=null;
            if(!planingEndChInjectionTime.equals("") && planingEndChInjectionTime!=null){
                planingEndChInjectionDate = DateUtil.parseStringToDate(planingEndChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_ch_injection_date(planingEndChInjectionDate);
            }

            Date planingStartRushChDate=null;
            if(!planingStartRushChTime.equals("") && planingStartRushChTime!=null){
                planingStartRushChDate = DateUtil.parseStringToDate(planingStartRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_start_rush_ch_date(planingStartRushChDate);
            }

            Date planingEndRushChDate=null;
            if(!planingEndRushChTime.equals("") && planingEndRushChTime!=null){
                planingEndRushChDate = DateUtil.parseStringToDate(planingEndRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setPlan_end_rush_ch_date(planingEndRushChDate);
            }

            Date actualStartBluntTurbDate=null;
            if(!actualStartBluntTurbTime.equals("") && actualStartBluntTurbTime!=null){
                actualStartBluntTurbDate = DateUtil.parseStringToDate(actualStartBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_start_blunt_turb_date(actualStartBluntTurbDate);
            }

            Date actualEndBluntTurbDate=null;
            if(!actualEndBluntTurbTime.equals("") && actualEndBluntTurbTime!=null){
                actualEndBluntTurbDate = DateUtil.parseStringToDate(actualEndBluntTurbTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_end_blunt_turb_date(actualEndBluntTurbDate);
            }
            Date actualStartChInjectionDate=null;
            if(!actualStartChInjectionTime.equals("") && actualStartChInjectionTime!=null){
                actualStartChInjectionDate = DateUtil.parseStringToDate(actualStartChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_start_ch_injection_date(actualStartChInjectionDate);
            }

            Date actualEndChInjectionDate=null;
            if(!actualEndChInjectionTime.equals("") && actualEndChInjectionTime!=null){
                actualEndChInjectionDate = DateUtil.parseStringToDate(actualEndChInjectionTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_end_ch_injection_date(actualEndChInjectionDate);
            }

            Date actualStartRushChDate=null;
            if(!actualStartRushChTime.equals("") && actualStartRushChTime!=null){
                actualStartRushChDate = DateUtil.parseStringToDate(actualStartRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_start_rush_ch_date(actualStartRushChDate);
            }

            Date actualEndRushChDate=null;
            if(!actualEndRushChTime.equals("") && actualEndRushChTime!=null){
                actualEndRushChDate = DateUtil.parseStringToDate(actualEndRushChTime, DateUtil.FORMAT_MINUTE);
                chongxiForm.setActual_end_rush_ch_date(actualEndRushChDate);
            }

            int i =chongxiFormService.updateChongxiForm(chongxiForm);

            if(i<=0){
                return JSONUtil.toExtFormJson(false, "修改失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }


    /**
     * 删除冲洗、消毒申请单某行数据
     * @param request
     * @param id
     * @return
     */
    @RequestMapping(value = "deleteChongxiForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteChongxiForm(HttpServletRequest request, Integer id){
        try {
            int i =chongxiFormService.deleteChongxiForm(id);

            if(i<=0){
                return JSONUtil.toExtFormJson(false, "添加失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "saveChongxiForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String saveChongxiForm(HttpServletRequest request) {
        return JSONUtil.toExtResultAllJson(true, null, "冲洗单");
    }

}
