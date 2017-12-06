package com.inas.web.controller;

import com.inas.model.data.EquipmentStopForm;
import com.inas.model.data.RoleJsonVo;
import com.inas.model.workflow.SearchWorkflowModel;
import com.inas.service.data.impl.EquipmentStopServiceImpl;
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
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by luyufei on 2016/3/23.
 */
@RequestMapping("/equipment")
@Controller
public class EquipmentStopOperaterController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource(name = "equipmentStopFormService")
    private EquipmentStopServiceImpl equipmentStopFormService;

    private static final String FILEPATH="equipment" ;

    /**
     * 查找操作
     *
     * @param request
     * @param searchEnty
     * @return
     */

    @RequestMapping(value = "getEquipmentStopForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getEquipmentStopForm(HttpServletRequest request, SearchWorkflowModel searchEnty ) {
        String a = searchEnty.getSearch_start_time();
        String b = searchEnty.getSearch_end_time();
        a=a.replace("T"," ");
        b=b.replace("T"," ");
        searchEnty.setSearch_start_time(a);
        searchEnty.setSearch_end_time(b);
        List<EquipmentStopForm> resultList = equipmentStopFormService.getEquipmentStopForm(searchEnty);
        RoleJsonVo vo = new RoleJsonVo();
        vo.setList(resultList);
        Map<String,String> map = new HashMap<String,String>();
        //调用查询权限的方法

        boolean sbty_fg_approve = equipmentStopFormService.hasAccess("sbty-fg-approve");
        boolean sbty_cm_approve = equipmentStopFormService.hasAccess("sbty-cm-approve");
        boolean sbty_officer_approve = equipmentStopFormService.hasAccess("sbty-officer-approve");
        boolean sbty_manager_approve = equipmentStopFormService.hasAccess("sbty-manager-approve");
        boolean sbty_dp_approve = equipmentStopFormService.hasAccess("sbty-dp-approve");
        boolean sbty_remove = equipmentStopFormService.hasAccess("sbty-remove");
        boolean sbty_add = equipmentStopFormService.hasAccess("sbty-add");
        boolean sbty_dispatcher = equipmentStopFormService.hasAccess("sbty-dispatcher");



        map.put("sbty_fg_approve", sbty_fg_approve+"");
        map.put("sbty_cm_approve", sbty_cm_approve+"");
        map.put("sbty_officer_approve", sbty_officer_approve+"");
        map.put("sbty_manager_approve", sbty_manager_approve+"");
        map.put("sbty_dp_approve", sbty_dp_approve+"");
        map.put("sbty_remove", sbty_remove + "");
        map.put("sbty_add", sbty_add+"");
        map.put("sbty_dispatcher", sbty_dispatcher+"");

        vo.setRole(map);

        return JSONUtil.toExtResultAllJson(true, null,vo);
      //  return JSONUtil.toExtResultAllJson(true, null,resultList);

    }
    /**
     * 新增操作
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "createEquipmentStopForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String createEquipmentStopForm(HttpServletRequest request,EquipmentStopForm equipmentStopForm){
        try {
            String filing_date = request.getParameter("filing_time");
            String planingStartTime = request.getParameter("planing_start_time");
            String planingEndTime = request.getParameter("planing_end_time");

            if(!equipmentStopFormService.getIsCodeRepetition(equipmentStopForm.getCode())){
                return JSONUtil.toExtFormJson(false, "编号不可重复,请重新输入", null);
            }

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Date filingDate = null;
            if(!filing_date.equals("") && filing_date!=null){
                filingDate = format.parse(filing_date);
            }

            Date planingStartDate = null;
            if(!planingStartTime.equals("") && planingStartTime!=null){
                planingStartDate = format.parse(planingStartTime);
            }

            Date planingEndDate = null;
            if(!planingEndTime.equals("") && planingEndTime!=null){
                planingEndDate = format.parse(planingEndTime);
            }

            equipmentStopForm.setFiling_date(filingDate);
            equipmentStopForm.setPlaning_start_date(planingStartDate);
            equipmentStopForm.setPlaning_end_date(planingEndDate);

            //获取登录人姓名
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String user = userDetails.getUsername();
            equipmentStopForm.setLister(user);
            equipmentStopForm.setLister_time(new Date());

            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("attachment_file_a");
            MultipartFile imgFile2=multipartRequest.getFile("attachment_file_b");
            MultipartFile imgFile3=multipartRequest.getFile("attachment_file_c");
            MultipartFile imgFile4=multipartRequest.getFile("attachment_file_d");

            equipmentStopForm.setAttachment_file_1(FtpFileUtil.uploadFile(imgFile1, FILEPATH));
            equipmentStopForm.setAttachment_file_2(FtpFileUtil.uploadFile(imgFile2, FILEPATH));
            equipmentStopForm.setAttachment_file_3(FtpFileUtil.uploadFile(imgFile3, FILEPATH));
            equipmentStopForm.setAttachment_file_4(FtpFileUtil.uploadFile(imgFile4, FILEPATH));

            int i = equipmentStopFormService.createEquipmentStopForm(equipmentStopForm);

            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "添加失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

//更新审批操作
    @RequestMapping(value = "updateEquipmentStopForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public  String  updateFamenCaozuoForm(HttpServletRequest request,EquipmentStopForm equipmentStopForm){
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String filingTime = request.getParameter("filing_time");
            String planingStartTime = request.getParameter("planing_start_time");
            String planingEndTime = request.getParameter("planing_end_time");
            String actualStartTime = request.getParameter("actual_start_time");
            String actualEndTime = request.getParameter("actual_end_time");

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Date filingDate = null;
            if(!filingTime.equals("") && filingTime!=null){
                filingDate = format.parse(filingTime);
                equipmentStopForm.setFiling_date(filingDate);
            }

            Date planingStartDate = null;
            if(!planingStartTime.equals("") && planingStartTime!=null){
                planingStartDate = format.parse(planingStartTime);
                equipmentStopForm.setPlaning_start_date(planingStartDate);
            }

            Date planingEndDate = null;
            if(!planingEndTime.equals("") && planingEndTime!=null){
                planingEndDate = format.parse(planingEndTime);
                equipmentStopForm.setPlaning_end_date(planingEndDate);
            }

            Date actualStartDate=null;
            if(!actualStartTime.equals("") && actualStartTime!=null){
                actualStartDate = format.parse(actualStartTime);
                equipmentStopForm.setActual_start_date(actualStartDate);
            }

            Date actualEndDate=null;
            if(!actualEndTime.equals("") && actualEndTime!=null){
                actualEndDate = format.parse(actualEndTime);
                equipmentStopForm.setActual_end_date(actualEndDate);
            }
            if(equipmentStopForm.getNew_check_result()!=null) {
                String a = equipmentStopForm.getNew_check_result();
                if(equipmentStopForm.getCheck_result()!=null && !"".equals(equipmentStopForm.getCheck_result())) {
                    String b =  equipmentStopForm.getCheck_result().replace("\r\n通过-->","\r\n");
//                    equipmentStopForm.setCheck_result(b);
                    equipmentStopForm.setCheck_result(b + "\r\n" + userDetails.getUsername() + "" + "审批意见:" +a);
                }else{
                    equipmentStopForm.setCheck_result( userDetails.getUsername() + "" + "审批意见:" + a);
                }
            }
            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("attachment_file_a");
            MultipartFile imgFile2 = multipartRequest.getFile("attachment_file_b");
            MultipartFile imgFile3=multipartRequest.getFile("attachment_file_c");
            MultipartFile imgFile4=multipartRequest.getFile("attachment_file_d");

            equipmentStopForm.setAttachment_file_1(FtpFileUtil.uploadFile(imgFile1, FILEPATH));
            equipmentStopForm.setAttachment_file_2(FtpFileUtil.uploadFile(imgFile2, FILEPATH));
            equipmentStopForm.setAttachment_file_3(FtpFileUtil.uploadFile(imgFile3, FILEPATH));
            equipmentStopForm.setAttachment_file_4(FtpFileUtil.uploadFile(imgFile4, FILEPATH));

//            System.out.println("************************************************************************");
//            System.out.println(equipmentStopForm.getCompany_manager()!= null && !"".equals(equipmentStopForm.getCompany_manager()));
//            System.out.println(equipmentStopForm.getDispatche_manager() == null|| "".equals(equipmentStopForm.getDispatche_manager()));
//            System.out.println(equipmentStopFormService.hasAccess("sbty-officer-approve"));
//            System.out.println("************************************************************************");
//            System.out.println(equipmentStopForm.getCompany_manager()!= null && !"".equals(equipmentStopForm.getCompany_manager()) &&
//                    (equipmentStopForm.getDispatche_manager() == null|| "".equals(equipmentStopForm.getDispatche_manager())) && equipmentStopFormService.hasAccess("sbty-officer-approve") );
            if((equipmentStopForm.getFactory_manager() == null || "".equals(equipmentStopForm.getFactory_manager())) && equipmentStopFormService.hasAccess("sbty-fg-approve")) {
                equipmentStopForm.setFactory_manager(userDetails.getUsername());
                equipmentStopForm.setFactory_manager_date(new Date());
            }
           else if(equipmentStopForm.getFactory_manager()!=null &&!"".equals(equipmentStopForm.getFactory_manager())&&
                    (equipmentStopForm.getCompany_manager()==null || "".equals(equipmentStopForm.getCompany_manager())) && equipmentStopFormService.hasAccess("sbty-cm-approve")){
                equipmentStopForm.setCompany_manager(userDetails.getUsername());
                equipmentStopForm.setCompany_manager_date(new Date());
            }
            else if (equipmentStopForm.getCompany_manager()!= null && !"".equals(equipmentStopForm.getCompany_manager()) &&
                    (equipmentStopForm.getDispatche_manager() == null|| "".equals(equipmentStopForm.getDispatche_manager())) && equipmentStopFormService.hasAccess("sbty-officer-approve") ){
                equipmentStopForm.setDispatche_manager(userDetails.getUsername());
                equipmentStopForm.setDispatche_manager_date(new Date());
            }
            else if(equipmentStopForm.getDispatche_manager()!=null && !"".equals(equipmentStopForm.getDispatche_manager()) &&
                    (equipmentStopForm.getDispatche_center_director() == null || "".equals(equipmentStopForm.getDispatche_center_director())) && equipmentStopFormService.hasAccess("sbty-manager-approve")) {
                equipmentStopForm.setDispatche_center_director(userDetails.getUsername());
                equipmentStopForm.setDispatche_center_director_date(new Date());
            }
            else if (equipmentStopForm.getDispatche_center_director()!= null &&!"".equals(equipmentStopForm.getDispatche_manager()) &&
                    (equipmentStopForm.getDispatcher() == null || "".equals(equipmentStopForm.getDispatcher()))&& equipmentStopFormService.hasAccess("sbty-dp-approve")) {
                equipmentStopForm.setDispatcher(userDetails.getUsername());
                equipmentStopForm.setDispatcher_date(new Date());
            }

            int i = equipmentStopFormService.updateEquipmentStopForm(equipmentStopForm);

            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "修改失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    //驳回操作
    @RequestMapping(value = "rejectEquipmentStopForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public  String  rejectEquipmentStopForm(HttpServletRequest request){
        try {

          String id = request.getParameter("id");
            int i = equipmentStopFormService.rejectEquipmentStopForm( Integer.parseInt(id));

            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "修改失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

//删除操作
    @RequestMapping(value = "deleteEquipmentStopForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteEquipmentStopForm(HttpServletRequest request, int id) {
        try{
            EquipmentStopForm equipmentStopForm = new EquipmentStopForm();
            equipmentStopForm.setId(id);

            int i = equipmentStopFormService.deleteEquipmentStopForm(id);
            if(i<=0){
                return JSONUtil.toExtFormJson(false, "删除失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }


//获取权限操作
    @RequestMapping(value = "getIsHasAccess", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getIsHasAccess(HttpServletRequest request){
        RoleJsonVo vo = new RoleJsonVo();
        Map<String,String> map = new HashMap<String,String>();

        //调用查询权限的方法
        boolean sbty_fg_approve = equipmentStopFormService.hasAccess("sbty-fg-approve");
        boolean sbty_cm_approve = equipmentStopFormService.hasAccess("sbty-cm-approve");
        boolean sbty_officer_approve = equipmentStopFormService.hasAccess("sbty-officer-approve");
        boolean sbty_manager_approve = equipmentStopFormService.hasAccess("sbty-manager-approve");
        boolean sbty_dp_approve = equipmentStopFormService.hasAccess("sbty-dp-approve");
        boolean sbty_remove = equipmentStopFormService.hasAccess("sbty-remove");
        boolean sbty_add = equipmentStopFormService.hasAccess("sbty-add");
        boolean sbty_dispatcher = equipmentStopFormService.hasAccess("sbty-dispatcher");

        map.put("sbty_fg_approve", sbty_fg_approve+"");
        map.put("sbty_cm_approve", sbty_cm_approve+"");
        map.put("sbty_officer_approve", sbty_officer_approve+"");
        map.put("sbty_manager_approve", sbty_manager_approve+"");
        map.put("sbty_dp_approve", sbty_dp_approve+"");
        map.put("sbty_remove", sbty_remove+"");
        map.put("sbty_add", sbty_add+"");
        map.put("sbty_dispatcher", sbty_dispatcher+"");
        vo.setRole(map);

        return JSONUtil.toExtResultAllJson(true, null, vo);
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
