package com.inas.web.controller;

import com.inas.model.config.EntityLinkMapping;
import com.inas.model.config.EntityLinkMappingVO;
import com.inas.model.config.EntityLinkVO;
import com.inas.model.work.DailyItem;
import com.inas.service.config.PipeLineService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import com.inas.util.WrapperUtil;
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
 * Created by WangJm on 2015/9/21.
 */
@RequestMapping("/config")
@Controller
public class PipeLineController {

    @Resource
    private PipeLineService pipeLineService;

    @RequestMapping(value = "/getPipeLineTreeList", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPipeLineTreeList(){
        return JSONUtil.toExtResultTreeJson(pipeLineService.getPipeLineTreeList());
    }

    @RequestMapping(value = "/getPipeLineByEntity", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPipeLineById(HttpServletRequest request,EntityLinkVO entityLinkVO){
        return JSONUtil.toExtResultJson(pipeLineService.getPipeLineByEntity(entityLinkVO));
    }

    @RequestMapping(value = "/savePipeLine", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String savePipeLine(HttpServletRequest request,EntityLinkVO entityLinkVO){
        String result = null;
        try{
            result = JSONUtil.toExtFormJson(pipeLineService.savePipeLine(entityLinkVO),"用户名有重复");
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(pipeLineService.savePipeLine(entityLinkVO),e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/getPipeLineItem", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPipeLineItem(HttpServletRequest request,EntityLinkMappingVO entityLinkMappingVO){
        return JSONUtil.toExtResultJson(pipeLineService.getPipeLineItemByLinkId(entityLinkMappingVO));
    }

    @RequestMapping(value = "/savePipleLineItem", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String savePipleItem(HttpServletRequest request,EntityLinkMappingVO entityLinkMappingVO){
        List jsonList  = JSONUtil.fromJson(entityLinkMappingVO.getJsonResult(), ArrayList.class);
        List<EntityLinkMapping> insertList = new ArrayList<>();
        List<EntityLinkMapping> updateList = new ArrayList<>();
        String result = null;
        EntityLinkMapping entityLinkMapping = null;
        for(int i=0;i<jsonList.size();i++){
            Map row = (Map)jsonList.get(i);
            entityLinkMapping = new EntityLinkMapping();
            entityLinkMapping.setId(WrapperUtil.parseObjectToInteger(row.get("id")));
            entityLinkMapping.setLink_id(WrapperUtil.parseObjectToInteger(row.get("link_id")));
            entityLinkMapping.setData_item_id(WrapperUtil.parseObjectToInteger(row.get("data_item_id")));
            entityLinkMapping.setDirection(WrapperUtil.parseObjectToInteger(row.get("direction")));
            if(entityLinkMappingVO.getType().equals(1)){
                if (entityLinkMapping.getDirection().equals(32)){
                    entityLinkMapping.setDirection(33);
                }else if(entityLinkMapping.getDirection().equals(33)){
                    entityLinkMapping.setDirection(32);
                }
            }
            if(null == entityLinkMapping.getId() || "".equals(entityLinkMapping.getId()) || entityLinkMapping.getId() == 0){
                insertList.add(entityLinkMapping);
            }else{
                updateList.add(entityLinkMapping);
            }
        }
        try{
            result = JSONUtil.toExtFormJson(pipeLineService.savePipeLineItemByLinkId(insertList, updateList),"");
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(false,"同根管线内不可配置相同项目！\\n"+e.getMessage());
        }
        return result;
    }
}
