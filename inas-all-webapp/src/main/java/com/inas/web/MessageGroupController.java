package com.inas.web;

import com.inas.model.work.MessageGroup;
import com.inas.model.work.MessageGroupUser;
import com.inas.model.system.User;
import com.inas.model.Tree;
import com.inas.service.work.MessageGroupService;
import com.inas.service.work.MessageGroupUserService;
import com.inas.service.system.UserService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ZS on 2015/8/17.
 */

//@RequestMapping("/tmpMessageGroup")
//@Controller
//public class MessageGroupController {
//    @Resource(name = "messageGroupService")
//    private MessageGroupService messageGroupService;
//
//    @Resource(name="messageGroupUserService")
//    private MessageGroupUserService messageGroupUserService;
//
//    @Resource(name="userinformationService")
//    private UserService userService;
//
//    private static final String URL = "http://211.136.163.68:8000/httpserver";
//    private static final String ENTERPRISEID = "10657109022354";
//    private static final String ACCOUNTID = "007";
//    private static final String PASSWORD = "zls@SB11";
//
//
//    /**
//     * 调用发送短息接口
//     * @param messageGroupId
//     * @param text
//     * @return
//     */
//    @RequestMapping(value = "/sendMessage", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
//    @ResponseBody
//    public String listAppOptions(Integer messageGroupId,String text) {
//        //参数检查
//        if (null!=messageGroupId && messageGroupId==0){
//            return JSONUtil.toExtResultAllJson(false,"请添加收件组(收件人)！",null);
//        }
//        //根据groupId查询user的tel
//        String numberTol="";
//        MessageGroupUser en=new MessageGroupUser();
//        en.setMessage_group_id(messageGroupId);
//        List<MessageGroupUser> messageGroupUsers=messageGroupUserService.getMessageUserByEn(en);
//        if (messageGroupUsers.size()==0){
//            return JSONUtil.toExtResultAllJson(false,"短信组中没有合法的联系人号码！",null);
//        }
//        for (int i=0;i<messageGroupUsers.size();i++){
//            MessageGroupUser mu=messageGroupUsers.get(i);
//            if (i<messageGroupUsers.size()-1)
//                numberTol=numberTol+userService.getUserById(mu.getUserId()).getStaff_tel()+";";
//            if (i==messageGroupUsers.size())//最后一个tel不缀加分号
//                numberTol=numberTol+userService.getUserById(mu.getUserId()).getStaff_tel();
//        }
//        HttpClient client = new HttpClient();
//        PostMethod post = new PostMethod(URL);
//        post.addRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=gbk");//在头文件中设置转码
//        NameValuePair[] data ={
//                new NameValuePair("c", "send"),
//                new NameValuePair("enterpriseid", ENTERPRISEID),
//                new NameValuePair("accountid",ACCOUNTID),
//                new NameValuePair("pswd", PASSWORD),
//                new NameValuePair("mobs",numberTol),
//                new NameValuePair("msg",text)
//        };
//        post.setRequestBody(data);
//
//        try{
//            client.executeMethod(post);
//            Header[] headers = post.getResponseHeaders();
//            int statusCode = post.getStatusCode();
////            System.out.println("statusCode:"+statusCode);
////            for(Header h : headers)
////            {
////                System.out.println(h.toString());
////            }
//            String result = new String(post.getResponseBodyAsString().getBytes("gbk"));
//
//            post.releaseConnection();
////            System.out.println("result:"+result);
//            return JSONUtil.toExtResultAllJson(true,"成功！",result);
//
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//
//        return null;
//
//    }
//
//
//
//    @RequestMapping(value = "/getMessageGroupTree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String getMessageGroupTree(HttpServletRequest request) {
//        List<Tree> list = messageGroupService.getMessageGroupTree();
//        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(list, true));
//        return s;
//    }
//
//    @RequestMapping(value = "/getAllMessageGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String getAllMessageGroup(HttpServletRequest request) {
//        List<Tree> list = messageGroupService.getMessageGroupTree();
//        String s= JSONUtil.toExtResultJson(list);
//        return s;
//    }
//
//    @RequestMapping(value = "/getAllMessageGroupUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
//    @ResponseBody
//    public String getAllMessageUser(HttpServletRequest request,Integer id){
//        List<User> userList=userService.getUserList();
//        List <String> resultList=null;
//        List result=new ArrayList();
//        for(int i=0;i<userList.size();i++){
//            User u=userList.get(i);
//            resultList = new ArrayList<String>();
//            resultList.add(u.getId().toString());
//            resultList.add(u.getStaff_real_name());
//            result.add(resultList);
//        }
//        String s=JSONUtil.toExtResultJson(result);
//        return s;
//    }
//
//    @RequestMapping(value = "/getUnUsedMessageGroupUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
//    @ResponseBody
//    public String getUnUsedMessageGroupUser(HttpServletRequest request,Integer id){
//        MessageGroupUser en=new MessageGroupUser();
//        en.setMessage_group_id(id);
//        //当前选中使用的所有
//        List<MessageGroupUser> messageGroupUsers=messageGroupUserService.getMessageUserByEn(en);
//        //所有可用用户
//        List<User> allUsers=userService.getUserList();
//        List<Integer> usesL=new ArrayList<Integer>();
//        List<Integer> allL=new ArrayList<Integer>();
//       for (MessageGroupUser mg:messageGroupUsers){
//            usesL.add(mg.getUserId());
//       }
//        for (User u:allUsers){
//            allL.add(u.getId());
//        }
//        allL.removeAll(usesL);
//
//        List result=new ArrayList();
//        List <String> resultList=null;
//        if (allL.size()>0){
//            for(int i=0;i<allL.size();i++ ) {
//                User reu=userService.getUserById(allL.get(i));
//                resultList = new ArrayList<String>();
//                resultList.add(reu.getId().toString());
//                resultList.add(reu.getStaff_real_name());
//                result.add(resultList);
//            }
//        }
//        return JSONUtil.toExtResultJson(result);
//    }
//
//
//    @RequestMapping(value = "/getMessageGroupById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String getMessageGroupById(HttpServletRequest request,Integer id) {
//        MessageGroup messageGroup = messageGroupService.getMessageGroupById(id);
//        String s=JSONUtil.toExtFormJson(true,null,messageGroup);
//        return s;
//    }
//
//
//    @RequestMapping(value = "/saveMessageGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String saveMessageGroup(HttpServletRequest request,Integer id,String name,Integer lo,String uList) {
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        messageGroupService.saveMessageGroup(id,name,lo,uList,userDetails.getUsername(),userService.getUserList());
//        return JSONUtil.toExtFormJson(true, "success");
//    }
//
//    @RequestMapping(value = "/delMessageGroupById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String delMessageGroupById(HttpServletRequest request,Integer id) {
//        //TODO 根据userlist添加多条记录
//        //先删除从表，再删除主表
//        MessageGroupUser en=new MessageGroupUser();
//        en.setMessage_group_id(id);
//        List<MessageGroupUser> meList=messageGroupUserService.getMessageUserByEn(en);
//        for(MessageGroupUser mg:meList){
//            messageGroupUserService.delMessageUser(mg.getId());
//        }
//        messageGroupService.delMessageById(id);
//        return JSONUtil.toExtFormJson(true, "success");
//    }
//
//
//}
