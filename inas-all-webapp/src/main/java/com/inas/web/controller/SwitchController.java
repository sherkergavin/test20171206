package com.inas.web.controller;

import com.inas.model.data.*;
import com.inas.model.system.Dictionary;
import com.inas.service.data.DataItemService;
import com.inas.service.data.MiddleService;
import com.inas.service.data.SwitchService;
import com.inas.service.data.impl.DataItemServiceImpl;
import com.inas.service.data.impl.SwitchServiceImpl;
import com.inas.service.system.DictionaryService;
import com.inas.util.GlobalConstants;
import com.inas.util.JSONUtil;
import flexjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by JM-SD09 on 2015/9/21.
 */
@RequestMapping("/data")
@Controller
public class SwitchController {
//
//    @Resource
//    private SwitchServiceImpl switchService;
//
//    @Resource
//    private DataItemServiceImpl dataItemService;
//
//    @Resource
//    private MiddleService middleService;
//
//
//    @Resource
//    private DictionaryService dictionaryService;
//
//    /**
//     * 查询采集数据最终定型
//     *
//     * @return
//     */
//    @RequestMapping(value = "/getSwitchJSON", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String getSwitchLastListByItemId() {
//        try {
//            List<Switch> list = new ArrayList<Switch>();
//            List<DataItem> dataItemVOList = dataItemService.getDataItemListWithMiddle();
//            if(dataItemVOList.size()>0){
//                for (int i = 0; i < dataItemVOList.size(); i++) {
//                    DataItem item = dataItemVOList.get(i);
//                    List<Switch> switchList = switchService.getSwitchLastListByItemId(item.getId());
//                    List<MiddleVO> middleList = middleService.getMiddleLastListByItemId(item.getId());
//
//                    for (int j = 0; j < switchList.size(); j++) {
//                        Switch aSwitch = switchList.get(j);
//                        if (middleList.size() == 0) {
//                            aSwitch.setType(GlobalConstants.DATA_ITEM_TYPE_PUMP);
//                            list.add(aSwitch);
//                        }
//                        for (int k = 0; k < middleList.size(); k++) {
//                            MiddleVO middleVO = middleList.get(k);
//                            if (aSwitch.getData_value() != middleVO.getOp_order()
//                                    && aSwitch.getRecord_time_in_3rd_db().getTime() > middleVO.getOrder_time().getTime()) {
//                                aSwitch.setType(GlobalConstants.DATA_ITEM_TYPE_PUMP);
//                                list.add(aSwitch);
//                            }
//                        }
//                    }
//                }
//                if (list.size() > 0) {
//                    switchService.saveMiddle(list);
//                }
//                for (int i = 0; i < dataItemVOList.size(); i++) {
//                    DataItem item = dataItemVOList.get(i);
//                    List<Switch> switchList = switchService.getSwitchLastListByItemId(item.getId());
//                    List<MiddleVO> middleList = middleService.getMiddleLastListByItemId(item.getId());
//
//                    for (int j = 0; j < switchList.size(); j++) {
//                        Switch aSwitch = switchList.get(j);
//                        if (middleList.size() == 0) {
//                            aSwitch.setType(GlobalConstants.DATA_ITEM_TYPE_PUMP);
//                            list.add(aSwitch);
//                        }
//                        for (int k = 0; k < middleList.size(); k++) {
//                            MiddleVO middleVO = middleList.get(k);
//                            if (aSwitch.getData_value() != middleVO.getOp_order()
//                                    && aSwitch.getRecord_time_in_3rd_db().getTime() > middleVO.getOrder_time().getTime()) {
//                                aSwitch.setType(GlobalConstants.DATA_ITEM_TYPE_PUMP);
//                                list.add(aSwitch);
//                            }
//                        }
//                    }
//                }
//                if (list.size() > 0) {
//                    switchService.saveMiddle(list);
//                }
//                for (int i = 0; i < dataItemVOList.size(); i++) {
//                    DataItem item = dataItemVOList.get(i);
//                    List<Switch> switchList = switchService.getSwitchLastListByItemId(item.getId());
//                    List<MiddleVO> middleList = middleService.getMiddleLastListByItemId(item.getId());
//
//                    for (int j = 0; j < switchList.size(); j++) {
//                        Switch aSwitch = switchList.get(j);
//                        if (middleList.size() == 0) {
//                            aSwitch.setType(GlobalConstants.DATA_ITEM_TYPE_PUMP);
//                            list.add(aSwitch);
//                        }
//                        for (int k = 0; k < middleList.size(); k++) {
//                            MiddleVO middleVO = middleList.get(k);
//                            if (aSwitch.getData_value() != middleVO.getOp_order()
//                                    && aSwitch.getRecord_time_in_3rd_db().getTime() > middleVO.getOrder_time().getTime()) {
//                                aSwitch.setType(GlobalConstants.DATA_ITEM_TYPE_PUMP);
//                                list.add(aSwitch);
//                            }
//                        }
//                    }
//                }
//                if (list.size() > 0) {
//                    switchService.saveMiddle(list);
//                }
//                return JSONUtil.toExtFormJson(true, JSONUtil.toJson(list));
//            }else{
//                return JSONUtil.toExtFormJson(false, "无数据");
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return JSONUtil.toExtFormJson(false, "请联系系统管理员 : " + e.getMessage());
//        }
//    }
//
//    @RequestMapping(value = "/getSwitchJSON2", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String getSwitchLastListByItemId2() {
//        try {
//            boolean flag = middleService.updateMiddle();
//            return JSONUtil.toExtFormJson(flag,flag?"操作成功":"无数据");
//        } catch (Exception e) {
//            return JSONUtil.toExtFormJson(false, e.getMessage());
//        }
//    }

}
