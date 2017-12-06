package com.inas.web.pmcontroller;


import com.inas.model.data.BindColumn;
import com.inas.service.data.DataBindConfigService;
import com.inas.service.data.DataBindRowService;
import com.inas.util.JSONUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by chai on 2015/4/17.
 */
@RequestMapping("/data")
@Controller
public class DataBindConfigController {


    @Resource(name="dataBindConfigService")
    public DataBindConfigService dataBindConfigService;
    @Resource(name="dataBindRowService")
    public DataBindRowService dataBindRowService;

    @RequestMapping(value = "/dataBindColumnList", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String dataBindColumnList(HttpServletRequest request,Integer bind_id) {
        BindColumn bindColumn=new BindColumn();
        bindColumn.setDeleted(0);
        bindColumn.setBind_id(bind_id);
        Map<String,Object> columnMap= dataBindConfigService.getBindColumnList(bindColumn);
        List<BindColumn> list=(List<BindColumn>)columnMap.get("list");
        return JSONUtil.toExtFormJson(true, null,list);
    }

    @RequestMapping(value = "/dataBindColumnGridList", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String dataBindColumnGridList(HttpServletRequest request,Integer bind_id) {
        BindColumn bindColumn=new BindColumn();
        bindColumn.setDeleted(0);
        bindColumn.setBind_id(bind_id);
        Map<String,Object> columnMap= dataBindConfigService.getBindColumnList(bindColumn);
        List<BindColumn> list=(List<BindColumn>)columnMap.get("list");
        List models=(List)columnMap.get("models");
        List<Map<String,Object>> listMap=new ArrayList<Map<String, Object>>();//放进fields+
        Map<String,Object> mp=new HashMap<String,Object>();
        mp.put("align","center");
        mp.put("dataIndex","station_name");
        mp.put("header","显示");
        mp.put("text",null);
//        mp.put("xtype","checkcolumn");
        listMap.add(mp);
        for(BindColumn bin:list){
            Map<String,Object> mp1=new HashMap<String,Object>();
            mp1.put("align","center");
            String key="column_id_"+bin.getId();
            mp1.put("dataIndex",key);
            mp1.put("header",null);
            mp1.put("text",bin.getName());
            mp1.put("data_format_id",bin.getData_format_id());
//            mp1.put("xtype",null);
            listMap.add(mp1);
        }
        Map<String,Object> resultMap=new HashMap<>();
        resultMap.put("models",models);
        resultMap.put("list",listMap);
        return JSONUtil.toExtResultAllJson(true,null, resultMap);
    }

    @RequestMapping(value = "/saveDataBindColumnRecords", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateDataBindColumnRecords(HttpServletRequest request,String columnEn,String cbItems,String allRowArray, Integer bind_id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List jsonList=JSONUtil.fromJson(cbItems, ArrayList.class);
        List allList=JSONUtil.fromJson(allRowArray, ArrayList.class);
        Boolean rowFlg=dataBindRowService.saveBindRowList(jsonList,allList, bind_id,userDetails.getUsername());
        if (rowFlg){
            Boolean flag=dataBindConfigService.saveBindColumnList(columnEn, bind_id,userDetails.getUsername());
            return JSONUtil.toExtFormJson(flag, null);
        }else
        {
            return JSONUtil.toExtFormJson(false,null);
        }

    }

    @RequestMapping(value = "/deleteDataBindColumnById", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteDataBindColumnById(HttpServletRequest request,BindColumn bindColumn) {
//        AttributePrincipal principal = (AttributePrincipal)request.getUserPrincipal();
//        if (principal != null && principal.getName() != null && !principal.getName().isEmpty()) {
//            bindColumn.setCreator(principal.getName());
//        }
//        AttributePrincipal principals = (AttributePrincipal)request.getUserPrincipal();
//        if (principals != null && principals.getName() != null && !principals.getName().isEmpty()) {
//            bindColumn.setEditor(principals.getName());
//        }
        bindColumn.setCreator("zs");
        bindColumn.setEditor("zs");
        bindColumn.setDeleted(1);

        bindColumn.setEdit_date(new Date());
        return JSONUtil.toExtFormJson(dataBindConfigService.updateDataBindColumnDeleted(bindColumn), null);
    }


    @RequestMapping(value = "/findDataTypeItemAll", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findDataTypeItemAll() {

        return JSONUtil.toExtFormJson(true, null, dataBindConfigService.getDataFormatAll());
    }
}
