package com.inas.web.pmcontroller;

import com.inas.model.data.CollectItem;
import com.inas.model.data.CollectTask;
import com.inas.service.data.CollectItemService;
import com.inas.service.data.CollectTaskService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by ZS on 2015/5/12.
 */
@RequestMapping("/collectItem")
@Controller
public class CollectItemController {

    @Resource(name = "collectItemService")
    private CollectItemService collectItemService;

    @Resource(name = "CollectTaskService")
    private CollectTaskService collectTaskService;

    @RequestMapping(value = "/queryCollectItemById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryCollectItemById(HttpServletRequest request, Integer id) {
        CollectItem collectItemEn=collectItemService.queryCollectItemById(id);
        String s= JSONUtil.toExtFormJson(true,null,collectItemEn);
        return s;
    }

    @RequestMapping(value = "/queryByDataItemId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryCollectItemByDataItemId(HttpServletRequest request, Integer dataItemId) {
        CollectItem collectItemEn=collectItemService.queryByDataItemId(dataItemId);
        String s= JSONUtil.toExtFormJson(true,null,collectItemEn);
        return s;
    }


    @RequestMapping(value = "/saveCollectItem", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveCollectItem(HttpServletRequest request, CollectItem collectItem) {
        String callback = null;
        List<CollectItem> allCollectList=collectItemService.queryAllNameByTid(collectItem.getCollect_task_id());
        try{
            Integer cId=collectItem.getId();
            String cName=collectItem.getName();
            if (cId==null ||cId==0){
                collectItemService.addCollectItem(collectItem);
            }else{
                collectItemService.updCollectItem(collectItem);
            }
            //为触发采集程序，修改采集任务的编辑时间
            CollectTask collectTask=new CollectTask();
            collectTask.setEdit_date(collectItem.getEdit_date());
            collectTask.setId(collectItem.getCollect_task_id());
            collectTask.setEditor(collectItem.getEditor());
            collectTaskService.updEditInfo(collectTask);
            callback = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }
}
