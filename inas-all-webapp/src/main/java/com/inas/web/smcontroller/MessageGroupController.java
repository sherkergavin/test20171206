package com.inas.web.smcontroller;

import com.inas.model.Tree;
import com.inas.model.system.User;
import com.inas.model.work.MessageGroup;
import com.inas.model.work.MessageGroupUser;
import com.inas.model.work.MessageGroupVO;
import com.inas.service.system.UserService;
import com.inas.service.work.MessageGroupService;
import com.inas.service.work.MessageGroupUserService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ZS on 2015/8/17.
 */

@RequestMapping("/messageGroup")
@Controller
public class MessageGroupController {
    @Resource(name = "messageGroupService")
    private MessageGroupService messageGroupService;

    @Resource(name="messageGroupUserService")
    private MessageGroupUserService messageGroupUserService;

    @Resource(name="userinformationService")
    private UserService userService;

    @RequestMapping(value = "/testMessage", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String testMessage(HttpServletRequest request,Integer id){
        String result = null;
        try{
            result = JSONUtil.toExtFormJson(true,messageGroupUserService.SendMessage(id,"集团运管系统短信测试"));
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }


//0000000000000000000000000000000000000000000000000000000000000000000000000
    @RequestMapping(value = "/getMessageGroupTree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getMessageGroupTree(HttpServletRequest request) {
        List<Tree> list = messageGroupService.getMessageGroupTree();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(list, true));
        return s;
    }

    @RequestMapping(value = "/getAllMessageGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getAllMessageGroup(HttpServletRequest request) {
        List<Tree> list = messageGroupService.getMessageGroupTree();
        String s= JSONUtil.toExtResultJson(list);
        return s;
    }
//111111111111111111111111111111111111111111111111111111111111
    @RequestMapping(value = "/getAllMessageGroupUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getAllMessageUser(HttpServletRequest request,Integer id){
        List<User> userList=userService.getUserList();
        List <String> resultList=null;
        List result=new ArrayList();
        for(int i=0;i<userList.size();i++){
            User u=userList.get(i);
            resultList = new ArrayList<String>();
            resultList.add(u.getId().toString());
            resultList.add(u.getStaff_real_name());
            result.add(resultList);
        }
        String s=JSONUtil.toExtResultJson(result);
        return s;
    }
//2222222222222222222222222222222222222222
    @RequestMapping(value = "/getUnUsedMessageGroupUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUnUsedMessageGroupUser(HttpServletRequest request,Integer id){
        MessageGroupUser en=new MessageGroupUser();
        en.setMessage_group_id(id);
        //当前选中使用的所有
        List<MessageGroupUser> messageGroupUsers=messageGroupUserService.getMessageUserByEn(en);
        //所有可用用户
        List<User> allUsers=userService.getUserList();
        List<Integer> usesL=new ArrayList<Integer>();
        List<Integer> allL=new ArrayList<Integer>();
       for (MessageGroupUser mg:messageGroupUsers){
            usesL.add(mg.getUserId());
       }
        for (User u:allUsers){
            allL.add(u.getId());
        }
        allL.removeAll(usesL);

        List result=new ArrayList();
        List <String> resultList=null;
        if (allL.size()>0){
            for(int i=0;i<allL.size();i++ ) {
                User reu=userService.getUserById(allL.get(i));
                resultList = new ArrayList<String>();
                resultList.add(reu.getId().toString());
                resultList.add(reu.getStaff_real_name());
                result.add(resultList);
            }
        }
        return JSONUtil.toExtResultJson(result);
    }


    @RequestMapping(value = "/getMessageGroupById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getMessageGroupById(HttpServletRequest request,Integer id) {
        MessageGroup messageGroup = messageGroupService.getMessageGroupById(id);
        String s=JSONUtil.toExtFormJson(true,null,messageGroup);
        return s;
    }


    @RequestMapping(value = "/saveMessageGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String saveMessageGroup(HttpServletRequest request,MessageGroupVO messageGroupVO) {
//        messageGroupService.saveMessageGroup();
        String result = null;
        try{
            result = JSONUtil.toExtFormJson(messageGroupService.saveMessageGroup(messageGroupVO),"");
        }catch(Exception e){
            result = JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return result;
    }
//    public String saveMessageGroup(HttpServletRequest request,Integer id,String name,Integer lo,String uList) {
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        messageGroupService.saveMessageGroup(id,name,lo,uList,userDetails.getUsername(),userService.getUserList());
//        return JSONUtil.toExtFormJson(true, "success");
//    }

    @RequestMapping(value = "/delMessageGroupById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String delMessageGroupById(HttpServletRequest request,Integer id) {
        //TODO 根据userlist添加多条记录
        //先删除从表，再删除主表
        try{
        MessageGroupUser en=new MessageGroupUser();
        en.setMessage_group_id(id);
        messageGroupUserService.getMessageUserByEn(en);
        List<MessageGroupUser> meList=messageGroupUserService.getMessageUserByEn(en);
        if(meList!=null) {
            for (MessageGroupUser mg : meList) {
                messageGroupUserService.delMessageUser(mg.getId());
            }
            messageGroupService.delMessageById(id);
        }
       }catch(Exception e){
            return JSONUtil.toExtFormJson(false,e.getMessage());
        }
        return JSONUtil.toExtFormJson(true, "success");
    }


}
