package com.inas.web.controller;

import com.inas.model.system.Organization;
import com.inas.model.Tree;
import com.inas.service.system.OrganizationService;
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
import java.util.List;

/**
 * Created by ZS on 2015/8/5.
 */
@RequestMapping("/organization")
@Controller
public class OrganizationController {
    @Resource(name = "organizationService")
    private OrganizationService organizationService;

    @RequestMapping(value = "/getOrgsTree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getOrgsTree() {
        List<Tree> listtrees=organizationService.getOrgsTree();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listtrees, true));
        return s;
    }

    @RequestMapping(value = "/getOrgsByEn", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getOrgsTree(HttpServletRequest request, Organization organization) {
        List<Organization> list=organizationService.getOrgsByEn(organization);
        String s= JSONUtil.toExtFormJson(true,null,list.get(0));
        return s;
    }

    @RequestMapping(value = "/saveOrgEn", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveOrgEn(HttpServletRequest request, Organization organization) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(organization.getParent_id()==0 || "0".equals(organization.getParent_id())){
            organization.setParent_id(null);
        }
       organizationService.saveOrg(organization,userDetails.getUsername());
       return JSONUtil.toExtFormJson(true,null);
    }

    @RequestMapping(value = "/delOrgById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String delOrgById(HttpServletRequest request,Integer id) {
        organizationService.delOrg(id);
        return JSONUtil.toExtFormJson(true,null);
    }

}
