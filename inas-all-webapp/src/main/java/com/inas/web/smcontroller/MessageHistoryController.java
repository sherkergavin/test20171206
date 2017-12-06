package com.inas.web.smcontroller;

import com.inas.model.system.MessageHistory;
import com.inas.model.system.MessageHistoryVO;
import com.inas.service.system.MessageHistoryService;
import com.inas.service.system.UserService;
import com.inas.service.work.MessageGroupUserService;
import com.inas.util.DateUtil;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zs on 2016/1/26.
 */
@Controller
@RequestMapping("msgHistory")
public class MessageHistoryController {
    @Resource(name = "messageHistoryService")
    private MessageHistoryService messageHistoryService;

    @Resource(name = "messageGroupUserService")
    private MessageGroupUserService messageGroupUserService;

    @Resource(name = "userinformationService")
    private UserService userService;


    @RequestMapping(value = "/queryMsgHistoryList", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryMsgHistoryList(HttpServletRequest request, MessageHistoryVO messageHistoryVO,String startDateStr,String endDateStr) {
        try {
            if (startDateStr!=null && !"".equals(startDateStr))
                messageHistoryVO.setSearchstartDate(DateUtil.parseStringToDate(startDateStr, DateUtil.FORMAT_DATE));
            if (null!=endDateStr && !"".equals(endDateStr))
                messageHistoryVO.setSearchEndDate(DateUtil.addDays(DateUtil.parseStringToDate(endDateStr,DateUtil.FORMAT_DATE),1));
            List<MessageHistoryVO> list = messageHistoryService.queryMsgListByEn(messageHistoryVO);
            return JSONUtil.toExtResutlMenuJson(list);
        }catch (Exception e){
            e.printStackTrace();
            return e.toString();
        }
    }


    @RequestMapping(value = "/addMessageHistory", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String addMessageHistory(HttpServletRequest request, MessageHistory messageHistory) {
        if (null == messageHistory.getMessage_group_id() || 0 == messageHistory.getMessage_group_id()) {
            if (null != messageHistory.getRecipient() && !"".equals(messageHistory.getRecipient())) {
                //给单个人发信息
                String result = messageGroupUserService.SendMessage(messageHistory.getRecipient(), messageHistory.getContext());
                if (result != null && "success".equals(result)) {
                    //成功
                    return JSONUtil.toExtFormJson(true, null, null);
                }else {
                    return JSONUtil.toExtFormJson(false, "功能模块的参数不合法！", null);
                }
            } else {
                return JSONUtil.toExtFormJson(false, "功能模块的参数不合法！", null);
            }

        } else {
            if (null == messageHistory.getRecipient() || "".equals(messageHistory.getRecipient())) {
                //给群组发送信息
                String result = messageGroupUserService.SendMessage(messageHistory.getMessage_group_id(), messageHistory.getContext());
                if (result != null && "success".equals(result)) {
                    //成功
                    return JSONUtil.toExtFormJson(true, null, null);
                }else {
                    return JSONUtil.toExtFormJson(false, "功能模块的参数不合法！", null);
                }
            } else {
                return JSONUtil.toExtFormJson(false, "功能模块的参数不合法！", null);
            }
        }
    }
}
