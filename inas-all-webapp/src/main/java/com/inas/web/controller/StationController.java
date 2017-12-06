package com.inas.web.controller;


import com.inas.model.config.EntityBean;
import com.inas.model.config.EntityType;
import com.inas.model.Tree;
import com.inas.service.config.StationService;
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

/**
 * Created by chai on 2015/4/17.
 */
@RequestMapping("/data")
@Controller
public class StationController {


    @Resource(name="stationService")
    public StationService stationService;

    @Resource(name = "areaService")
    private AreaService areaService;

    @RequestMapping(value = "/stationTree", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String stationTree() {
        return JSONUtil.toExtResultTreeJson(stationService.getStationTree(null));
    }

    @RequestMapping(value = "/stationTree2", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String stationTree2() {

        return JSONUtil.toExtResultTreeJson(stationService.getStationTree2());
    }

    @RequestMapping(value = "/areaTree", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String areaTree() {
        List<Tree> listtrees = areaService.getArea();
        String s = JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listtrees, true));
        return s;
//        return JSONUtil.toExtResultTreeJson(areaService.getArea());
    }


    @RequestMapping(value = "/entityTypeList", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String entityTypeList() {

        EntityType entityType = new EntityType();
        entityType.setDeleted(0);
//        JSONArray jsonArray=JSONArray.fromObject(stationService.getStationTypeList(entityType));
//        );

//       return  JSONUtil.toExtResultJson(stationService.getStationTypeList(entityType));
//        return JSONUtil.toJsonData(stationService.getStationTypeList(entityType), true, null);

        return JSONUtil.toExtResultJson(stationService.getStationTypeList(entityType));
    }

    @RequestMapping(value = "/addEntity", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addEntity(HttpServletRequest request, EntityBean entityBean) {
//        AttributePrincipal principal = (AttributePrincipal)request.getUserPrincipal();
//        if (principal != null && principal.getName() != null && !principal.getName().isEmpty()) {
//            entityBean.setCreator(principal.getName());
//        }
//        AttributePrincipal principals = (AttributePrincipal)request.getUserPrincipal();
//        if (principals != null && principals.getName() != null && !principals.getName().isEmpty()) {
//            entityBean.setEditor(principals.getName());
//        }

        if (stationService.getStationList(new EntityBean(entityBean.getName(), 0)).size() > 0) {
            return JSONUtil.toExtFormJson(false, "站点名称已存在！");
        } else {
//        return JSONUtil.toJsonData(stationService.insertStation(entityBean), true, null);
            return JSONUtil.toExtFormJson(stationService.insertStation(entityBean), null);
        }
    }

    @RequestMapping(value = "/getStationList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getStationList(HttpServletRequest request, EntityBean entityBean) {


        entityBean.setDeleted(0);

//        return JSONUtil.toJsonData(stationService.getStationList(entityBean).get(0), true, null);
        return JSONUtil.toExtFormJson(true, null, stationService.getStationList(entityBean).get(0));
    }

    @RequestMapping(value = "/saveEntity", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String saveEntity(HttpServletRequest request, EntityBean entityBean) {
        entityBean.setDeleted(0);
        if(entityBean.getId() == null){
            if (stationService.getStationList(new EntityBean(entityBean.getName(), 0)).size() > 0) {
                return JSONUtil.toExtFormJson(false, "站点名称已存在！");
            } else {
                return JSONUtil.toExtFormJson(stationService.insertStation(entityBean), null);
            }
        }else{
            EntityBean entityBean1 = new EntityBean();
            entityBean1.setId(entityBean.getId());
            entityBean1.setDeleted(entityBean.getDeleted());
            List<EntityBean> l1 = stationService.getStationList(entityBean1);
            if (!l1.get(0).getVersion().equals(entityBean.getVersion())) {
                return JSONUtil.toExtFormJson(false, "此站点内容已变更，请更新信息！");
            }else{
                EntityBean entityBean2 = new EntityBean();
                entityBean2.setName(entityBean.getName());
                entityBean2.setDeleted(entityBean.getDeleted());
                List<EntityBean> l2 = stationService.getStationList(entityBean2);
                if (l2.size() > 0 && !l2.get(0).getId().equals(entityBean.getId())) {
                    return JSONUtil.toExtFormJson(false, "站点名称已存在！");
                } else {
                    return JSONUtil.toExtFormJson(stationService.saveStation(entityBean), null);
                }
            }
        }
    }

    @RequestMapping(value = "/deleteEntity", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteEntity(HttpServletRequest request, EntityBean entityBean) {


        EntityBean eb = new EntityBean();
        eb.setId(entityBean.getId());
        //System.out.println(stationService.getStationList(eb).get(0).getVersion()+"--------"+entityBean.getVersion());
        if (stationService.getStationList(eb).get(0).getVersion() == entityBean.getVersion()) {
            entityBean.setVersion(entityBean.getVersion() + 1);
            entityBean.setDeleted(1);
//            return JSONUtil.toJsonData(stationService.saveStation(entityBean), true, null);
            return JSONUtil.toExtFormJson(stationService.saveStation(entityBean), null);
        } else {
//            return JSONUtil.toJsonData(null, false, "此站点正在编辑，请刷新！");
            return JSONUtil.toExtFormJson(false, "此站点正在编辑，请刷新！");
        }
    }

//    @RequestMapping(value = "/addEntityType", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
//    @ResponseBody
//    public String addEntityType(HttpServletRequest request,EntityType entityType ,String name) {
//
//        return JSONUtil.toJsonData(stationService.insertEntityType(entityType), true, null);
//    }

    @RequestMapping(value = "/saveEntityType", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String saveEntityType(HttpServletRequest request, EntityType entityType) {

//        EntityType et = new EntityType();
//        et.setId(entityType.getId());
//        if (stationService.getStationTypeList(et).get(0).getVersion() == entityBean.getVersion()) {

//            entityBean.setVersion(entityBean.getVersion() + 1);
//            Date  date = new Date();
//            entityBean.setEdit_date(date);
//            return JSONUtil.toJsonData(stationService.saveEntityType(entityType), true, null);
        return JSONUtil.toExtFormJson(stationService.saveEntityType(entityType), null);
//        } else {
//            return JSONUtil.toJsonData(null, false, "此站点正在编辑，请刷新！");
//        }


    }


    @RequestMapping(value = "/deleteEntityType", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteEntityType(HttpServletRequest request, EntityType entityType) {

        entityType.setDeleted(1);
//            return JSONUtil.toJsonData(stationService.saveEntityType(entityType), true, null);
        return JSONUtil.toExtFormJson(stationService.saveEntityType(entityType), null);


    }


}
