package com.inas.web.amcontroller;


import com.inas.model.Tree;
import com.inas.model.alarm.Policy;
import com.inas.service.alarm.PolicyService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/policy")
@Controller
public class PolicyController {

    @Resource(name = "policyService")
    private PolicyService policyService;

    @RequestMapping(value = "/getPolicyTree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPolicyTree() {
        List<Tree> list=policyService.getPolicyTree();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(list, true));
        return s;
    }


    @RequestMapping(value="/getPolicyById" , method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPolicyById(HttpServletRequest request,Integer id){
        Policy policy=policyService.getPolicyById(id);
        return JSONUtil.toExtFormJson(true, null, policy);
    }


    @RequestMapping(value="/insertPolicy" , method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String insertPolicy(HttpServletRequest request,Policy policy){
       if (policy.getCond_combine_type()==0){
           System.out.println("PolicyInfo====="+policy.getName()+""+policy.getEnabled());
       }
        if (null==policy.getEnabled()){
            policy.setEnabled(0);
        }
        Integer flag=policyService.insertPolicy(policy);
        if (flag<=0){
            return JSONUtil.toExtFormJson(false, "添加失败", null);
        }else{
            return JSONUtil.toExtFormJson(true, null, null);
        }
    }


    @RequestMapping(value="/updatePolicy" , method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updPolicy(HttpServletRequest request,Policy policy){
        Integer flag=policyService.updatePolicy(policy);
        if (flag<=0){
            return JSONUtil.toExtFormJson(false, "添加失败", null);
        }else{
            return JSONUtil.toExtFormJson(true, null, null);
        }
    }


    @RequestMapping(value="/delPolicyById" , method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String delPolicyById(HttpServletRequest request,Integer id){
        Integer flag=policyService.deletePolicyById(id);
        if (flag<=0){
            return JSONUtil.toExtFormJson(false, "添加失败", null);
        }else{
            return JSONUtil.toExtFormJson(true, null, null);
        }
    }

}
