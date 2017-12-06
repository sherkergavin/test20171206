package com.inas.web.pmcontroller;

import com.inas.model.Tree;
import com.inas.model.data.CollectTask;
import com.inas.model.data.DBType;
import com.inas.model.data.ExternalDB;
import com.inas.service.data.CollectTaskService;
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
import java.sql.*;
import java.util.*;
import java.util.Date;

/**
 * Created by DongYibo on 2015/5/8.
 */
@RequestMapping("/collect")
@Controller
public class CollectTaskController {
    @Resource(name="CollectTaskService")
    private CollectTaskService collectTackService;
    @Resource(name="dbTypeService")
    private DBTypeService dbTypeService;
    @Resource(name="externalDBService")
    private ExternalDBService externalDBService;

    @RequestMapping(value = "/getcollect", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getCollect() {
        List<Tree> listtrees= collectTackService.getCollect();
        String s= JSONUtil.toExtResultTreeJson(TreeUtil.getExtTreeRoot(listtrees, true));
        return s;
    }
    @RequestMapping(value = "/allcollect", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String allCollect() {
        List eList = collectTackService.allCollect();
        String s = JSONUtil.toExtFormJson(true, null, eList);
        System.out.print(s);
        return s;
    }
    @RequestMapping(value = "/addcollect", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String addCollect(HttpServletRequest request,CollectTask collectTask,String start) {
        String sta = null;
        collectTask.setVersion(1);
        collectTask.setCreate_date(new Date());
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String user = userDetails.getUsername();
        collectTask.setCreator(user);

        collectTask.setTime_unit(1);
        collectTask.setTime_latest_add_in_db(new Date());
        collectTask.setDeleted(0);
        try{
            collectTackService.addCollect(collectTask,start);
            sta = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            sta = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return sta;
    }
    @RequestMapping(value = "/queryCollect", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String querArea(HttpServletRequest request, Integer id) {


        CollectTask c = collectTackService.queryCollect(id);


        String s= JSONUtil.toExtFormJson(true,null,c);

        return s;
    }
    @RequestMapping(value = "/updatacollect", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String updataCollect(HttpServletRequest request,CollectTask collectTask,String start) {
        collectTask.setEdit_date(new Date());
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String user = userDetails.getUsername();
        collectTask.setEditor(user);
        collectTask.setTime_latest_add_in_db(new Date());
        String sta = null;
        try{
            collectTackService.updateCollect(collectTask, start);
            sta = JSONUtil.toExtFormJson(true, "success");
        }catch (Exception e){
            sta = JSONUtil.toExtFormJson(false, e.getMessage());
        }
        return sta;
    }
    @RequestMapping(value = "/deteleCollect", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String deteleCollect(HttpServletRequest request,Integer id) {
        collectTackService.deleteCollect(id);
        String s = JSONUtil.toExtFormJson(true,null,null);
        return s;
    }


    @RequestMapping(value = "/testDsConnectivity", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String testDsConnectivity(HttpServletRequest request,CollectTask collectTask) {
        Connection con = null;
        try {
            ExternalDB externalDB = externalDBService.queryExternal(new Integer(collectTask.getExt_db_id()));
            DBType dbType = dbTypeService.queryBySourceId(new Integer(externalDB.getDb_type_id()));
            con = getConnection(externalDB, dbType);
            Statement stmt = con.createStatement();
            stmt.executeQuery("SELECT TOP 1 " + collectTask.getDb_data_value_code() + "," + collectTask.getDb_key_code()+ "," + collectTask.getDb_data_time_code() + "," + collectTask.getDb_data_record_time_code() + " FROM " + collectTask.getDb_table_code() );
            return JSONUtil.toExtFormJson(true, null);
        }catch(SQLException ex){
            return JSONUtil.toExtFormJson(false, "采集测试失败: " + ex.getMessage());
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

//    @RequestMapping(value = "/searchItems", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
//    @ResponseBody
//    public String searchItemsIn3rdDs(HttpServletRequest request,CollectTask collectTask) {
//        Connection con = null;
//        try {
//            ExternalDB externalDB = externalDBService.queryExternal(new Integer(collectTask.getExt_db_id()));
//            DBType dbType = dbTypeService.queryBySourceId(new Integer(externalDB.getDb_type_id()));
//            con = getConnection(externalDB, dbType);
//            Statement stmt = con.createStatement();
//            ResultSet rs = stmt.executeQuery("SELECT " + collectTask.getDb_key_code() + " FROM " + collectTask.getDb_table_code());
//            List<String> items = new ArrayList<String>();
//            while(rs.next()){
//                items.add(rs.getString(collectTask.getDb_key_code()));
//            }
//            return JSONUtil.toExtFormJson(true, null,items);
//        }catch(SQLException ex){
//            return JSONUtil.toExtFormJson(false, "数据源连接失败: " + ex.getMessage());
//        }catch(Exception ex){
//            return JSONUtil.toExtFormJson(false, "内部错误: " + ex.getMessage());
//        }finally {
//            if (con != null) {
//                try {
//                    con.close();
//                }catch(Exception ex){
//                    //do nothing
//                }
//
//            }
//        }
//    }
    @RequestMapping(value = "/repeatName", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String repeatName(HttpServletRequest request,String name,Integer id) {
        String json;
        Map<String,Object> maps = new HashMap<>();
        maps.put("name",name);
        maps.put("id",id);
        int i = collectTackService.repeatName(name);
        if(id==null || id==0){
            if(i>0){
                return JSONUtil.toExtFormJson(false,"任务名称重复请修改1");
            }
        }else{
            int k = collectTackService.updateRepeatName(maps);
            if(k>0){
                return JSONUtil.toExtFormJson(false,"任务名称重复请修改2");
            }else{
                json= JSONUtil.toExtFormJson(true, null, k);
                return json;
            }
        }
        json= JSONUtil.toExtFormJson(true, null, i);
        return json;
    }

    @RequestMapping(value = "/searchItems", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String searchItemsIn3rdDs(HttpServletRequest request,Integer taskId, String regex) {
        Connection con = null;
        try {
            CollectTask collectTask= collectTackService.queryCollect(taskId);
            ExternalDB externalDB = externalDBService.queryExternal(new Integer(collectTask.getExt_db_id()));
            DBType dbType = dbTypeService.queryBySourceId(new Integer(externalDB.getDb_type_id()));
            con = getConnection(externalDB, dbType);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT " + collectTask.getDb_key_code() + " FROM " + collectTask.getDb_table_code());
            Set<String> items = new HashSet<String>();

            while(rs.next()){
                String item = rs.getString(collectTask.getDb_key_code());
                if (item.indexOf(regex) != -1 && item.indexOf(regex) == 0) {
                    items.add(item);
                }
            }
            List<Map<String,String>> returnedItems = new ArrayList<Map<String,String>>();
            for (String item: items){
                if(item.equals(regex)){
                    Map<String,String> map = new HashMap<String, String>();
                    map.put("gather_key", item);
                    returnedItems.add(map);
                }
            }
            for (String item: items){
                if(!item.equals(regex)){
                    Map<String,String> map = new HashMap<String, String>();
                    map.put("gather_key", item);
                    returnedItems.add(map);
                }
            }
            return JSONUtil.toExtFormJson(true, null,returnedItems);
        }catch(SQLException ex){
            return JSONUtil.toExtFormJson(false, "数据源连接失败: " + ex.getMessage());
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
