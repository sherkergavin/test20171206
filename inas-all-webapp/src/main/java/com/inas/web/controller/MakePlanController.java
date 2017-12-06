package com.inas.web.controller;

import com.inas.model.work.MakePlan;
import com.inas.model.work.MakePlanVO;
import com.inas.service.work.MakePlanService;
import com.inas.util.DateUtil;
import com.inas.util.FtpFileUtil;
import com.inas.util.JSONUtil;
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
 * Created by JM-SD09 on 2015/8/26.
 */
@RequestMapping("/makePlan")
@Controller
public class MakePlanController {

    @Resource(name = "makePlanService")
    private MakePlanService makePlanService;

    static Integer IniLimit;
    private static final String SELFPATH="makePlan" ;

    @RequestMapping(value = "/selecMakePlanList", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getMakePlanList() {
        try {
            List<MakePlan> list = makePlanService.getMakePlanList();
            return JSONUtil.toExtResultJson(list);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "/insertMakePlan", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertMakePlan(HttpServletRequest request,String starttime, String endtime, String code,
                                 String name, String attendance, String content) {
        try {
            List<MakePlan> list = makePlanService.getMakePlanList();

            for (int i=0;i<list.size();i++) {
                MakePlan makePlan = list.get(i);
                if(code.equals(makePlan.getCode())){
                    return JSONUtil.toExtFormJson(false, "编号不可重复,请重新输入", null);
                }else if (name.equals(makePlan.getName())) {
                    return JSONUtil.toExtFormJson(false, "名称不可重复,请重新输入", null);
                }
            }
            Date start = null;
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            start = format.parse(starttime);
            Date end = null;
            end = format.parse(endtime);
            MakePlan makePlan = new MakePlan();
            makePlan.setName(name);
            makePlan.setAttendance(attendance);
            makePlan.setCode(code);
            makePlan.setContent(content);
            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("met_img1");
            MultipartFile imgFile2=multipartRequest.getFile("met_img2");
            MultipartFile imgFile3=multipartRequest.getFile("met_img3");
            MultipartFile imgFile4=multipartRequest.getFile("met_img4");
            MultipartFile docFile1=multipartRequest.getFile("met_doc1");
            MultipartFile docFile2=multipartRequest.getFile("met_doc2");
            MultipartFile docFile3=multipartRequest.getFile("met_doc3");
            MultipartFile docFile4=multipartRequest.getFile("met_doc4");
            makePlan.setImg1(FtpFileUtil.uploadFile(imgFile1, SELFPATH));
            makePlan.setImg2(FtpFileUtil.uploadFile(imgFile2, SELFPATH));
            makePlan.setImg3(FtpFileUtil.uploadFile(imgFile3, SELFPATH));
            makePlan.setImg4(FtpFileUtil.uploadFile(imgFile4, SELFPATH));
            makePlan.setDoc1(FtpFileUtil.uploadFile(docFile1,SELFPATH));
            makePlan.setDoc2(FtpFileUtil.uploadFile(docFile2,SELFPATH));
            makePlan.setDoc3(FtpFileUtil.uploadFile(docFile3,SELFPATH));
            makePlan.setDoc4(FtpFileUtil.uploadFile(docFile4,SELFPATH));

            makePlan.setStarttime(start);
            makePlan.setEndtime(end);
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String user = userDetails.getUsername();
            makePlan.setCreator(user);
            int i = makePlanService.insertMakePlan(makePlan);
            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "添加失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "/upDateMakePlan", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String upDateMakePlan(HttpServletRequest request,Integer id,String starttime, String endtime, String code,
                                 String name, String attendance, String content) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String user = userDetails.getUsername();
            Date start = null;
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            start = format.parse(starttime);
            Date end = null;
            end = format.parse(endtime);
            MakePlan makePlan = new MakePlan();
            makePlan.setEditor(user);
            makePlan.setStarttime(start);
            makePlan.setEndtime(end);
            makePlan.setCode(code);
            makePlan.setName(name);
            makePlan.setAttendance(attendance);
            makePlan.setContent(content);
            //上传
            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("met_img1");
            MultipartFile imgFile2=multipartRequest.getFile("met_img2");
            MultipartFile imgFile3=multipartRequest.getFile("met_img3");
            MultipartFile imgFile4=multipartRequest.getFile("met_img4");
            MultipartFile docFile1=multipartRequest.getFile("met_doc1");
            MultipartFile docFile2=multipartRequest.getFile("met_doc2");
            MultipartFile docFile3=multipartRequest.getFile("met_doc3");
            MultipartFile docFile4=multipartRequest.getFile("met_doc4");
            makePlan.setImg1(FtpFileUtil.uploadFile(imgFile1, SELFPATH));
            makePlan.setImg2(FtpFileUtil.uploadFile(imgFile2, SELFPATH));
            makePlan.setImg3(FtpFileUtil.uploadFile(imgFile3, SELFPATH));
            makePlan.setImg4(FtpFileUtil.uploadFile(imgFile4, SELFPATH));
            makePlan.setDoc1(FtpFileUtil.uploadFile(docFile1,SELFPATH));
            makePlan.setDoc2(FtpFileUtil.uploadFile(docFile2,SELFPATH));
            makePlan.setDoc3(FtpFileUtil.uploadFile(docFile3,SELFPATH));
            makePlan.setDoc4(FtpFileUtil.uploadFile(docFile4,SELFPATH));
            makePlan.setId(id);
            int i = makePlanService.upDateMakePlan(makePlan);
            if (i <= 0) {
                return JSONUtil.toExtFormJson(false, "更改失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "/delMakePlan", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String delMakePlan(Integer id) {
        try {
            int i = makePlanService.delMakePlan(id);
            if(i <= 0){
                return JSONUtil.toExtFormJson(false, "删除失败", null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "/findMakePlanListBetweenDate", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findByTime(String staTime,String endTime,Integer start,Integer limit,String docCode,String docName){
        try {
            IniLimit=limit+start;
            MakePlanVO makePlanVO=new MakePlanVO();
            makePlanVO.setStaTime(DateUtil.parseStringToDate(staTime, DateUtil.FORMAT_DATE));
            makePlanVO.setEndTime(DateUtil.parseStringToDate(endTime, DateUtil.FORMAT_DATE));
            makePlanVO.setCode(docCode);
            makePlanVO.setName(docName);
            makePlanVO.setStart(start);
            makePlanVO.setLimit(IniLimit);
            List<MakePlan> list = makePlanService.findByTime(makePlanVO);
            Integer total = makePlanService.getTotal(makePlanVO);
            return JSONUtil.toExtResultJson(total,list,start,IniLimit);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }
}
