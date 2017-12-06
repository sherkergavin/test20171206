package com.inas.web.amcontroller;


import com.inas.model.Tree;
import com.inas.model.alarm.PolicyMessageGroupVO;
import com.inas.service.alarm.PolicyMessageService;
import com.inas.service.work.MessageGroupService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequestMapping("/policyMessage")
@Controller
public class PolicyMessageController {

    @Resource(name = "policyMessageService")
    private PolicyMessageService policyMessageService;

    @Resource(name="messageGroupService")
    private MessageGroupService messageGroupService;

    @RequestMapping(value = "/getPolicyMessageByVo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPolicyMessageByVo(HttpServletRequest request,PolicyMessageGroupVO vo) {
        List<Tree> list=messageGroupService.getMessageGroupTree();
        List<PolicyMessageGroupVO> resultList=new ArrayList<PolicyMessageGroupVO>();
        List<PolicyMessageGroupVO> list2=policyMessageService.getPolicyMessageByVo(vo);
        PolicyMessageGroupVO en=null;
        for (Tree tree:list){
            en=new PolicyMessageGroupVO();
            en.setMessage_group_id(tree.getId());
            en.setMessage_group_name(tree.getText());
            en.setChecked(false);
            for (int i=0;i<list2.size();i++){
                PolicyMessageGroupVO  pm=list2.get(i);
                if (pm.getMessage_group_id()==tree.getId()){
                    en.setChecked(true);
                }
            }
            resultList.add(en);
        }


        return JSONUtil.toExtResultJson(resultList);
    }

//    @RequestMapping(value="/updatePolicyMessage" , method = RequestMethod.POST,produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String updatePolicyMessage(HttpServletRequest request,String jsonArrayStr){
//        List jsonList  = JSONUtil.fromJson(jsonArrayStr, ArrayList.class);
//        PolicyMessageGroupVO en=null;
//        List<PolicyMessageGroupVO> list=new ArrayList<PolicyMessageGroupVO>();
//        for (int i=0;i<jsonList.size();i++){
//            en=new PolicyMessageGroupVO();
//            Map row = (Map) jsonList.get(i);
//            if(null==row.get("message_group_id") || "".equals(row.get("message_group_id")) || 0==(Integer.parseInt(row.get("message_group_id").toString())) ){
//                en.setMessage_group_id(null);
//            }else{
//                en.setMessage_group_id(Integer.valueOf(row.get("message_group_id").toString()));
//            }
//            list.add(en);
//        }

//        Integer flag=policyMessageService.updatePolicyMessageById(list);
//        if (flag<=0){
//            return JSONUtil.toExtFormJson(false, "修改失败", null);
//        }else{
//            return JSONUtil.toExtFormJson(true, null, null);
//        }
//    }


    @RequestMapping(value="/savePolicyMessage" , method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String insertPolicyMessage(HttpServletRequest request,String jsonArrayStr,Integer policy_id){
        List jsonList=JSONUtil.fromJson(jsonArrayStr, ArrayList.class);
//      List jsonList=JSONUtil.fromJson(jsonArrayStr, ArrayList.class);
        PolicyMessageGroupVO env=null;
        List<PolicyMessageGroupVO> list=new ArrayList<PolicyMessageGroupVO>();
        for (int i=0;i<jsonList.size();i++){
            env=new PolicyMessageGroupVO();
            Map row = (Map) jsonList.get(i);
            if(null==row.get("message_group_id") || "".equals(row.get("message_group_id")) || 0==(Integer.parseInt(row.get("message_group_id").toString())) ){
                env.setMessage_group_id(null);
            }else{
                env.setMessage_group_id(Integer.valueOf(row.get("message_group_id").toString()));
            }
            env.setPolicy_id(policy_id);
            list.add(env);
        }
        Integer flag=policyMessageService.savePolicyMessage(list,policy_id);
        if (flag<=0){
            return JSONUtil.toExtFormJson(false, "保存失败", null);
        }else{
            return JSONUtil.toExtFormJson(true, null, null);
        }
    }




}
