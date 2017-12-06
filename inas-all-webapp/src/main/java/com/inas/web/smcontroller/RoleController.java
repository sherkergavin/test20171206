package com.inas.web.smcontroller;


import com.inas.model.system.InasModule;
import com.inas.model.system.Role;
import com.inas.model.system.User;
import com.inas.service.system.RoleService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


/**
 * Created by jmwang on 2015/4/27.
 */
@RequestMapping("/role")
@Controller
public class RoleController {

    @Resource(name = "roleService")
    private RoleService roleService;

    @RequestMapping(value = "/getUserRole", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUserRole(HttpServletRequest request) {
        return JSONUtil.toExtResultJson(roleService.getUserRole());
    }

    @RequestMapping(value = "/getUnAssignedUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUnAssignedUser(HttpServletRequest request, Role role) {
        return JSONUtil.toExtResultJson(roleService.getUnAssignedUser(role));
    }

    @RequestMapping(value = "/getRoleTree", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getRoleTree() {
        return JSONUtil.toExtResultTreeJson(roleService.getRole());
    }

    @RequestMapping(value = "/insertRole", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertRole(HttpServletRequest request, Role role) {
        String callback = null;
        try {
            roleService.insertRole(role);
            callback = JSONUtil.toExtFormJson(true, "success");
        } catch (Exception e) {
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

    @RequestMapping(value = "/updateRole", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateRole(HttpServletRequest request, Role role) {
        String callback = null;
        try {
            roleService.updateRole(role);
            callback = JSONUtil.toExtFormJson(true, "success");
        } catch (Exception e) {
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

    @RequestMapping(value = "/deleteRole", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteRole(HttpServletRequest request, Role role) {
        try {
            roleService.deleteRole(role);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JSONUtil.toExtFormJson(true, "success");
    }

    @RequestMapping(value = "/insertUserRole", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertUserRole(HttpServletRequest request, String roleitemselector, Role role) {
        String callback = null;
        try {
            roleService.insertUserRole(roleitemselector, role);
            callback = JSONUtil.toExtFormJson(true, "success");
        } catch (Exception e) {
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }


    @RequestMapping(value = "/getUserTree", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUserTree() {
        return JSONUtil.toExtResultTreeJson(roleService.getUser());
        //   return  JSONArray.fromObject(roleService.getUser()).toString();
    }

    @RequestMapping(value = "/getRoleUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getRoleUser(HttpServletRequest request) {
        return JSONUtil.toExtResultJson(roleService.getRoleUser());
    }

    @RequestMapping(value = "/getUnAssignedRoleByUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUnAssignedRole(HttpServletRequest request, User user) {
        return JSONUtil.toExtResultJson(roleService.getUnAssignedRoleByUser(user));
    }

    @RequestMapping(value = "/getRolePerm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getRolePerm(HttpServletRequest request) {
//        return  JSONUtil.toExtResultJson(roleService.getRoleUser());

        return JSONUtil.toExtResultJson(roleService.getRoleWorkFlow());
    }

    @RequestMapping(value = "/insertRoleUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertRoleUser(HttpServletRequest request, String useritemselector, User user) {
        String callback = null;
        try {
            roleService.insertRoleUser(useritemselector, user);
            callback = JSONUtil.toExtFormJson(true, "success");
        } catch (Exception e) {
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

    @RequestMapping(value = "/getUnAssignedRoleByPerm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUnAssignedRoleByPerm(HttpServletRequest request, InasModule inasModule) {
        return JSONUtil.toExtResultJson(roleService.getUnAssignedRoleByPerm(inasModule));
    }
}
