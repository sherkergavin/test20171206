package com.inas.web.pmcontroller;

import com.inas.model.Tree;
import com.inas.model.alarm.AlarmActive;
import com.inas.model.data.DataFormat;
import com.inas.model.data.DataTypeValue;
import com.inas.model.system.Dictionary;
import com.inas.service.data.DataFormatService;
import com.inas.service.system.DictionaryService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
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
 * Created by ZS on 2015/5/7.
 */

@RequestMapping("/format")
@Controller
public class DataFormatController {
    @Resource(name="dataFormatService")
    private DataFormatService dataFormatService;
    @Resource(name = "dictionaryService")
    private DictionaryService dictionaryService;


    @RequestMapping(value = "/getDataFormatByEntity", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataFormatByEntity(HttpServletRequest request, Dictionary dictionary) {
        Dictionary dict = dictionaryService.getDictionaryByIdOrCode(dictionary);
        DataFormat format = new DataFormat();
        format.setData_type(dict.getId());
        List listFs= dataFormatService.findByDataTypeEntity(format);
        return JSONUtil.toExtResultJson(listFs);
    }

    @RequestMapping(value = "/getDataAcknowledgedByEntity", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataAcknowledgedByEntity(HttpServletRequest request, Dictionary dictionary) {
        List<AlarmActive> list=new ArrayList<AlarmActive>();
        AlarmActive a=new AlarmActive();
        a.setId(0);
        a.setMessage("未确认");
        AlarmActive b=new AlarmActive();
        b.setId(1);
        b.setMessage("已确认");
        AlarmActive c=new AlarmActive();
        c.setId(null);
        c.setMessage("全部");
        list.add(c);
        list.add(a);
        list.add(b);
        return JSONUtil.toExtResultJson(list);
    }




    @RequestMapping(value = "/getDataFormatById", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataFormatById(HttpServletRequest request, Dictionary dictionary) {
        DataFormat format = new DataFormat();
        if(null != dictionary.getCode()){
            dictionary = dictionaryService.getDictionaryByIdOrCode(dictionary);
            format.setData_type(dictionary.getId());
        }
        List listFs= dataFormatService.findByDataTypeEntity(format);
        return JSONUtil.toExtResultJson(listFs);
    }


    @RequestMapping(value = "/getDataFormatByEn", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataFormatById(HttpServletRequest request, DataFormat format) {
        List listFs=null;
        if(null != format){
            listFs= dataFormatService.findByDataTypeEntity(format);

        }
        return JSONUtil.toExtResultJson(listFs);

    }



    @RequestMapping(value = "/getTypeTree", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getTypeTree(HttpServletRequest request, Integer type) {
        Dictionary dictionary=new Dictionary();
        dictionary.setType(type);
        dictionary.setDeleted(0);
        List<Dictionary> allType=dictionaryService.getDictionaryByType(dictionary);
        List<Tree> allTreeNodes=new ArrayList<>();
        for (Dictionary dic:allType){
            Tree tree=new Tree();
            tree.setId(dic.getId());
            tree.setText(dic.getName());
            tree.setController(dic.getCode());
            allTreeNodes.add(tree);
        }
        return JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(allTreeNodes,true));
    }

    @RequestMapping(value = "/saveDataFormatEntity", method = RequestMethod.POST, produces = "application/json; charset=utf-8" )
    @ResponseBody
    public String SaveDataFormatEntity(HttpServletRequest request,DataFormat dataFormatEnty){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Boolean flag = null;

        String msg = null;
        try{
            Map<String,Object> map= dataFormatService.saveDataFormat(dataFormatEnty,userDetails.getUsername());
            String resultCode=(String)map.get("checkResult");
            if (resultCode!=null && !("".equals(resultCode))){
                return JSONUtil.toExtFormJson(false,resultCode);
            }else{
                return JSONUtil.toExtFormJson(true,null);
            }
        }catch(Exception e){
            return JSONUtil.toExtFormJson(false,e.getMessage());
        }
    }


    @RequestMapping(value = "/saveDataFormatSwitching", method = RequestMethod.POST, produces = "application/json; charset=utf-8" )
    @ResponseBody
    public String SaveDataFormatSwitching(HttpServletRequest request,DataFormat dataFormatEnty,DataTypeValue typeValueEn){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try{
            String resultCode=dataFormatService.saveDataFormat(dataFormatEnty, typeValueEn,userDetails.getUsername());
            if (resultCode!=null && !("".equals(resultCode))){
                return JSONUtil.toExtFormJson(false,resultCode);
            }else{
                return JSONUtil.toExtFormJson(true,null);
            }
        }catch(Exception e){
            return JSONUtil.toExtFormJson(false,e.getMessage());
        }
    }

    @RequestMapping(value = "/delDataFormatEntity", method = RequestMethod.POST, produces = "application/json; charset=utf-8" )
    @ResponseBody
    public String delDataFormatEntity(HttpServletRequest request,Integer id,String controller){
        dataFormatService.delDataFormat(id,controller);
        String s= JSONUtil.toExtFormJson(true,null,null);
        return s;
    }
}
