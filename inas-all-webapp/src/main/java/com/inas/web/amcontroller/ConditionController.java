package com.inas.web.amcontroller;

import com.inas.model.alarm.Condition;
import com.inas.model.alarm.ConditionDataItemVO;
import com.inas.model.alarm.ConditionVO;
import com.inas.model.data.DataFormat;
import com.inas.model.system.Dictionary;
import com.inas.service.alarm.ConditionDataItemService;
import com.inas.service.alarm.ConditionService;
import com.inas.service.data.DataFormatService;
import com.inas.service.system.DictionaryService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ZS on 2015/9/10.
 */
@RequestMapping("/condition")
@Controller
public class ConditionController {
    @Resource(name="conditionService")
    private ConditionService conditionService;

    @Resource(name="conditionDataItemService")
    private ConditionDataItemService conditionDataItemService;

    @Resource(name="dictionaryService")
    private DictionaryService dictionaryService;

    @Resource(name="dataFormatService")
    private DataFormatService dataFormatService;


    @RequestMapping(value = "/getConditionByVO", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getConditionByVO(HttpServletRequest request ,ConditionVO conditionVO){
        List<Condition> conditions=conditionService.getConditionsByVO(conditionVO);
        List<ConditionVO> list=new ArrayList<ConditionVO>();
        ConditionVO condVo=null;
        Dictionary dic=null;
        DataFormat format=null;
        for (Condition cond:conditions){
            condVo=new ConditionVO();
            condVo.setId(cond.getId());
            condVo.setData_format_id(cond.getData_format_id());
            condVo.setType(cond.getType());
            condVo.setNum1(cond.getNum1());
            condVo.setNum2(cond.getNum2());
            condVo.setTime_length(cond.getTime_length());
            dic=new Dictionary();
            dic.setId(cond.getType());
            Dictionary dictionary=dictionaryService.getDictionaryByIdOrCode(dic);
//            System.out.println(dictionary.getCode()+"====="+dictionary.getName());
            if (dictionary !=null)
            condVo.setType_name(dictionary.getName());
//            System.out.println("dicName="+dictionary.getName());
            format=new DataFormat();
            format.setId(cond.getData_format_id());
            DataFormat formatEntity=(DataFormat)dataFormatService.findByDataTypeEntity(format).get(0);
            condVo.setFormat_name(formatEntity.getName());
            int i=cond.getType();
            switch (i)
            {
                case 29:
                    condVo.setDescription("上限"+cond.getNum1()+"，下限"+cond.getNum2());
                    break;
                case 30:
                    condVo.setDescription(cond.getNum1()+"%");
                    break;
                case 31:
                    condVo.setDescription("数据"+cond.getNum1()+"小时无变化");
                    break;
            }
            list.add(condVo);
        }
        return JSONUtil.toExtFormJson(true,null,list);
    }



    @RequestMapping(value = "/getConditionById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getConditionById(HttpServletRequest request ,Integer id){
        Condition cond=conditionService.getConditionById(id);
        return JSONUtil.toExtResultJson(cond);

    }

    @RequestMapping(value = "/delConditionById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String delConditionById(HttpServletRequest request ,Integer id){
        //删除Condition，先删除对应的ConditionItem
        ConditionDataItemVO vo=new ConditionDataItemVO();
        vo.setCondition_id(id);
       try{
           conditionDataItemService.deleteConditionDataItemByConditionItemVo(vo);
           conditionService.deleteConditionById(id);
           return JSONUtil.toExtFormJson(true,null);
       }catch(Exception e){
           return JSONUtil.toExtFormJson(true,e.getMessage());
       }
    }

}
