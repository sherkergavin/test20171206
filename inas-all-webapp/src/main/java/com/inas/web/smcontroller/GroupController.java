package com.inas.web.smcontroller;

import com.inas.model.Tree;
import com.inas.model.system.Group;
import com.inas.service.system.GroupService;
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


@RequestMapping("/sgroup")
@Controller
public class GroupController {
    @Resource(name = "groupService")
    private GroupService groupService;

    @RequestMapping(value = "/allGroup", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String allGroup() {
        List<Tree> listtrees= groupService.allGroup();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listtrees,true));
        return s;
    }
    @RequestMapping(value = "/getGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getGroup() {
        List list = groupService.getGroup();
        //String s =JSONArray.fromObject(List).toString();
        return JSONUtil.toExtFormJson(true,null,list);
    }
    @RequestMapping(value = "/addGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String addGroup(HttpServletRequest request,Group group) {

        group.setVersion(1);
        group.setCreate_date(new Date());
        group.setCreator("dyb");
        group.setEdit_date(new Date());
        group.setEditor("lbk");
        if(group.getParent_id()==0 || "0".equals(group.getParent_id())){
            group.setParent_id(null);
        }

        group.setDeleted(0);
        groupService.addGroup(group);
        return JSONUtil.toExtFormJson(true,null,null);
    }

    @RequestMapping(value = "/deleteGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String deletGroup(HttpServletRequest request, Group group) {
        groupService.deteleGroup(group);
        return JSONUtil.toExtFormJson(true,null,null);
    }

    @RequestMapping(value = "/updateGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateGroup(HttpServletRequest request, Group group) {
        if(group.getParent_id()==0 || "0".equals(group.getParent_id())){
            group.setParent_id(null);
        }
        group.setVersion(1);
        group.setEdit_date(new Date());
        group.setEditor("ddd");
        groupService.updataGroup(group);
        return JSONUtil.toExtFormJson(true,null,null);
    }

    @RequestMapping(value = "/queryGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryGroup(HttpServletRequest request, Integer id) {
        Group group =  groupService.queryGroup(id);
        String s= JSONUtil.toExtFormJson(true, null, group);
        return s;
    }

}
