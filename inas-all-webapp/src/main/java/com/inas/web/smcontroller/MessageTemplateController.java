package com.inas.web.smcontroller;

import com.inas.model.Tree;
import com.inas.model.system.MessageTemplate;
import com.inas.service.system.MessageTemplateService;
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
 * Created by zs on 2016/1/27.
 */
@Controller
@RequestMapping("/msgTemplate")
public class MessageTemplateController {
    @Resource(name="messageTemplateService")
    private MessageTemplateService messageTemplateService;



    @RequestMapping(value = "/queryMsgTemplateTree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryMsgTemplateTree(HttpServletRequest request){
        List<MessageTemplate> list=messageTemplateService.queryTmeplateByEn(null);
        List<Tree> listTree=new ArrayList<Tree>();
        for (MessageTemplate tmp:list){
            Tree tree=new Tree();
            tree.setId(tmp.getId());
            tree.setText(tmp.getTitle());
            tree.setLo(tmp.getLo());
            listTree.add(tree);
        }
        String s = JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listTree, true));
        return s;

    }


    @RequestMapping(value = "/queryTemplateByEn", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryTemplateByEn(HttpServletRequest request,MessageTemplate messageTemplate){
        List<MessageTemplate> list=messageTemplateService.queryTmeplateByEn(messageTemplate);
        return JSONUtil.toExtFormJson(true,null,list);
    }

    @RequestMapping(value = "/addTemplate", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String addTemplate(HttpServletRequest request,MessageTemplate messageTemplate){
        messageTemplateService.addTemplate(messageTemplate);
        return JSONUtil.toExtFormJson(true,null);
    }


    @RequestMapping(value = "/updateTemplate", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateTemplate(HttpServletRequest request,MessageTemplate messageTemplate){
        messageTemplateService.updateTemplate(messageTemplate);
        return JSONUtil.toExtFormJson(true,null);
    }
}
