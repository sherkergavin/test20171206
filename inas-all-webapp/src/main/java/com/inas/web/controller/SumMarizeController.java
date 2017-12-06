package com.inas.web.controller;

import com.inas.model.work.SumMarize;
import com.inas.model.work.SumMarizeVO;
import com.inas.service.work.SumMarizeService;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by JM-SD09 on 2015/8/28.
 */
@RequestMapping("/sumMarize")
@Controller
public class SumMarizeController {

    @Resource(name = "sumMarizeService")
    private SumMarizeService sumMarizeService;

    private static final String SELFPATH="sumMarize";

    static Integer IniLimit;

    @RequestMapping(value = "/getSumMarizeByDate", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getSumMarizeByDate(String starTime, String endTime,String code,String name,String attendance, Integer start, Integer limit) {
        try {
            IniLimit = limit + start;
            SumMarizeVO sumMarizeVO=new SumMarizeVO();
            try{
            sumMarizeVO.setStarTime(DateUtil.parseStringToDate(starTime, DateUtil.FORMAT_DATE));
            sumMarizeVO.setEndTime(DateUtil.parseStringToDate(endTime, DateUtil.FORMAT_DATE));
            }catch(ParseException e){
                e.printStackTrace();
            }
            sumMarizeVO.setCode(code);
            sumMarizeVO.setName(name);
            sumMarizeVO.setAttendance(attendance);
            sumMarizeVO.setStart(start);
            sumMarizeVO.setLimit(IniLimit);
            Integer total = sumMarizeService.getTotal(sumMarizeVO);
            List<SumMarize> list = sumMarizeService.findSumMarizeByDate(sumMarizeVO);
            return JSONUtil.toExtResultJson(total, list, start, IniLimit);
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
    }

    @RequestMapping(value = "/insertSumMarize", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertSumMarize(HttpServletRequest request,String attendance,String code,String content, String dateTime,
                                  String  name) {
        try {
            /**
             * 查询名称和编号
             */
            List<SumMarize> lists = sumMarizeService.getMakePlanListName();
            for(int i=0;i<lists.size();i++){
                SumMarize sumMarize = lists.get(i);
                if(code.equals(sumMarize.getCode())){
                    return JSONUtil.toExtFormJson(false, "文档编号重复,请重新输入",null);
                }else  if(name.equals(sumMarize.getName())){
                    return JSONUtil.toExtFormJson(false, "小结名称重复,请重新输入",null);
                }
            }
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String user = userDetails.getUsername();
            Date date = null;
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            date = format.parse(dateTime);
            SumMarize sumMarize = new SumMarize();
            sumMarize.setContent(content);

            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("met_img1");
            MultipartFile imgFile2=multipartRequest.getFile("met_img2");
            MultipartFile imgFile3=multipartRequest.getFile("met_img3");
            MultipartFile imgFile4=multipartRequest.getFile("met_img4");
            MultipartFile docFile1=multipartRequest.getFile("met_doc1");
            MultipartFile docFile2=multipartRequest.getFile("met_doc2");
            MultipartFile docFile3=multipartRequest.getFile("met_doc3");
            MultipartFile docFile4=multipartRequest.getFile("met_doc4");
            sumMarize.setImg1(FtpFileUtil.uploadFile(imgFile1, SELFPATH));
            sumMarize.setImg2(FtpFileUtil.uploadFile(imgFile2, SELFPATH));
            sumMarize.setImg3(FtpFileUtil.uploadFile(imgFile3, SELFPATH));
            sumMarize.setImg4(FtpFileUtil.uploadFile(imgFile4, SELFPATH));
            sumMarize.setDoc1(FtpFileUtil.uploadFile(docFile1,SELFPATH));
            sumMarize.setDoc2(FtpFileUtil.uploadFile(docFile2,SELFPATH));
            sumMarize.setDoc3(FtpFileUtil.uploadFile(docFile3,SELFPATH));
            sumMarize.setDoc4(FtpFileUtil.uploadFile(docFile4,SELFPATH));

            sumMarize.setAttendance(attendance);
            sumMarize.setCode(code);
            sumMarize.setCreator(user);
            sumMarize.setName(name);
            sumMarize.setDateTime(date);
            List<SumMarize> list = sumMarizeService.getMakePlanListName();
            for (int i = 0; i < list.size(); i++) {
                SumMarize sum = list.get(i);
                if (sumMarize.getCode().equals(sum.getCode())) {
                    return JSONUtil.toExtFormJson(false, "小结编号重复,请重新输入", null);
                } else if (sumMarize.getName().equals(sum.getName())) {
                    return JSONUtil.toExtFormJson(false, "小结名称重复,请重新输入", null);
                }
            }
            sumMarizeService.insertSumMarize(sumMarize);
            return JSONUtil.toExtFormJson(true, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "/upDateSumMarize", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String upDateSumMarize(HttpServletRequest request,Integer id,String attendance,String code,String content,
                                  String dateTime,MultipartFile docFile,MultipartFile imgFile,String  name) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String user = userDetails.getUsername();
            Date date = null;
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            date = format.parse(dateTime);
            SumMarize sumMarize = new SumMarize();
            sumMarize.setContent(content);

            MultipartRequest multipartRequest=(MultipartRequest)request;
            MultipartFile imgFile1=multipartRequest.getFile("met_img1");
            MultipartFile imgFile2=multipartRequest.getFile("met_img2");
            MultipartFile imgFile3=multipartRequest.getFile("met_img3");
            MultipartFile imgFile4=multipartRequest.getFile("met_img4");
            MultipartFile docFile1=multipartRequest.getFile("met_doc1");
            MultipartFile docFile2=multipartRequest.getFile("met_doc2");
            MultipartFile docFile3=multipartRequest.getFile("met_doc3");
            MultipartFile docFile4=multipartRequest.getFile("met_doc4");
            sumMarize.setImg1(FtpFileUtil.uploadFile(imgFile1, SELFPATH));
            sumMarize.setImg2(FtpFileUtil.uploadFile(imgFile2, SELFPATH));
            sumMarize.setImg3(FtpFileUtil.uploadFile(imgFile3, SELFPATH));
            sumMarize.setImg4(FtpFileUtil.uploadFile(imgFile4, SELFPATH));
            sumMarize.setDoc1(FtpFileUtil.uploadFile(docFile1,SELFPATH));
            sumMarize.setDoc2(FtpFileUtil.uploadFile(docFile2,SELFPATH));
            sumMarize.setDoc3(FtpFileUtil.uploadFile(docFile3,SELFPATH));
            sumMarize.setDoc4(FtpFileUtil.uploadFile(docFile4,SELFPATH));

            sumMarize.setAttendance(attendance);
            sumMarize.setCode(code);
            sumMarize.setEditor(user);
            sumMarize.setName(name);
            sumMarize.setDateTime(date);
            sumMarize.setId(id);
            Integer i = sumMarizeService.upDateSumMarize(sumMarize);
            if(i<=0){
                return JSONUtil.toExtFormJson(true, null, null);
            }
            return JSONUtil.toExtFormJson(true, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

    @RequestMapping(value = "/delSumMarize", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String delSumMarize(Integer id){
        try {
            sumMarizeService.delSumMarize(id);
            return JSONUtil.toExtFormJson(true, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return JSONUtil.toExtFormJson(false, "系统异常,请联系管理员", e.getMessage());
        }
    }

}
