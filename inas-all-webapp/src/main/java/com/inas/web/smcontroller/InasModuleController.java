package com.inas.web.smcontroller;

import com.inas.model.system.InasModule;
import com.inas.service.InasModuleService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by ZS on 2015/5/15.
 */

@RequestMapping("/inasModule")
@Controller
public class InasModuleController {
    @Autowired
    private InasModuleService inasModuleService;

    @RequestMapping(value = "/findRoots", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String findNodes(HttpServletRequest request) {
        List<InasModule> listModules = inasModuleService.findRoots();
        return JSONUtil.toExtFormJson(true, null, listModules);
    }

    @RequestMapping(value = "findNodesByParentId", method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String findNodesByParentId(HttpServletRequest request,InasModule inasModule){
        String s=JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeNode(inasModule.getParentId(),inasModuleService.findByParentId(inasModule)));
        return s;
    }
}
