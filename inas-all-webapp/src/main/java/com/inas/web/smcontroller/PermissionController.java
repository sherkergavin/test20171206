package com.inas.web.smcontroller;

import com.inas.model.system.InasModule;
import com.inas.model.system.Permission;
import com.inas.model.system.Role;
import com.inas.model.system.WorkFlowPermission;
import com.inas.service.system.PermissionService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by jmwang on 2015/5/5.
 */
@RequestMapping("/permission")
@Controller
public class PermissionController {
    @Resource(name="permissionService")
    private PermissionService permissionService;

    @RequestMapping(value = "/getPermTree", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getPermTree(Permission permission){
//        permission.setDeleted(0);
//        return JSONUtil.toExtResultTreeJson(permissionService.getPermission(permission));
       // return  JSONArray.fromObject(permissionService.getPermission()).toString();
        return JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(permissionService.getModuleNodes(),true));
    }

    @RequestMapping(value = "/getFuncPermTree", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getFuncPermTree(){
        return JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(permissionService.getTreeFuncPermission(),true));
    }

    @RequestMapping(value = "/getRolePerm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getRolePerm(HttpServletRequest request,InasModule inasModule){
        return  JSONUtil.toExtResultJson(permissionService.getRolePerm(inasModule));
    }

    @RequestMapping(value = "/getUnAssignedPerm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUnAssignedRoleByPerm(HttpServletRequest request,Role role){
        return  JSONUtil.toExtResultJson(permissionService.getUnAssignedPerm(role));
    }

    @RequestMapping(value = "/getUnAssignedFuncPerm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUnAssignedFuncPerm(HttpServletRequest request,Role role){
        return JSONUtil.toExtResultJson(permissionService.getUnAssignedFuncPerm(role));
    }

    @RequestMapping(value = "/insertPermission", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertPermission(HttpServletRequest request,Permission permission){
        String callback = null;
        try{
            permissionService.insertPermission(permission);
            callback = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

//    @RequestMapping(value = "/insertWorkFlowPermission",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String insertWorkFlowPermission(HttpServletRequest request,WorkFlowPermission workFlowPermission){
//        String callback = null;
//        try{
//            callback = JSONUtil.toExtFormJson(permissionService.inserWorkFlowPermission(workFlowPermission),"已有相同权限名!");
//        }catch(Exception e){
//            callback = JSONUtil.toExtFormJson(false,e.getMessage());
//        }
//        return callback;
//    }
//
//    @RequestMapping(value = "/updateWorkFlowPermission", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
//    @ResponseBody
//    public String updateWorkFlowPermission(HttpServletRequest request,WorkFlowPermission workFlowPermission){
//        String callback = null;
//        try{
//            callback = JSONUtil.toExtFormJson(permissionService.updateWorkFlowPermission(workFlowPermission), "已有相同权限名!");
//        }catch (Exception e){
//            callback = JSONUtil.toExtFormJson(false, e.getMessage());
//        }
//        return callback;
//    }

    @RequestMapping(value = "/updatePermission", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updatePermission(HttpServletRequest request,Permission permission){
        String callback = null;
        try{
            permissionService.updatePermission(permission);
            callback = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

    @RequestMapping(value = "/deletePermission", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deletePermission(HttpServletRequest request,Permission permission){
        String callback = null;
        System.out.println(permission.getId());
        try{
            permissionService.deletePermission(permission);
            callback = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

    @RequestMapping(value = "/insertRolePerm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertRolePerm(HttpServletRequest request,String permitemselector,Permission permission){
        String callback = null;
        try{
            permissionService.insertRolePerm(permitemselector, permission);
            callback = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

    @RequestMapping(value = "/insertFuncRolePerm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertFuncRolePerm(HttpServletRequest request,String permitemselector,WorkFlowPermission workFlowPermission){
        String callback = null;
        try{
            permissionService.insertFuncRolePerm(permitemselector, workFlowPermission);
            callback = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }


    @RequestMapping(value = "/insertPermRole", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertPermRole(HttpServletRequest request,String roleitemselector,Role role){
        String callback = null;
        try{
            permissionService.insertPermRole(roleitemselector,role);
            callback = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }
}
