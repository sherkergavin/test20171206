package com.inas.web.pmcontroller;

import com.inas.model.Tree;
import com.inas.model.data.DBType;
import com.inas.model.data.ExternalDB;
import com.inas.service.data.DBTypeService;
import com.inas.service.data.ExternalDBService;
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
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
import java.util.List;

/**
 * Created by DongYibo on 2015/4/24.
 */
@RequestMapping("/external")
@Controller
public class ExternalDBController {
    @Resource(name = "externalDBService")
    private ExternalDBService externalDBService;
    @Resource(name="dbTypeService")
    private DBTypeService dbTypeService;

    @RequestMapping(value = "/getExternal", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getExternal(){
        List<Tree> listtrees=externalDBService.getExternal();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listtrees,true));
        return s;
    }
    @RequestMapping(value = "/allExternal", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String allExternal(HttpServletRequest request)
    {
        List external = externalDBService.allExternal();
        String s = JSONUtil.toExtFormJson(true, null, external);
        return s;
    }
    @RequestMapping(value = "/addExternal", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String addExternal(HttpServletRequest request,ExternalDB external){
        external.setVersion(1);
        external.setCreate_date(new Date());
        //登陆用户名
        /*----------------------------------------------*/
//        CasAuthenticationToken principal = (CasAuthenticationToken)request.getUserPrincipal();
//        if (principal != null && principal.getName() != null && !principal.getName().isEmpty()) {
//            external.setCreator(principal.getName());
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String user = userDetails.getUsername();
        external.setCreator(user);
//        }
        /*----------------------------------------------*/
        external.setName(external.getName());
        external.setDeleted(0);
        external.getDb_type_id();
        Integer source_type =  externalDBService.updateType(external.getDb_type_id());
        switch (source_type){
            case 1 :
                external.setConnect_name(":" + external.getConnect_name());
                break;
            case 2:
                external.setConnect_name(";DatabaseName=" + external.getConnect_name());
                break;
            case 3:
                external.setConnect_name(";DatabaseName=" + external.getConnect_name());
                break;
            case 4:
                external.getConnect_name();
                break;
        }
        externalDBService.addExternal(external);
        return JSONUtil.toExtFormJson(true,null,null);
    }
    @RequestMapping(value = "/updataExternal", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updataExternal(HttpServletRequest request,ExternalDB external){
        Integer source_type =  externalDBService.updateType(external.getDb_type_id());
        switch (source_type){
            case 1 :
                external.setConnect_name(":" + external.getConnect_name());
                break;
            case 2:
                external.setConnect_name(";DatabaseName=" + external.getConnect_name());
                break;
            case 3:
                external.setConnect_name(";DatabaseName=" + external.getConnect_name());
                break;
            case 4:
                external.getConnect_name();
                break;
//            default:
//                external.getConnect_name();
//                break;
        }
        external.setEdit_date(new Date());
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String user = userDetails.getUsername();
        external.setEditor(user);
        externalDBService.updateExternal(external);
        return JSONUtil.toExtFormJson(true,null,null);
    }
    @RequestMapping(value = "/queryExternal", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String querArea(HttpServletRequest request, Integer id) {
        ExternalDB e =  externalDBService.queryExternal(id);
        String str = e.getConnect_name();
        if (str != null) {
            String[] sqlServer = str.split("=");
            String[] orcl = str.split(":");
            //int getDBName = e.getDb_type_id();
            Integer getDBName = externalDBService.getDBName(e.getId());
            switch (getDBName) {
                case 1:
                    e.setConnect_name(orcl[1]);
                    break;
                case 2:
                    e.setConnect_name(sqlServer[1]);
                    break;
                case 3:
                    e.setConnect_name(sqlServer[1]);
                    break;
                default:
                    e.getConnect_name();
                    break;
            }
        }
        String s= JSONUtil.toExtFormJson(true, null, e);
        return s;
    }
    @RequestMapping(value = "/deleteExternal", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String deleteExternal(HttpServletRequest request,Integer id){
        externalDBService.deleteExternal(id);
        String s = JSONUtil.toExtFormJson(true,null,null);
        return s;
    }


    @RequestMapping(value = "/testDsConnectivity", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String testDsConnectivity(HttpServletRequest request,ExternalDB externalDB) {
        Integer getDBName = externalDBService.getDBName(externalDB.getId());
        Connection con = null;
        try {
            externalDB = externalDBService.queryExternal(new Integer(externalDB.getId()));
            DBType dbType = dbTypeService.queryBySourceId(new Integer(externalDB.getDb_type_id()));
            con = getConnection(externalDB, dbType);

            Statement stmt = con.createStatement();
            if(getDBName ==1){
                //Oracle
                stmt.executeQuery("select 1 from dual");
            }else if(getDBName ==2 && getDBName ==3){
                //SqlServer
                stmt.executeQuery("select GETDATE()");
            }
            return JSONUtil.toExtFormJson(true, null);
        }catch(SQLException ex){
            return JSONUtil.toExtFormJson(false, "连接测试失败: " + ex.getMessage());
        }catch(Exception ex){
            return JSONUtil.toExtFormJson(false, "内部错误: " + ex.getMessage());
        }finally {
            if (con != null) {
                try {
                    con.close();
                }catch(Exception ex){
                    //do nothing
                }

            }
        }
    }

    private Connection getConnection(ExternalDB externalDB, DBType dbType) throws Exception{
        StringBuffer url = new StringBuffer();
        url.append(dbType.getConnect_url());
        url.append(externalDB.getConnect_server());
        url.append(externalDB.getConnect_name());
        Class.forName(dbType.getDriver_name());
        //String url = "jdbc:sqlserver://116.228.174.82:1434;DatabaseName=DateCenter";
        return DriverManager.getConnection(url.toString(), externalDB.getConnect_user(), externalDB.getConnect_password());
    }
}
