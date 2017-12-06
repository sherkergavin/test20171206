package com.inas.web.pmcontroller;

import com.inas.model.Tree;
import com.inas.model.data.Bind;
import com.inas.service.data.DataBindService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by ZS on 2015/5/18.
 */
@RequestMapping("/bind")
@Controller
public class DataBindController {
    @Resource(name = "dataBindService")
    private DataBindService dataBindService;

    @RequestMapping(value = "/getBindTree", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getBindTree(HttpServletRequest request) {
        List<Tree> listtrees= dataBindService.getBindTree();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listtrees, true));
        return s;
    }

    @RequestMapping(value = "/getAllBind", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getAllBind(HttpServletRequest request) {
        List<Tree> listTrees= dataBindService.getBindTree();
        String s= JSONUtil.toExtResultJson(listTrees);
        return s;
    }

    @RequestMapping(value = "/getBindById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getBindById(HttpServletRequest request,Integer id) {
        Bind bn= dataBindService.getBindById(id);
        String s= JSONUtil.toExtFormJson(true, null, bn);
        return s;
    }

    @RequestMapping(value = "/insertBind", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String insertBind(HttpServletRequest request,Bind bind) {
        String checkStr=this.checkRepName(bind);
        if (checkStr!=null && !("".equals(checkStr))){
            return JSONUtil.toExtFormJson(false, checkStr, null);
        }else{
            return JSONUtil.toExtFormJson(dataBindService.insertBind(bind), "根节点下必须是视图！", null);
        }
    }

    /**
     * 同名验证
     * @param bind
     * @return
     */
    private String checkRepName(Bind bind){
        List allBindList=dataBindService.getAllBind();
        if (bind.getId()==null || bind.getId()==0){
            for(int i=0;i<allBindList.size();i++){
                Bind bi=(Bind)allBindList.get(i);
                if (bi.getName().equals(bind.getName())){
                    return "不可同名！";
                }
            }
        }else{
            for(int i=0;i<allBindList.size();i++){
                Bind bi=(Bind)allBindList.get(i);
                //if (bi.getName().equals(bind.getName()) && bi.getId()!=bind.getId()){
                if (bi.getName()==(bind.getName()) && bi.getId()!=bind.getId()){
                    return "不可同名！";
                }
            }
        }
        return null;
    }
@RequestMapping(value = "/updateBind", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updateBind(HttpServletRequest request,Bind bind) {
        Integer dataType=bind.getType();
        Integer dataId=bind.getId();
        Integer dataParentId=bind.getParent_id();
        String checkStr=this.checkRepName(bind);
        if (checkStr!=null && !("".equals(checkStr))){
            return JSONUtil.toExtFormJson(false,checkStr,null);
        }
        if (dataType==1){
            //若有子节点，则不允许修改为数据表
            List nodeList=dataBindService.getBindByPid(dataId);
            if (nodeList.size()>0){
                return JSONUtil.toExtFormJson(false,"该节点有子数据节点，不允许修改为数据表！",null);
            }
        }
        //判断parentId是否为节点,还是数据表
        if (dataParentId!=null && dataParentId!=0){
            Bind paBind=dataBindService.getBindById(dataParentId);
            if (paBind.getType()==1){
                //parent为数据表
                return JSONUtil.toExtFormJson(false,"隶属不允许为数据表！",null);
            }
        }

        if(null != bind.getParent_id()){
            Bind bi = new Bind();
            bi.setId(bind.getParent_id());
            bi = dataBindService.getBindById2(bi);
            if(null == bi.getParent_id()){
                if(bind.getType().equals(1)){
                    return JSONUtil.toExtFormJson(false,"根节点下必须是视图！",null);
                }
            }
            return JSONUtil.toExtFormJson(dataBindService.updateBind(bind), null, null);
        }else{
            return JSONUtil.toExtFormJson(dataBindService.updateBind(bind), null, null);
        }
    }

    @RequestMapping(value = "/deleteBind", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String deleteBind(HttpServletRequest request,Integer id) {
        dataBindService.deleteBind(id);
        String s= JSONUtil.toExtFormJson(true, null, null);
        return s;
    }

}
