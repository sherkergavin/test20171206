package com.inas.web.pmcontroller;

import com.inas.model.system.Dictionary;
import com.inas.service.system.DictionaryService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by WangJm on 2015/6/11.
 */
@RequestMapping("/system")
@Controller
public class DictionaryController {
    @Resource(name = "dictionaryService")
    private DictionaryService dictionaryService;

    @RequestMapping(value = "/getDictionaryByType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDictionaryByType(HttpServletRequest request,Dictionary dictionary){
        return JSONUtil.toExtResultJson(dictionaryService.getDictionaryByType(dictionary));
    }

    @RequestMapping(value = "/getDictionaryByIdOrCode", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDictionaryByIdOrCode(HttpServletRequest request,Dictionary dictionary){
        return JSONUtil.toExtResultJson(dictionaryService.getDictionaryByIdOrCode(dictionary));
    }
}
