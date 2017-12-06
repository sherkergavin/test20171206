package com.inas.web;

import com.inas.message.SimpleMessageReceiver;
import com.inas.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.MessageChannel;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/alarm/**")
@Controller
public class AlarmController {

    @Resource
    private SimpleMessageReceiver simpleMessageReceiver;

    @Autowired
    private MessageChannel messageOut;

    @RequestMapping
    public String index() {
        return "alarm/index";
    }

    @RequestMapping(value = "/send", method = RequestMethod.GET)
    @ResponseBody
    public String send(HttpServletRequest request) {
        Map params = new HashMap(request.getParameterMap());
        params.put("timestamp", Calendar.getInstance().getTime().toString());
        messageOut.send(MessageBuilder.withPayload(params).build());
        return JSONUtil.toJson(params);
    }

    @RequestMapping(value = "/messages", method = RequestMethod.GET)
    @ResponseBody
    public String findAll(HttpServletRequest request) {
        List messages = simpleMessageReceiver.getMessages();
        return JSONUtil.toJson(messages);
    }

}
