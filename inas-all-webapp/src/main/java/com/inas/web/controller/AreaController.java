package com.inas.web.controller;

import com.inas.model.system.Area;
import com.inas.model.Tree;
import com.inas.service.system.AreaService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;


@RequestMapping("/area")
@Controller
public class AreaController {
    @Resource(name = "areaService")
    private AreaService areaService;

    @RequestMapping(value = "/getArea", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String testArea() {
        List<Tree> listtrees=areaService.getArea();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listtrees, true));
        return s;
    }


    @RequestMapping(value = "/saveArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String addArea(HttpServletRequest request,Area area) {
        String result = null;
        if(area.getParent_id()==0 || "0".equals(area.getParent_id())){
            area.setParent_id(null);
        }
        area.setDeleted(0);
        try{
            result = JSONUtil.toExtFormJson(areaService.addArea(area), null);
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(false, e.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/deleteArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String deletArea(HttpServletRequest request, Area area) {
        areaService.deleteArea(area);
        return JSONUtil.toExtFormJson(true,null,null);
    }

    @RequestMapping(value = "/updateArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateArea(HttpServletRequest request, Area area) {
        String result = null;
        Integer parentId=area.getParent_id();
        List<Area> nodeList=areaService.findNodesByPid(area.getId());
        for (Area ea:nodeList){
            if (parentId==ea.getId())
                return JSONUtil.toExtFormJson(false,"不允许隶属自己的子节点！",null);
        }
        area.setId(area.getId());
        if(area.getParent_id()==0 || "0".equals(area.getParent_id())){
            area.setParent_id(null);
        }
        try{
            result = JSONUtil.toExtFormJson(areaService.updateArea(area),null);
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/queryArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String querArea(HttpServletRequest request, Integer id) {
        Area area =  areaService.queryArea(id);
        String s= JSONUtil.toExtFormJson(true, null, area);
        return s;
    }
    @RequestMapping(value = "/getParentArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String allArea(HttpServletRequest request)
    {
        List area = areaService.allArea();
        String s = JSONUtil.toExtFormJson(true,null,area);
        return s;
    }
}
