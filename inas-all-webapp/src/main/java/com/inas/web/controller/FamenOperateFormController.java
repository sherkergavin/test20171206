package com.inas.web.controller;

import com.inas.model.data.FamenCaozuoForm;
import com.inas.model.data.RoleJsonVo;
import com.inas.model.workflow.SearchWorkflowModel;
import com.inas.model.workflow.TaskModel;
import com.inas.service.data.impl.FamenCaozuoFormServiceImpl;
import com.inas.util.DateUtil;
import com.inas.util.FtpFileUtil;
import com.inas.util.JSONUtil;
import com.inas.workflow.WorkflowConstants;
import com.inas.workflow.impl.WorkflowServiceImpl;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import javax.xml.crypto.Data;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by luyufei on 2016/3/23.
 */
@RequestMapping("/workflow")
@Controller
public class FamenOperateFormController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource(name = "famenCaozuoFormService")
    private FamenCaozuoFormServiceImpl famenCaozuoFormService;

    private static final String FILEPATH="workflow" ;

    static Integer IniLimit;

    /**
     * 处理传递的匹配查询参数
     *
     * @param request
     * @param searchEnty
     * @return
     */

    @RequestMapping(value = "getFamenCaozuoForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getFamenCaozuoForm(HttpServletRequest request, SearchWorkflowModel searchEnty ) {
        try{
            IniLimit = searchEnty.getLimit() + searchEnty.getStart();

            FamenCaozuoForm fm=new FamenCaozuoForm();

            String planing_start_date="";
            if(searchEnty.getSearch_start_time()!=null&&!searchEnty.getSearch_start_time().equals("")){
               planing_start_date=searchEnty.getSearch_start_time();
               planing_start_date=planing_start_date.replace("T"," ");
               fm.setPlaning_start_date(DateUtil.parseStringToDate(planing_start_date, DateUtil.FORMAT_MINUTE));
            }


            String planing_end_date="";
            if(searchEnty.getSearch_end_time()!=null&&!searchEnty.getSearch_end_time().equals("")){
                planing_end_date=searchEnty.getSearch_end_time();
                planing_end_date=planing_end_date.replace("T"," ");
                fm.setPlaning_end_date(DateUtil.parseStringToDate(planing_end_date, DateUtil.FORMAT_MINUTE));
            }

            String actual_start_date="";
            if(searchEnty.getSearch_actual_start_date()!=null&&!searchEnty.getSearch_actual_start_date().equals("")){
                actual_start_date=searchEnty.getSearch_actual_start_date();
                actual_start_date=actual_start_date.replace("T"," ");
                fm.setActual_start_date(DateUtil.parseStringToDate(actual_start_date, DateUtil.FORMAT_MINUTE));
            }

            String actual_end_date="";
            if(searchEnty.getSearch_actual_end_date()!=null&&!searchEnty.getSearch_actual_end_date().equals("")){
                actual_end_date=searchEnty.getSearch_actual_end_date();
                actual_end_date=actual_end_date.replace("T"," ");
                fm.setActual_end_date(DateUtil.parseStringToDate(actual_end_date, DateUtil.FORMAT_MINUTE));
            }

            if(searchEnty.getSearch_Context()!=null&&!searchEnty.getSearch_Context().equals("")){
                fm.setJob_content(searchEnty.getSearch_Context());
            }

            if(searchEnty.getSearch_unit()!=null&&!searchEnty.getSearch_unit().equals("")){
                fm.setFill_unit(searchEnty.getSearch_unit());
            }

            if(searchEnty.getSearch_place()!=null&&!searchEnty.getSearch_place().equals("")){
                fm.setPlace(searchEnty.getSearch_place());
            }

            if(searchEnty.getSearch_code()!=null&&!searchEnty.getSearch_code().equals("")){
                fm.setCode(searchEnty.getSearch_code());
            }

            if(searchEnty.getSearch_type()!=null&&!searchEnty.getSearch_type().equals("")){
                fm.setType(searchEnty.getSearch_type());
            }

            if(searchEnty.getSearch_phone()!=null&&!searchEnty.getSearch_phone().equals("")){
                if(searchEnty.getSearch_phone()==1){
                    fm.setBefore_job(1);
                }else if(searchEnty.getSearch_phone()==2){
                    fm.setAfter_job(1);
                }else if(searchEnty.getSearch_phone()==3){
                    fm.setBefore_finish(1);
                }else if(searchEnty.getSearch_phone()==4){
                    fm.setAfter_finish(1);
                }
            }

            if(searchEnty.getSearch_dn()!=null&&!searchEnty.getSearch_dn().equals("")){
                fm.setDn(searchEnty.getSearch_dn());
            }

            if(searchEnty.getSearch_mc()!=null&&!searchEnty.getSearch_mc().equals("")){
                fm.setIs_monitoring_center(searchEnty.getSearch_mc());
            }

            fm.setStart(searchEnty.getStart());
            fm.setLimit(IniLimit);

            List<FamenCaozuoForm> resultList = famenCaozuoFormService.getFamenCaozuoForm(fm);

            RoleJsonVo vo = new RoleJsonVo();
            String state = searchEnty.getSearch_state();
            if(searchEnty.getSearch_state()!=null&&!searchEnty.getSearch_state().equals("")){
                List<FamenCaozuoForm> forms = new ArrayList<FamenCaozuoForm>();
                forms=famenCaozuoFormService.getStateFamen(resultList,searchEnty.getSearch_state());
                vo.setList(forms);
            }else{
                vo.setList(resultList);
            }

            Map<String,String> map = new HashMap<String,String>();
            //调用查询权限的方法
            boolean fm_add = famenCaozuoFormService.hasAccess("fm-add");
            boolean fm_manager_approve = famenCaozuoFormService.hasAccess("fm-manager-approve");
            boolean fm_officer_approve = famenCaozuoFormService.hasAccess("fm-officer-approve");
            boolean fm_dispatcher = famenCaozuoFormService.hasAccess("fm-dispatcher");
            boolean fm_remove = famenCaozuoFormService.hasAccess("fm-remove");


            map.put("fm_add", fm_add+"");
            map.put("fm_manager_approve", fm_manager_approve+"");
            map.put("fm_officer_approve", fm_officer_approve+"");
            map.put("fm_dispatcher", fm_dispatcher+"");
            map.put("fm_remove", fm_remove+"");
            vo.setRole(map);

            Integer totalCnt=famenCaozuoFormService.getFMTotal(fm);

            return JSONUtil.toExtResultJson(totalCnt, vo, searchEnty.getStart(), IniLimit);
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
    @RequestMapping(value = "getIsHasAccess", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getIsHasAccess(HttpServletRequest request){
        RoleJsonVo vo = new RoleJsonVo();
        Map<String,String> map = new HashMap<String,String>();

        //调用查询权限的方法
        boolean fm_add = famenCaozuoFormService.hasAccess("fm-add");
        boolean fm_manager_approve = famenCaozuoFormService.hasAccess("fm-manager-approve");
        boolean fm_officer_approve = famenCaozuoFormService.hasAccess("fm-officer-approve");
        boolean fm_dispatcher = famenCaozuoFormService.hasAccess("fm-dispatcher");
        boolean fm_remove = famenCaozuoFormService.hasAccess("fm-remove");

        map.put("fm_add", fm_add+"");
        map.put("fm_manager_approve", fm_manager_approve+"");
        map.put("fm_officer_approve", fm_officer_approve+"");
        map.put("fm_dispatcher", fm_dispatcher+"");
        map.put("fm_remove", fm_remove+"");
        vo.setRole(map);

        return JSONUtil.toExtResultAllJson(true, null, vo);
    }





    /**
     * 处理传递的删除参数
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "getDelValveOperateForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDelValveOperateForm(HttpServletRequest request, int id) {
        try{
            int i = famenCaozuoFormService.deleteValveOperateForm(id);
            if(i<=0){
                return JSONUtil.toExtFormJson(false, "删除失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }


    /**
     * 处理传递的增加参数
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "createFamenCaozuoForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String createFamenCaozuoForm(HttpServletRequest request,FamenCaozuoForm famenCaozuoForm){
        try {
            String planingStartTime = request.getParameter("planing_start_time");
            String planingEndTime = request.getParameter("planing_end_time");

            if(!famenCaozuoFormService.getIsCodeRepetition(famenCaozuoForm.getCode())){
                return JSONUtil.toExtFormJson(false, "编号不可重复,请重新输入", null);
            }

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");


            Date planingStartDate = null;
            if(!planingStartTime.equals("") && planingStartTime!=null){
                planingStartDate = format.parse(planingStartTime);
            }

            Date planingEndDate = null;
            if(!planingEndTime.equals("") && planingEndTime!=null){
                planingEndDate = format.parse(planingEndTime);
            }

            famenCaozuoForm.setPlaning_start_date(planingStartDate);
            famenCaozuoForm.setPlaning_end_date(planingEndDate);

            //获取登录人姓名
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String user = userDetails.getUsername();

            famenCaozuoForm.setDispatche_manager(user);
            famenCaozuoForm.setDispatche_center_director("薛礼樑");

            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("attachment_file_a");
            MultipartFile imgFile2=multipartRequest.getFile("attachment_file_b");
            MultipartFile imgFile3=multipartRequest.getFile("attachment_file_c");
            MultipartFile imgFile4=multipartRequest.getFile("attachment_file_d");

            famenCaozuoForm.setAttachment_file_1(FtpFileUtil.uploadFile(imgFile1, FILEPATH));
            famenCaozuoForm.setAttachment_file_2(FtpFileUtil.uploadFile(imgFile2, FILEPATH));
            famenCaozuoForm.setAttachment_file_3(FtpFileUtil.uploadFile(imgFile3, FILEPATH));
            famenCaozuoForm.setAttachment_file_4(FtpFileUtil.uploadFile(imgFile4, FILEPATH));

            int i = famenCaozuoFormService.createFamenCaozuoForm(famenCaozuoForm);

            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "添加失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }


    /**
     * 调度管理员编辑方法
     * @param request
     * @return
     */
    @RequestMapping(value = "updateFamenCaozuoForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public  String  updateFamenCaozuoForm(HttpServletRequest request, FamenCaozuoForm famenCaozuoForm){
        try {
            String planingStartTime = request.getParameter("planing_start_time");
            String planingEndTime = request.getParameter("planing_end_time");
            String actualStartTime = request.getParameter("actual_start_time");
            String actualEndTime = request.getParameter("actual_end_time");

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");


            Date planingStartDate = null;
            if(!planingStartTime.equals("") && planingStartTime!=null){
                planingStartDate = format.parse(planingStartTime);
            }

            Date planingEndDate = null;
            if(!planingEndTime.equals("") && planingEndTime!=null){
                planingEndDate = format.parse(planingEndTime);
            }

            Date actualStartDate=null;
            if(!actualStartTime.equals("") && actualStartTime!=null){
                actualStartDate = format.parse(actualStartTime);
            }

            Date actualEndDate=null;
            if(!actualEndTime.equals("") && actualEndTime!=null){
                actualEndDate = format.parse(actualEndTime);
            }

            famenCaozuoForm.setPlaning_start_date(planingStartDate);
            famenCaozuoForm.setPlaning_end_date(planingEndDate);
            famenCaozuoForm.setActual_start_date(actualStartDate);
            famenCaozuoForm.setActual_end_date(actualEndDate);


            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("attachment_file_a");
            MultipartFile imgFile2 = multipartRequest.getFile("attachment_file_b");
            MultipartFile imgFile3=multipartRequest.getFile("attachment_file_c");
            MultipartFile imgFile4=multipartRequest.getFile("attachment_file_d");

            famenCaozuoForm.setAttachment_file_1(FtpFileUtil.uploadFile(imgFile1, FILEPATH));
            famenCaozuoForm.setAttachment_file_2(FtpFileUtil.uploadFile(imgFile2, FILEPATH));
            famenCaozuoForm.setAttachment_file_3(FtpFileUtil.uploadFile(imgFile3, FILEPATH));
            famenCaozuoForm.setAttachment_file_4(FtpFileUtil.uploadFile(imgFile4, FILEPATH));

            int i = famenCaozuoFormService.updateFamenCaozuoForm(famenCaozuoForm);

            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "修改失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }


    /**
     * 调度员编辑方法
     * @param request
     * @return
     */
    @RequestMapping(value = "updateDFamenCaozuoForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public  String  updateDFamenCaozuoForm(HttpServletRequest request, FamenCaozuoForm famenCaozuoForm){
        try {
            String actualStartTime = request.getParameter("actual_start_time");
            String actualEndTime = request.getParameter("actual_end_time");

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");

            Date actualStartDate=null;
            if(!actualStartTime.equals("") && actualStartTime!=null){
                actualStartDate = format.parse(actualStartTime);
            }

            Date actualEndDate=null;
            if(!actualEndTime.equals("") && actualEndTime!=null){
                actualEndDate = format.parse(actualEndTime);
            }

            famenCaozuoForm.setActual_start_date(actualStartDate);
            famenCaozuoForm.setActual_end_date(actualEndDate);

            int i = famenCaozuoFormService.updateFamenCaozuoForm(famenCaozuoForm);

            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "修改失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "getFormState", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getFormState(HttpServletRequest request) {
        List<String> stateList = new ArrayList<String>();
        stateList.add("待我审批");
        stateList.add("审批中");
        stateList.add("准备中");
        stateList.add("正在进行");
        stateList.add("已完成");
        return JSONUtil.toExtResultAllJson(true, null, stateList);

    }
}
