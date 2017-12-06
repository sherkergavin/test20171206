package com.inas.web.controller;

import com.inas.model.work.MettingRec;
import com.inas.model.work.MettingRecVO;
import com.inas.service.work.MettingRecService;
import com.inas.util.DateUtil;
import com.inas.util.FtpFileUtil;
import com.inas.util.JSONUtil;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
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
import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.net.SocketException;
import java.text.ParseException;
import java.util.List;

/**
 * Created by ZS on 2015/8/6.
 */
@RequestMapping("/mettingRec")
@Controller
public class MettingRecController {
    @Resource(name = "mettingRecService")
    private MettingRecService mettingRecService;

    static Integer IniLimit;
    private static final String SELFPATH="metting" ;

    @RequestMapping(value = "/getMettingRecByEn", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getMettingRecByEn(HttpServletRequest request, MettingRec mettingRec) {
        List<MettingRec> list = mettingRecService.getMettingRecsByEn(mettingRec);
        String s = JSONUtil.toExtResultJson(list.size(), list, 0, 5);
        return s;
    }

    @RequestMapping(value = "/getMettingRecByMap", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getMettingRecByMap(HttpServletRequest request, String staTime, String endTime, Integer start, Integer limit,String code,String name,String attendance,String address) {
        IniLimit = limit + start;
//        System.out.println("initLimit===" + IniLimit);
        MettingRecVO mettingRecVO=new MettingRecVO();
        try {
            mettingRecVO.setStaTime(DateUtil.parseStringToDate(staTime, DateUtil.FORMAT_DATE));
            mettingRecVO.setEndTime(DateUtil.parseStringToDate(endTime, DateUtil.FORMAT_DATE));
            mettingRecVO.setCode(code);
            mettingRecVO.setName(name);
            mettingRecVO.setAttendance(attendance);
            mettingRecVO.setAddress(address);
        }catch(ParseException e){
            e.printStackTrace();
        }
        mettingRecVO.setStart(start);
        mettingRecVO.setLimit(IniLimit);
        List<MettingRec> list = mettingRecService.getMettingByMap(mettingRecVO);
        Integer totalCnt = mettingRecService.getTotalCnt(mettingRecVO);
        String s = JSONUtil.toExtResultJson(totalCnt, list, start, IniLimit);
        return s;
    }

    @RequestMapping(value = "/saveMettingRec", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveMettingRec(HttpServletRequest request, MettingRec mettingRec) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String mettingTime = request.getParameter("hyTime");
        if (mettingTime != null && !"".equals(mettingTime)) {
            try {
                mettingRec.setTime(DateUtil.parseStringToDate(mettingTime,DateUtil.FORMAT_DATE));
                //上传文件  met_img1
                MultipartRequest multipartRequest=(MultipartRequest)request;
                MultipartFile imgFile1=multipartRequest.getFile("met_img1");
                MultipartFile imgFile2=multipartRequest.getFile("met_img2");
                MultipartFile imgFile3=multipartRequest.getFile("met_img3");
                MultipartFile imgFile4=multipartRequest.getFile("met_img4");
                MultipartFile docFile1=multipartRequest.getFile("met_doc1");
                MultipartFile docFile2=multipartRequest.getFile("met_doc2");
                MultipartFile docFile3=multipartRequest.getFile("met_doc3");
                MultipartFile docFile4=multipartRequest.getFile("met_doc4");
                mettingRec.setImg1(FtpFileUtil.uploadFile(imgFile1, SELFPATH));
                mettingRec.setImg2(FtpFileUtil.uploadFile(imgFile2, SELFPATH));
                mettingRec.setImg3(FtpFileUtil.uploadFile(imgFile3, SELFPATH));
                mettingRec.setImg4(FtpFileUtil.uploadFile(imgFile4, SELFPATH));
                mettingRec.setDoc1(FtpFileUtil.uploadFile(docFile1,SELFPATH));
                mettingRec.setDoc2(FtpFileUtil.uploadFile(docFile2,SELFPATH));
                mettingRec.setDoc3(FtpFileUtil.uploadFile(docFile3,SELFPATH));
                mettingRec.setDoc4(FtpFileUtil.uploadFile(docFile4,SELFPATH));

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        mettingRecService.saveMettingRec(mettingRec, userDetails.getUsername());
        return JSONUtil.toExtFormJson(true, null);
    }


    @RequestMapping(value = "/delMettingRecById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String delMettingRecById(HttpServletRequest request, Integer id) {

        try {
            mettingRecService.delMettingRec(id);
            return JSONUtil.toExtFormJson(true, null);
        } catch (Exception e) {
            return JSONUtil.toExtFormJson(false, e.getMessage());
        }

    }
}
