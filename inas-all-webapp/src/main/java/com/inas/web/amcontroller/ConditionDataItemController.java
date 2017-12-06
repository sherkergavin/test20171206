package com.inas.web.amcontroller;

import com.inas.model.alarm.ConditionDataItem;
import com.inas.model.alarm.ConditionDataItemVO;
import com.inas.model.alarm.ConditionVO;
import com.inas.model.config.EntityBean;
import com.inas.model.data.DataItem;
import com.inas.model.data.DataItemVO;
import com.inas.service.alarm.ConditionDataItemService;
import com.inas.service.alarm.ConditionService;
import com.inas.service.config.StationService;
import com.inas.service.data.DataItemService;
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
 * Created by ZS on 2015/9/11.
 */
@RequestMapping("/conditionItem")
@Controller
public class ConditionDataItemController {
    @Resource(name="conditionDataItemService")
    private ConditionDataItemService conditionDataItemService;
    @Resource(name="dataItemService")
    private DataItemService dataItemService;
    @Resource(name="stationService")
    private StationService stationService;
    @Resource(name="conditionService")
    private ConditionService conditionService;


    @RequestMapping(value = "/getConditionItemByVO", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getConditionItemsByVO(HttpServletRequest request,ConditionDataItemVO conditionDataItemVO){
        List<ConditionDataItem> list=conditionDataItemService.getConditionDataItemByVO(conditionDataItemVO);
        return JSONUtil.toExtFormJson(true,null,list);
    }

    @RequestMapping(value = "/getSelectEntity", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getSelectEntity(HttpServletRequest request,Integer data_format_id,Integer condition_id){
        List<DataItemVO> allDataItemVO=new ArrayList<DataItemVO>();//entityId
        //根据数据类型查询所有该类型的站点
        List<Integer> allEntityId=dataItemService.getDistinctDataItemByFormatId(data_format_id);
        //根据conditionId查询该项的配置信息
        if (allEntityId.size()>0){
            DataItemVO resultItem=null;
            for (Integer staId:allEntityId){
                resultItem=new DataItemVO();
                resultItem.setEntity_id(staId);
                EntityBean entityBean=new EntityBean();
                entityBean.setId(staId);
                resultItem.setEntity_name(stationService.getStationList(entityBean).get(0).getName());
                //判断是否被选中
                if (null==condition_id || condition_id==0){
                    resultItem.setChecked(false);
                }else{
                    ConditionDataItemVO condEn=new ConditionDataItemVO();
                    condEn.setCondition_id(condition_id);
                    List<ConditionDataItem> list=conditionDataItemService.getConditionDataItemByVO(condEn);
                    if (list.size()>0){
                        DataItem itemEn=null;
                     for (ConditionDataItem ci:list){
                         //找到对应的item实体
                         itemEn=new DataItem();
                         itemEn.setId(ci.getData_item_id());
                         List<DataItem>listIs=dataItemService.getDataItemByEntity(itemEn);
                         if (listIs.size()>0){
                             Integer tgStaId=listIs.get(0).getEntity_id();
                             if (tgStaId==staId){
                                 resultItem.setChecked(true);
                             }
                         }
                     }
                    }
                }
                allDataItemVO.add(resultItem);
            }
        }







        //查询已经配置过的站点
//        DataItemVO dv=null;
//        DataItem itemEn=null;
//        for (Integer diId:allEntity){
//            dv=new DataItemVO();
//            dv.setEntity_id(diId);
//            EntityBean entityBean=new EntityBean();
//            entityBean.setId(diId);
//            EntityBean nameBean=stationService.getStationList(entityBean).get(0);
//            dv.setEntity_name(nameBean.getName());
//            //查询该站点是否配置过策略,
//            itemEn=new DataItem();
//            itemEn.setEntity_id(diId);
//            List<DataItem> itemList=dataItemService.getDataItemByEntity(itemEn);
//            for (DataItem it:itemList){
//                ConditionDataItemVO conditionDataItemVO=new ConditionDataItemVO();
//                conditionDataItemVO.setData_item_id(it.getId());
//                if (null!=condition_id && condition_id!=0) {
//                    conditionDataItemVO.setCondition_id(condition_id);
//                    System.out.println("conditionId="+condition_id);
//                    List<ConditionDataItem> list = conditionDataItemService.getConditionDataItemByVO(conditionDataItemVO);
//                    if (list.size() > 0) {
//                        System.out.println("true");
//                        dv.setChecked(true);
//                    } else {
//                        System.out.println("false");
//                        dv.setChecked(false);
//                    }
//                }else{
//                    System.out.println("conditionId is null");
//                    dv.setChecked(false);
//                }
//            }
//            allDataItemVO.add(dv);
//        }
        return JSONUtil.toExtResultJson(allDataItemVO);
    }


    @RequestMapping(value = "/getConditionItemByEntityId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getConditionItemByEntityId(HttpServletRequest request,String entityIdsStr,Integer condition_id){
        String[] idStrs=null;
        if (null!=entityIdsStr && !"".equals(entityIdsStr)){
            //逗号分隔前段传到的参数
            idStrs=entityIdsStr.split(",");
        }
        List<DataItem> totalListDataItem=new ArrayList<DataItem>();
        for(String idStr:idStrs){
            DataItem dataItem=new DataItem();
            dataItem.setEntity_id(Integer.parseInt(idStr));
            List<DataItem> list=dataItemService.getDataItemByEntity(dataItem);
            totalListDataItem.addAll(list);
        }
        List<ConditionDataItemVO> list=new ArrayList<ConditionDataItemVO>();
        ConditionDataItemVO conditionDataItemVO=null;
        for (DataItem di:totalListDataItem){
            if (null==condition_id || condition_id==0){
                conditionDataItemVO.setChecked(false);
            }else{
                conditionDataItemVO=new ConditionDataItemVO();
                conditionDataItemVO.setEntity_id(di.getEntity_id());
                EntityBean entityBean=new EntityBean();
                entityBean.setId(di.getEntity_id());
                EntityBean nameBean=stationService.getStationList(entityBean).get(0);
                conditionDataItemVO.setEntity_name(nameBean.getName());
                conditionDataItemVO.setData_item_name(di.getData_item_name());
                conditionDataItemVO.setData_item_id(di.getId());
                conditionDataItemVO.setCondition_id(condition_id);
                //根据data_item_id 查找condition_item
                List<ConditionDataItem> listCItem=conditionDataItemService.getConditionDataItemByVO(conditionDataItemVO);
                conditionDataItemVO.setChecked(false);
                if (listCItem.size()>0){
                    for (ConditionDataItem ci:listCItem){
                        if (null!=ci.getId() && ci.getId()!=0){
                            ConditionDataItem con=listCItem.get(0);
                            conditionDataItemVO.setCondition_id(con.getCondition_id());
                            conditionDataItemVO.setId(con.getId());
                            conditionDataItemVO.setChecked(true);
                        }
                    }

                }
            }
            list.add(conditionDataItemVO);
        }
        return JSONUtil.toExtResultJson(list);
    }

    /**
     * 先删除所有之前的配置，
     * 后直接将新的配置新增入库
     */
    @RequestMapping(value = "/saveConditionItemList", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveConditionItemList(HttpServletRequest request,ConditionVO conditionVO, String jsonResult) {
        //Integer formatId,Integer num1,Integer num2,Integer time_length,Integer policyId,Integer type,Integer id
      //先存Condition，获得condition_id，后存conditionDataItem
        boolean flag=false;
        String code="";
        try {
            if (null == conditionVO.getId() || conditionVO.getId() == 0) {
                //新增Condition
                conditionService.insertCondition(conditionVO);
                Integer condId =conditionVO.getId();
                flag = conditionDataItemService.insertConditionItemByJson(jsonResult, condId);
                code=String.valueOf(condId);
            } else {
                //修改Condition
                conditionService.updateCondition(conditionVO);
                System.out.println("updcondId="+conditionVO.getId());
                flag = conditionDataItemService.insertConditionItemByJson(jsonResult, conditionVO.getId());
                code=String.valueOf(conditionVO.getId());
            }
        }catch(Exception e){
            code=e.getMessage();
        }
        return JSONUtil.toExtFormJson(flag,code.toString());
    }




}
