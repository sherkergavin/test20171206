package com.inas.web.pmcontroller;

import com.inas.model.Tree;
import com.inas.model.data.DBType;
import com.inas.model.data.SourceType;
import com.inas.service.data.DBTypeService;
import com.inas.util.JSONUtil;
import com.inas.util.TreeUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by ZS on 2015/4/27.
 */
@RequestMapping("/dbType")
@Controller
public class DBTypeController {
    @Resource(name = "dbTypeService")
    private DBTypeService dbTypeService;

    @RequestMapping(value = "/allSourceTree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String allSourceTree() {
        List<DBType> sourceList = dbTypeService.queryAllSources();
        List<Tree> listTree=new ArrayList<Tree>();
        for (DBType db:sourceList){
            Tree tree=new Tree();
            tree.setId(db.getId());
            tree.setText(db.getName());
            tree.setLo(db.getLo());
            listTree.add(tree);
        }
        String s = JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listTree, true));
        return s;
    }
    @RequestMapping(value = "/allSource", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryAllSource() {
        List<DBType> sourceList = dbTypeService.queryAllSources();
        return  JSONUtil.toExtFormJson(true,null,sourceList);
    }

    @RequestMapping(value = "/allSourceType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryAllSourceType() {
       List<SourceType> allSourceType=dbTypeService.queryAllSourceType();
       String s= JSONUtil.toExtFormJson(true,null,allSourceType);
        return s;
    }

    @RequestMapping(value = "/queryBySourceTypeId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryBySourceTypeId(HttpServletRequest request, Integer typeId) {
        SourceType sourceType=dbTypeService.queryOneSourceTypeInfo(typeId);
        String s=JSONUtil.toExtFormJson(true,null,sourceType);
        return s;
    }

    @RequestMapping(value = "/queryBySourceId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String queryBySourceId(HttpServletRequest request, Integer id) {
        DBType dbTypeEntity= dbTypeService.queryBySourceId(id);
        String s= JSONUtil.toExtFormJson(true,null,dbTypeEntity);
        return s;
    }

    @RequestMapping(value = "/addNewSource", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String addNewSource(HttpServletRequest request, DBType dbType) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<DBType> allList=dbTypeService.queryAllSources();
        String tName=dbType.getName();
        for (DBType db:allList){
            String mName=db.getName();
            if (mName.equals(tName)){
                return JSONUtil.toExtFormJson(false,"不允许同名项！",null);
            }
        }
        dbType.setCreate_date(new Date());
        dbType.setCreator(userDetails.getUsername());
        dbType.setVersion(1);
        dbTypeService.addNewSource(dbType);
        String s= JSONUtil.toExtFormJson(true,null,null);
        return s;
    }

    @RequestMapping(value = "/updSourceInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updSourceInfo(HttpServletRequest request, DBType dbType) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<DBType> allList=dbTypeService.queryAllSources();
        String tName=dbType.getName();
        Integer tId=dbType.getId();
        for (DBType db:allList){
            String mName=db.getName();
            Integer mId=db.getId();
            if (tName.equals(mName) && tId!=mId){
                return JSONUtil.toExtFormJson(false,"不允许同名项！",null);
            }
        }
        dbType.setEdit_date(new Date());
        dbType.setEditor(userDetails.getUsername());
        dbTypeService.updSourceInfo(dbType);
        String s= JSONUtil.toExtFormJson(true,null,null);
        return s;
    }

    @RequestMapping(value = "/delSourceById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String delSourceById(HttpServletRequest request, Integer sourceId) {
        dbTypeService.delSourceById(sourceId);
        String s= JSONUtil.toExtFormJson(true,null,null);
        return s;
    }
}
