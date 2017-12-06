package com.inas.web.smcontroller;

import com.inas.model.system.User;
import com.inas.service.system.UserService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;


/**
 * Created by jmwang on 2015/4/26.
 */
@RequestMapping("/user")
@Controller
public class UserController {
    @Resource(name="userinformationService")
    private UserService userService;

    @RequestMapping(value = "/getUserList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getUserList(){
        return  JSONUtil.toExtResultJson(userService.getUserList());
    }

    @RequestMapping(value = "/insertUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String insertUser(HttpServletRequest request, User user,String birthday) throws ParseException {
        String callback = null;
        try{
            callback = JSONUtil.toExtFormJson(userService.insertUser(user,birthday), "用户名已使用！");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateUser(HttpServletRequest request,User user,String birthday){
        String callback = null;
        try{
            callback = JSONUtil.toExtFormJson(userService.updateUser(user,birthday), "用户名已使用！");
        }catch (Exception e){
            callback = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return callback;
    }
    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteUser(HttpServletRequest request, User user){
        System.out.println("come on ");
        try{
            userService.deleteUser(user);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  JSONUtil.toExtFormJson(true, "success");
    }
}
