package com.inas.web.controller;

import com.inas.model.data.DataItem;
import com.inas.model.data.DataItemVO;
import com.inas.service.data.DataItemService;
import com.inas.util.DateUtil;
import com.inas.util.GlobalConstants;
import com.inas.util.JSONUtil;
import com.inas.util.WrapperUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by JM-SD09 on 2015/9/9.
 */
@RequestMapping("/data")
@Controller
public class DataItemController {

    @Resource
    private DataItemService dataItemService;


    @RequestMapping(value = "/getDataItemList", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDataItemList(DataItemVO dataItem) {
        try {
            Integer data_item_type = GlobalConstants.DATA_ITEM_TYPE_PUMP;
            dataItem.setType(data_item_type);
            return JSONUtil.toExtResultJson(
                    dataItemService.getDataItemList(dataItem));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据站点属性获取项目列表
    @RequestMapping(value = "/getDataItemByEntity", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDataItemByEntityId(HttpServletRequest request, DataItem dataItem){
        dataItem.setDeleted(0);
        return JSONUtil.toExtResultJson(dataItemService.getDataItemByEntity(dataItem));
    }

    //插入项目
    @RequestMapping(value = "/saveDataItemByEntityId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveDataItemByEntityId(HttpServletRequest request,String jsonResult){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List jsonList  =JSONUtil.fromJson(jsonResult,ArrayList.class);
        List<DataItemVO> insertList = new ArrayList<>();
        List<DataItemVO> updateList = new ArrayList<>();
        String result = null;
        DataItemVO dataItemVO = null;
        for(int i=0;i<jsonList.size();i++){
            Map row = (Map)jsonList.get(i);
            dataItemVO = new DataItemVO();
            if(null==row.get("id")||"".equals(row.get("id"))){
                dataItemVO.setId(null);
            }else{
                dataItemVO.setId(Integer.valueOf(row.get("id").toString()));
            }
            if(null==row.get("data_item_name")||"".equals(row.get("data_item_name"))){
                dataItemVO.setData_item_name(null);
            }else{
                dataItemVO.setData_item_name(row.get("data_item_name").toString());
            }
            if(null==row.get("data_format_id")||"".equals(row.get("data_format_id"))){
                dataItemVO.setData_format_id(null);
            }else{
                dataItemVO.setData_format_id(Integer.valueOf(row.get("data_format_id").toString()));
            }
            if(null==row.get("lo")||"".equals(row.get("lo"))){
                dataItemVO.setLo(null);
            }else{
                dataItemVO.setLo(Integer.valueOf(row.get("lo").toString()));
            }
            if(null==row.get("entity_id")||"".equals(row.get("entity_id"))){
                dataItemVO.setEntity_id(null);
            }else{
                dataItemVO.setEntity_id(Integer.valueOf(row.get("entity_id").toString()));
            }
            if(null==row.get("roll_interval")||"".equals(row.get("roll_interval"))){
                dataItemVO.setRoll_interval(null);
            }else{
                dataItemVO.setRoll_interval(row.get("roll_interval").toString());
            }
            if(null==row.get("pressure_data_item_id")||"".equals(row.get("pressure_data_item_id"))){
                dataItemVO.setPressure_data_item_id(null);
            }else{
                dataItemVO.setPressure_data_item_id(Integer.valueOf(row.get("pressure_data_item_id").toString()));
            }
            dataItemVO.setType(WrapperUtil.parseObjectToInteger(row.get("type")));
            dataItemVO.setCreator(userDetails.getUsername());
            dataItemVO.setCreate_date(DateUtil.getDate());
            dataItemVO.setEditor(userDetails.getUsername());
            dataItemVO.setEdit_date(DateUtil.getDate());
            if(null == dataItemVO.getId() || "".equals(dataItemVO.getId()) || dataItemVO.getId()==0){
                insertList.add(dataItemVO);
            }else {
                updateList.add(dataItemVO);
            }

        }
        try{
            result = JSONUtil.toExtFormJson(dataItemService.saveDataItemEntityId(insertList,updateList), "");
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }

}
