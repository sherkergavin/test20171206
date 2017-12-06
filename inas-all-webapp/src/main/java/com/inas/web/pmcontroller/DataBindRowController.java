package com.inas.web.pmcontroller;

import com.inas.model.config.EntityBean;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by ZS on 2015/5/22.
 */
@RequestMapping("/bindRowCell")
@Controller
public class DataBindRowController {
    @Resource(name="dataBindRowService")
    public DataBindRowService dataBindRowService;
    @Resource(name="dataBindConfigService")
    public DataBindConfigService dataBindConfigService;


    @RequestMapping(value = "/bindDataRowList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String bindRowList(HttpServletRequest request,Integer bindId) {
        List<EntityBean> listEntityRow=dataBindRowService.findAllBindEntityResult(bindId);
        return JSONUtil.toExtFormJson(true, null, listEntityRow);
    }

    @RequestMapping(value = "/bindCellList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String bindCellList(HttpServletRequest request,Integer bindId){
        List<Map<String,Object>> cellResultList=dataBindRowService.findBindCellResult(bindId);//cells已经绑定过的
        for(Map<String, Object> map: cellResultList){
            Set<String> dataKeyList=map.keySet();//存在残缺
            List<String> listKeyStr=this.notExistKeyList(dataKeyList, bindId);//不存在的key
            //剔除已经存在的key
           for (String key:listKeyStr){
               map.put(key,0);
           }
        }
        String result=JSONUtil.toExtResultAllJson(cellResultList);
        return result;
    }

    private List<String> notExistKeyList(Set<String> dataKeySet,Integer bindId){
        List<Map<String,String>> listModels=dataBindConfigService.getBindModel(bindId);//完整的模型 name：station_name...
        List<String> listModelStr=new ArrayList<String>();
        for(Map<String, String> item: listModels){
            listModelStr.add(item.get("name"));
        }
        List<String> listDataKey=new ArrayList<String>();
        listDataKey.addAll(dataKeySet);
        listModelStr.removeAll(listDataKey);
        return listModelStr;
    }
    @RequestMapping(value = "/saveBindCellList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String saveBindCellList(HttpServletRequest request,String grdRecodeList,Integer bindId){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List jsonList  =JSONUtil.fromJson(grdRecodeList,ArrayList.class);
        Boolean celFlg=dataBindRowService.saveBindCellList(jsonList, bindId,userDetails.getUsername());
        return JSONUtil.toExtFormJson(celFlg, null);
    }
}
