package com.inas.workflow.impl;

import com.inas.model.system.User;
import com.inas.model.workflow.ProcessModel;
import com.inas.model.workflow.TaskModel;
import com.inas.service.system.UserService;
import com.inas.util.FtpFileUtil;
import com.inas.util.JSONUtil;
import com.inas.workflow.ActivitiRESTProxy;
import com.inas.workflow.LoginUserHelper;
import com.inas.workflow.WorkflowConstants;
import com.inas.workflow.WorkflowService;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.ssl.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.*;

public class WorkflowServiceImpl implements WorkflowService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private ActivitiRESTProxy proxy;

    @Autowired
    @Qualifier("loginUserHelper")
    private LoginUserHelper loginUserHelper;

    private final static int QUERY_SIZE=1024;

    @Autowired
    private UserService userService;


    @Override
    public List<TaskModel> getAllTasks(String procDefKey){
        List<TaskModel> list = new ArrayList<>();
        System.out.println("当前查询的流程的procDefKey:"+procDefKey);
        //查询由我发起的任务
        List<TaskModel> ownTasks = this.queryStartedByMeTasks(procDefKey);
        //查询待我审批的任务
        List<TaskModel> currentTasks = this.queryCurrentMineTasks(procDefKey);
        list.addAll(currentTasks);
        //查询可由我领取审批的任务
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<TaskModel> candidateTasks = this.getTasksByCandidateUser(userDetails.getUsername(), procDefKey);

        //添加的时候，将由我审批的list和带我审批的任务从由我发起中删除，避免重复后覆盖状态
        List<TaskModel> delList=new ArrayList<>();
        if (ownTasks.size()>0 && currentTasks.size()>0){
            for(TaskModel ta1:ownTasks){
                for (TaskModel ta2:currentTasks){
                    //ta1,如果为已完成，则任务Id为空
                    if (null!=ta1.getId() && !"".equals(ta1.getId()) && ta1.getId().equals(ta2.getId())){
                        //该任务即是由我发起，又是待我审批,则该任务取可审批的状态,将它从由我发起的list中移除
                        delList.add(ta1);
                    }
                }
            }
        }
        if (ownTasks.size()>0 && currentTasks.size()>0){
            for(TaskModel ta1:ownTasks){
                for (TaskModel ta2:candidateTasks){
                    if (ta1.getId()==ta2.getId()){
                        //该任务即是由我发起，又是可由我审批,则该任务取可审批的状态,将它从由我发起的list中移除
                        delList.add(ta1);
                    }
                }
            }
        }
        //先删除delList
        ownTasks.removeAll(delList);
        list.addAll(currentTasks);
        list.addAll(ownTasks);
        list.addAll(candidateTasks);
        List<TaskModel> involveTempList=this.queryInvolvedUserTasks(procDefKey);
        List<TaskModel> delLS=new ArrayList<>();
        if (involveTempList.size()>0 && ownTasks.size()>0){
            for (TaskModel t1:involveTempList){
                for (TaskModel t2:ownTasks){
                    //判断是否id相同(对于已完成的任务则判断是否相同的procId)
                    if (null!=t1.getId()  && null!=t2.getId()) {
                        if (t1.getId().equals(t2.getId()))
                        delLS.add(t1);
                    }else{
                        if (null!=t1.getProcessInstanceId() && null!=t2.getProcessInstanceId()){
                            if (t1.getProcessInstanceId().equals(t2.getProcessInstanceId())){
                                delLS.add(t1);
                            }
                        }
                    }
                }
            }
        }
        involveTempList.removeAll(delLS);
        List<TaskModel> involvedList=involveTempList;
        list.addAll(involvedList);
        return list;
    }


    /**
     * 根据表单类型匹配特殊的条件
     * @param procKey
     * @param allList
     * @param userName
     * @return
     */
    private List<TaskModel> ScreenByProcKey(String procKey,List<TaskModel> allList,String userName){
        //根据名称查询用户基本信息
        User user=userService.getUserByUserName(userName);
        List<TaskModel> resultList=new ArrayList<>();
        if (procKey.equals(WorkflowConstants.WF_STOPEQUIPMENT)){
            for (TaskModel tk:allList){
                //同一部门负责人可审批
                if (null!=tk.getTaskDefinitionKey() && !"".equals(tk.getTaskDefinitionKey()) && !"0".equals(tk.getTaskDefinitionKey()) ){
                    if (tk.getTaskDefinitionKey().equals("usertask1")){
                        if (tk.getFillUnit().equals(user.getOrganization_id().toString()))
                            resultList.add(tk);
                    }else{
                        //不是负责人审批
                        resultList.add(tk);
                    }
                }
            }
            return resultList;
        }else{
            return allList;
        }

    }

    /**
     * 封装页面表单参数
     * @param request
     * @param opState 控制上传权限的标示
     * @return
     */
    private Map<String, Object> getFormParamMap(HttpServletRequest request,String opState) {
        Map map=new HashMap();
        if (null!=opState && "start".equals(opState)){
        if(ServletFileUpload.isMultipartContent(request)){
            //请求参数中存在文件流
            System.out.println("field come!!!!");
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            Iterator<String> fileNames=multipartRequest.getFileNames();
            while (fileNames.hasNext()) {
                String fnameIt = (String) fileNames.next();
                MultipartFile file=multipartRequest.getFile(fnameIt);
                if (null!=file && !file.isEmpty()){
//                    System.out.println("表单名："+fnameIt);
                    String orgName=file.getOriginalFilename();
                    System.out.println("文件名："+orgName);
                    String fdPath=FtpFileUtil.getPath("workflow");
                    System.out.println("文件ftp存放文件夹："+fdPath);
                    try{
                        if (FtpFileUtil.uploadFile(fdPath, orgName, file.getInputStream())){
                            map.put(fnameIt, fdPath+ "/" + orgName);
                        }
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
        }
        }
        Map paramters = request.getParameterMap();
        List<Object> variables = new ArrayList<>();
        Iterator iter = paramters.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry entry = (Map.Entry) iter.next();
            Map<String, Object> variable = new HashMap<>();
            String key = entry.getKey().toString();
            String reKey = key;
            if (key.startsWith("inas_")) {
                reKey = reKey.substring(5, key.length());
                variable.put("name", reKey);
                try {
                    variable.put("value", java.net.URLDecoder.decode(java.net.URLDecoder.decode(request.getParameter(key), "utf-8")));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                variables.add(variable);
            }
        }

        Iterator mapIt=map.entrySet().iterator();
        while (mapIt.hasNext()) {
            Map.Entry entry = (Map.Entry) mapIt.next();
            Map<String, Object> variable = new HashMap<>();
            String key = entry.getKey().toString();
            String reKey = key;
//            if (key.startsWith("inas_")) {
//                reKey = reKey.substring(5, key.length());
                variable.put("name", reKey);
                try {
                    variable.put("value", java.net.URLDecoder.decode(java.net.URLDecoder.decode(map.get(key).toString(), "utf-8")));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                variables.add(variable);
//            }
        }
        Map<String, Object> processMap = new HashMap<>();
        processMap.put("variables", variables);
        return processMap;
    }

    /**
     * 查询所有正在执行的调度指令
     */
    public List<TaskModel> getExecutingScheduleForm(){
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<Object> variables = new ArrayList<>();
        Map<String, Object> variable = new HashMap<>();
        variable.put("name", "isExecuting");
        variable.put("value", Boolean.TRUE);
        variables.add(variable);
        variable = new HashMap<>();
        variable.put("name", "isComplete");
        variable.put("value", Boolean.FALSE);
        variables.add(variable);
        paramsMap.put("variables", variables);

        String headParamsJson = net.sf.json.JSONObject.fromObject(paramsMap).toString();
        String url = WorkflowConstants.HIS_PROCESS_INSTANCES + "?size="+QUERY_SIZE;
        HttpEntity request = new HttpEntity<>(headParamsJson, createHttpHeaders());
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.POST, request, String.class);
        String result = responseEntity.getBody();

        return this.convertToCommonTask(result, WorkflowConstants.OP_HIS ,"");
    }

    /**
     * 查询所有正在计划的调度指令
     */
    public List<TaskModel> getPlanningScheduleForm(){
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<Object> variables = new ArrayList<>();
        Map<String, Object> variable = new HashMap<>();
        variable.put("name", "isPlaning");
        variable.put("value", Boolean.TRUE);
        variables.add(variable);
        variable = new HashMap<>();
        variable.put("name", "isExecuting");
        variable.put("value", Boolean.FALSE);
        variables.add(variable);

        Calendar calendar = new GregorianCalendar();
        calendar.setTime(new Date());

        variable = new HashMap<>();
        variable.put("name", "planingStartTime");
        variable.put("operation", "greaterThan");
        variable.put("value", calendar.getTime());
        variables.add(variable);

        calendar.add(Calendar.DAY_OF_MONTH, 3);
        variable = new HashMap<>();
        variable.put("name", "planingStartTime");
        variable.put("operation", "lessThan");
        variable.put("value", calendar.getTime());
        variables.add(variable);

        paramsMap.put("variables", variables);

        String headParamsJson = net.sf.json.JSONObject.fromObject(paramsMap).toString();
        String url = WorkflowConstants.HIS_PROCESS_INSTANCES + "?size="+QUERY_SIZE;
        HttpEntity request = new HttpEntity<>(headParamsJson, createHttpHeaders());
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.POST, request, String.class);
        String result = responseEntity.getBody();

        return this.convertToCommonTask(result, WorkflowConstants.OP_HIS ,"");
    }

    @Override
    public List<TaskModel> queryRunningTaskByProcId(String procId, String OPState,String procKey) {
        String url = "/runtime/tasks" + "?processInstanceId={processInstanceId}&size="+QUERY_SIZE;
        Map<String, String> params = new HashMap<>();
        HttpEntity request = new HttpEntity<>(null, createHttpHeaders());
        params.put("processInstanceId", procId);
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.GET, request, String.class, params);
        String result = responseEntity.getBody();
        return this.convertToCommonTask(result, OPState,procKey);
    }


    @Override
    public ProcessModel queryProcInstanceById(String procId) {
        String url = WorkflowConstants.HIS_PROCESS_INSTANCES + "?processInstanceId={processInstanceId}";
        //历史任务
        Map<String, String> params = new HashMap<String, String>();
        params.put("processInstanceId", procId);
        HttpEntity request = new HttpEntity(null, createHttpHeaders());
        ResponseEntity<String> response = proxy.exchange(url, HttpMethod.GET, request, String.class, params);
        String result = response.getBody();
        Map row = (Map) this.jsonConvertToList(result).get(0);
        return ProcessModel.procConvert(row);
    }


    @Override
    public List<TaskModel> getTasksByCandidateUser(String candidateUser, String processDefKey) {
        String url = WorkflowConstants.RUNTIME_TASKS_CANDIDATE_USERS;

        HttpEntity request = new HttpEntity(null, createHttpHeaders());
        ResponseEntity<String> response = proxy.exchange(url, HttpMethod.GET, request, String.class, candidateUser, processDefKey);
        String result = response.getBody();
        System.out.println("可有我领取审批的任务：" + result);
        List<TaskModel> list=this.convertToCommonTask(result, WorkflowConstants.OP_RUN, processDefKey);
        //调用类型的特殊剔除条件筛选符合审批要求的结果集
        return this.ScreenByProcKey(processDefKey, list, candidateUser);
    }

    @Override
    public List<TaskModel> queryCurrentMineTasks(String prcessDefKey) {
        HttpEntity request = new HttpEntity<>(null, createHttpHeaders());
        //待我审批的任务
        String url1 = WorkflowConstants.RUNTIME_TASK
                + "?processDefinitionKey={processDefinitionKey}&assignee={assignee}&size="+QUERY_SIZE;
        Map params = new HashMap();

        User user = loginUserHelper.getCurrentUser();

        params.put("assignee", user.getUser_name());
        params.put("processDefinitionKey", prcessDefKey);
        ResponseEntity<String> responseEntity = proxy.exchange(url1, HttpMethod.GET, request, String.class, prcessDefKey, user.getUser_name());
        String result = responseEntity.getBody();
        System.out.println("待我审批的任务:" + result);
        List<TaskModel> list = this.convertToCommonTask(result, WorkflowConstants.OP_RUN,prcessDefKey);
        //调用类型的特殊剔除条件筛选符合审批要求的结果集
        return this.ScreenByProcKey(prcessDefKey,list,user.getUser_name());
    }

    @Override
    public List<TaskModel> queryCurrentMineTasks() {
        HttpEntity request = new HttpEntity<>(null, createHttpHeaders());
        //待我审批的任务
        String url1 = WorkflowConstants.RUNTIME_TASK
                + "?assignee={assignee}&size="+QUERY_SIZE;
        Map params = new HashMap();

        User user = loginUserHelper.getCurrentUser();
        params.put("assignee", user.getUser_name());
        ResponseEntity<String> responseEntity = proxy.exchange(url1, HttpMethod.GET, request, String.class, user.getUser_name());
        String result = responseEntity.getBody();
        System.out.println("待我审批的任务:" + result);
        List<TaskModel> list = this.convertToCommonTask(result, WorkflowConstants.OP_RUN, "");
        return this.ScreenByProcKey("",list,user.getUser_name());
    }

    @Override
    public List<TaskModel> queryStartedByMeTasks(String processDefKey) {
        User user = loginUserHelper.getCurrentUser();

        HttpEntity request = new HttpEntity<>(null, createHttpHeaders());
        String url1 = WorkflowConstants.HIS_PROCESS_INSTANCES
                + "?startedBy={startedBy}&processDefinitionKey={processDefinitionKey}&size="+QUERY_SIZE;
        Map params = new HashMap();
        params.put("startedBy", user.getUser_name());
        params.put("processDefinitionKey", processDefKey);
        ResponseEntity<String> responseEntity = proxy.exchange(url1, HttpMethod.GET, request, String.class, user.getUser_name(), processDefKey);
        String result = responseEntity.getBody();
        System.out.println("由我发起的流程的当前任务:" + result);
        //根据流程实例获取流程实例的所有Id集合,返给前台该流程上最新任务详情
        List jsonList = this.jsonConvertToList(result);
        List<TaskModel> resultList = new ArrayList<>();
        for (int i = 0; i < jsonList.size(); i++) {
            Map row = (Map) jsonList.get(i);
            if (row.get("id") != null || !("".equals(row.get("id")))) {
                //判断该流程是否已经结束
                if (row.get("endTime") == null || "".equals(row.get("endTime"))) {
                    //该流程在进行中，查询该流程正在运行中的任务
                    List<TaskModel> list = queryRunningTaskByProcId(row.get("id").toString(), WorkflowConstants.OP_HIS,processDefKey);
                    resultList.addAll(list);
                } else {
                    //该流程已完成
                    if (null!=row.get("id")) {
                        String proId=row.get("id").toString();
                        TaskModel finishedTask = new TaskModel(null, "--", proId, row.get("startTime").toString(), row.get("endTime").toString(), WorkflowConstants.wf_FINISHED);
                        try {
                            finishedTask.setName(new String("完成".getBytes(),"utf-8"));
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }
                        if (null != row.get("startUserId"))
                            finishedTask.setStartUser(row.get("startUserId").toString());
                        List<Map> finsishList=this.getHistoryVariables(proId);
                        //TODO 显示概要。。。
                        if (processDefKey.equals(WorkflowConstants.WF_STOPEQUIPMENT)) {
                            for (Map map : finsishList) {
                                if (!map.isEmpty()) {
                                    if (map.get("name").equals("jobOverview")) {
                                        System.out.println("=====" + map.get("value"));
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setContext(map.get("value").toString());
                                    }
                                    //fillUnit:填报单位
                                    if (map.get("name").equals("fillUnit")) {
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setFillUnit(map.get("value").toString());
                                    }

                                    //isMonitoringCenter：中心审批isMonitoringCenter
                                    if (map.get("name").equals("isMonitoringCenter")) {
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setIsMonitoringCenter(map.get("value").toString());
                                    }
                                }
                            }
                        }
                        if (processDefKey.equals(WorkflowConstants.WF_WATERBREAK)){//断水
                            for (Map map:finsishList){
                                if (!map.isEmpty()) {
                                    if (map.get("name").toString().equals("jobContent")) {
                                        System.out.println("context：" + map.get("value"));
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setContext(map.get("value").toString());
                                    }
                                }
                            }
                        }
                        if (processDefKey.equals(WorkflowConstants.WF_VALVEOPERATION)){//阀门操作单
                            for (Map map:finsishList){
                                if (!map.isEmpty()) {
                                    //工作内容
                                    if (map.get("name").toString().equals("jobContent")) {
                                        System.out.println("context：" + map.get("value"));
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setContext(map.get("value").toString());
                                    }
                                }
                            }
                        }

                        resultList.add(finishedTask);
                    }


                }
            }
        }
        System.out.println("=====" + resultList.size());
        return resultList;
    }


    @Override
    public List<TaskModel> queryStartedByMeTasks() {
        User user = loginUserHelper.getCurrentUser();

        HttpEntity request = new HttpEntity<>(null, createHttpHeaders());
        String url1 = WorkflowConstants.HIS_PROCESS_INSTANCES
                + "?startedBy={startedBy}&finished=false&size="+QUERY_SIZE;
        Map params = new HashMap();
        params.put("startedBy", user.getUser_name());
        ResponseEntity<String> responseEntity = proxy.exchange(url1, HttpMethod.GET, request, String.class, user.getUser_name());
        String result = responseEntity.getBody();
        System.out.println("由我发起的流程的当前任务:" + result);
        //根据流程实例获取流程实例的所有Id集合,返给前台该流程上最新任务详情
        List jsonList = this.jsonConvertToList(result);
        List<TaskModel> resultList = new ArrayList<>();
        for (int i = 0; i < jsonList.size(); i++) {
            Map row = (Map) jsonList.get(i);
            List<TaskModel> list = queryRunningTaskByProcId(row.get("id").toString(), WorkflowConstants.OP_HIS, row.get("processDefinitionId").toString().split(":")[0]);
            resultList.addAll(list);
        }
        System.out.println("=====" + resultList.size());
        return resultList;
    }

    @Override
    public List<TaskModel> queryInvolvedUserTasks(String processDefKey) {
        User user = loginUserHelper.getCurrentUser();

        HttpEntity request = new HttpEntity<>(null, createHttpHeaders());
        String url1 = WorkflowConstants.HISTORY_TASK_INVOLVEDUSER;
        Map params = new HashMap();
        params.put("involvedUser", user.getUser_name());
        params.put("processDefinitionKey", processDefKey);
        params.put("size", QUERY_SIZE);
        ResponseEntity<String> responseEntity = proxy.exchange(url1, HttpMethod.GET, request, String.class, params);
        String result = responseEntity.getBody();
        System.out.println("由我参与过的流程的当前任务:" + result);
        //根据流程实例获取流程实例的所有Id集合,返给前台该流程上最新任务详情
        List jsonList = this.jsonConvertToList(result);
        List<TaskModel> resultList = new ArrayList<>();
        for (int i = 0; i < jsonList.size(); i++) {
            Map row = (Map) jsonList.get(i);
            if (row.get("id") != null || !("".equals(row.get("id")))) {
                //判断该流程是否已经结束
                if (row.get("endTime") == null || "".equals(row.get("endTime"))) {
                    //该流程在进行中，查询该流程正在运行中的任务
                    List<TaskModel> list = queryRunningTaskByProcId(row.get("id").toString(), WorkflowConstants.OP_HIS,processDefKey);
                    resultList.addAll(list);
                } else {
                    //该流程已完成
                    if (null!=row.get("id")) {
                        String proId=row.get("id").toString();
                        TaskModel finishedTask = new TaskModel(null, "--", proId, row.get("startTime").toString(), row.get("endTime").toString(), WorkflowConstants.wf_FINISHED);
                        try {
                            finishedTask.setName(new String("完成".getBytes(),"utf-8"));
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }
                        if (null != row.get("startUserId"))
                            finishedTask.setStartUser(row.get("startUserId").toString());
                        List<Map> finsishList=this.getHistoryVariables(proId);
                        if (processDefKey.equals(WorkflowConstants.WF_STOPEQUIPMENT)) {
                            for (Map map : finsishList) {
                                if (!map.isEmpty()) {
                                    if (map.get("name").toString().equals("jobOverview")) {
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setContext(map.get("value").toString());
                                    }
                                    //fillUnit:填报单位
                                    if (map.get("name").toString().equals("fillUnit")){
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setFillUnit(map.get("value").toString());
                                    }

                                    //isMonitoringCenter：中心审批
                                    if (map.get("name").toString().equals("isMonitoringCenter")){
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setIsMonitoringCenter(map.get("value").toString());
                                    }
                                }
                            }
                        }
                        if (processDefKey.equals(WorkflowConstants.WF_WATERBREAK)){//断水
                            for (Map map:finsishList){
                                if (!map.isEmpty()) {
                                    if (map.get("name").toString().equals("jobContent")) {
                                        System.out.println("context：" + map.get("value"));
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setContext(map.get("value").toString());
                                    }
                                }
                            }
                        }
                        if (processDefKey.equals(WorkflowConstants.WF_VALVEOPERATION)){//阀门操作单
                            for (Map map:finsishList){
                                if (!map.isEmpty()) {
                                    //工作内容
                                    if (map.get("name").toString().equals("jobContent")) {
                                        System.out.println("context：" + map.get("value"));
                                        if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                            finishedTask.setContext(map.get("value").toString());
                                    }
                                }
                            }
                        }
                        resultList.add(finishedTask);
                    }


                }
            }
        }
        System.out.println("=====" + resultList.size());
        return resultList;
    }

    /**
     * 将json转为List集合
     *
     * @param jsonResult
     * @return
     */
    private List jsonConvertToList(String jsonResult) {
        JSONObject jsonObject = new JSONObject(jsonResult);
        JSONArray jsonArray = jsonObject.getJSONArray("data");
        String jsonStr = jsonArray.toString();
        List jsonList = JSONUtil.fromJson(jsonStr, ArrayList.class);
        return jsonList;
    }


    @Override
    public String claimTask(String taskId, String userId) {
        Map<String, String> headMap = new HashMap<>();
        headMap.put("action", "claim");
        headMap.put("assignee", userId);
        String headJson = net.sf.json.JSONObject.fromObject(headMap).toString();
        String url = "/runtime/tasks/{taskId}";
        Map params = new HashMap();
        params.put("taskId", taskId);

        HttpEntity request = new HttpEntity(headJson, createHttpHeaders());
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.POST, request, String.class, params);
        return responseEntity.getStatusCode().toString();
    }


    @Override
    public String completeTask(String taskId, HttpServletRequest httpRequest) {
        String url = WorkflowConstants.RUNTIME_TASKS_ACTION;
        Map params = new HashMap();
        params.put("taskId", taskId);
        //将从表报中获取到的参数转为json请求体
        Map headMap = this.getFormParamMap(httpRequest, null);
        headMap.put("action", "complete");
        String jsonResult = net.sf.json.JSONObject.fromObject(headMap).toString();
        HttpEntity requestEntity = new HttpEntity(jsonResult, createHttpHeaders());
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.POST, requestEntity, String.class, params);
        if (responseEntity.getStatusCode() == HttpStatus.OK || responseEntity.getStatusCode() == HttpStatus.NO_CONTENT) {
            return responseEntity.getStatusCode().toString();
        } else {
            throw new IllegalStateException("HTTP " + responseEntity.getStatusCode() + " FOUND");
        }
    }


    @Override
    public String getRunTaskVariables(String taskId, boolean scope) {
//        GET
        String url = "/runtime/tasks/{taskId}/variables?scope={scope}";
        Map params = new HashMap();
        params.put("taskId", taskId);
        params.put("scope", scope);

        HttpEntity request = new HttpEntity(null, createHttpHeaders());
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.GET, request, String.class, params);
        return responseEntity.getBody();
    }


    @Override
    public List<Map> getHistoryVariables(String processInstanceId) {
        String url = "/history/historic-variable-instances?processInstanceId={processInstanceId}&size={size}";
        Map params = new HashMap();
        params.put("processInstanceId", processInstanceId);
        params.put("size", QUERY_SIZE);

        HttpEntity request = new HttpEntity(null, createHttpHeaders());
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.GET, request, String.class, params);
        String result = responseEntity.getBody();
        //将json转为List
        List jsonList = this.jsonConvertToList(result);
        List<Map> resultLis = new ArrayList<Map>();
        for (int i = 0; i < jsonList.size(); i++) {
            Map map = (Map) jsonList.get(i);
            Map mapSon = (Map) map.get("variable");
            resultLis.add(mapSon);
        }
        return resultLis;
    }



    private Map<String, Object> initProcessStartParams(String processDefinitionKey, String assignee, String form_id) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("processDefinitionKey", processDefinitionKey);
        List<Object> variables = new ArrayList<>();
        Map<String, String> variable = new HashMap<>();
        variable.put("name", "assignee");
        variable.put("value", assignee);
        variables.add(variable);
        variable = new HashMap<>();
        variable.put("name", "form_id");
        variable.put("value", form_id);
        variables.add(variable);
        map.put("variables", variables);
        return map;
    }


    @Override
    public String startProcess(String procDefKey, HttpServletRequest fmRequest) {
        Map<String, Object> fmParamMap = this.getFormParamMap(fmRequest,"start");
        String url = WorkflowConstants.RUNTIME_INSTANCES;
        fmParamMap.put("processDefinitionKey", procDefKey);
        String headParamsJson = net.sf.json.JSONObject.fromObject(fmParamMap).toString();
        HttpEntity request = new HttpEntity(headParamsJson, createHttpHeaders());
        try{
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.POST, request, String.class);
        System.out.println("startResult===="+responseEntity.getBody());
        return responseEntity.getStatusCode().toString();
        }catch(Exception e){
            return e.toString();
        }
    }

    private List<TaskModel> convertToCommonTask(String jsonResult, String opState,String procKey) {
        List jsonList = this.jsonConvertToList(jsonResult);
        List<TaskModel> list = new ArrayList<>();
        TaskModel task = null;
        for (int i = 0; i < jsonList.size(); i++) {
            Map row = (Map) jsonList.get(i);
            task = new TaskModel();
            if (opState.equals(WorkflowConstants.OP_HIS)) {
                //正在进行、完成
                if (null == row.get("endTime") || "".equals(row.get("endTime"))) {
                    task.setEndTime(null);
                    //正在进行
                    task.setState(WorkflowConstants.wf_RUNNING);
                } else {
                    task.setEndTime(row.get("endTime").toString());
                    task.setState(WorkflowConstants.wf_FINISHED);
                }
                if (null == row.get("assignee") || "".equals(row.get("assignee"))) {
                    task.setAssignee(null);
                } else {
                    task.setAssignee(row.get("assignee").toString());
                }
            }
            if (opState.equals(WorkflowConstants.OP_RUN)) {

                if (null == row.get("assignee") || "".equals(row.get("assignee"))) {
                    task.setAssignee(null);
                    //可由我签收
                    task.setState(WorkflowConstants.wf_FORMECLAIM);
                } else {
                    task.setAssignee(row.get("assignee").toString());
                    //待我审批
                    task.setState(WorkflowConstants.wf_MINETURN);
                }
                task.setEndTime(null);
            }


            if (null == row.get("id") || "".equals(row.get("id"))) {
                task.setId(null);
            } else {
                task.setId(row.get("id").toString());
            }

            if (null == row.get("name") || "".equals(row.get("name"))) {
                task.setName(null);
            } else {
                task.setName(row.get("name").toString());
            }

            if (null == row.get("processDefinitionId") || "".equals(row.get("processDefinitionId"))) {
                task.setProcessDefinitionId(null);
            } else {
                task.setProcessDefinitionId(row.get("processDefinitionId").toString());
            }

            if (null == row.get("processInstanceId") || "".equals(row.get("processInstanceId"))) {
                task.setProcessInstanceId(null);
            } else {
                String proceId=row.get("processInstanceId").toString();
                task.setProcessInstanceId(proceId);
                List<Map> params=this.getHistoryVariables(proceId);
                //各个表单字段不同
                if (procKey.equals(WorkflowConstants.WF_STOPEQUIPMENT)){//设备停役单
                    for (Map map:params){
                        if (!map.isEmpty()) {
                            if (map.get("name").toString().equals("jobOverview")) {
                                System.out.println("context：" + map.get("value"));
                                if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                    task.setContext(map.get("value").toString());
                            }
                            //fillUnit:填报单位
                            if (map.get("name").toString().equals("fillUnit")) {
                                if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                    task.setFillUnit(map.get("value").toString());
                            }

                            //isMonitoringCenter：中心审批
                            if (map.get("name").toString().equals("isMonitoringCenter")) {
                                if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                    task.setIsMonitoringCenter(map.get("value").toString());
                            }
                        }
                    }
                }
                if (procKey.equals(WorkflowConstants.WF_WATERBREAK)){//断水
                    for (Map map:params){
                        if (!map.isEmpty()) {
                            if (map.get("name").toString().equals("jobContent")) {
                                System.out.println("context：" + map.get("value"));
                                if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                    task.setContext(map.get("value").toString());
                            }
                        }
                    }
                }
                if (procKey.equals(WorkflowConstants.WF_VALVEOPERATION)){//阀门操作单
                    for (Map map:params){
                        if (!map.isEmpty()) {
                            //工作内容
                            if (map.get("name").toString().equals("jobContent")) {
                                System.out.println("context：" + map.get("value"));
                                if (null != map.get("value") && !"".equals(map.get("value").toString()))
                                    task.setContext(map.get("value").toString());
                            }
                        }
                    }
                }
                //查询流程当前实例，设置起始时间
                ProcessModel proceInModel=this.queryProcInstanceById(proceId);
               task.setStartTime(proceInModel.getStartTime());
                task.setStartUser(proceInModel.getStartUserId());

            }

            if (null == row.get("processDefinitionUrl") || "".equals(row.get("processDefinitionUrl"))) {
                task.setProcessDefinitionUrl(null);
            } else {
                task.setProcessDefinitionUrl(row.get("processDefinitionUrl").toString());
            }

            if (null == row.get("processInstanceUrl") || "".equals(row.get("processInstanceUrl"))) {
                task.setProcessInstanceUrl(null);
            } else {
                task.setProcessInstanceUrl(row.get("processInstanceUrl").toString());
            }

            if (null == row.get("executionId") || "".equals(row.get("executionId"))) {
                task.setExecutionId(null);
            } else {
                task.setExecutionId(row.get("executionId").toString());
            }

            if (null == row.get("description") || "".equals(row.get("description"))) {
                task.setDescription(null);
            } else {
                task.setDescription(row.get("description").toString());
            }

            if (null == row.get("deleteReason") || "".equals(row.get("deleteReason"))) {
                task.setDeleteReason(null);
            } else {
                task.setDeleteReason(row.get("deleteReason").toString());
            }

            if (null == row.get("owner") || "".equals(row.get("owner"))) {
                task.setOwner(null);
            } else {
                task.setOwner(row.get("owner").toString());
            }
//            if (null == row.get("startTime") || "".equals(row.get("startTime"))) {
//                task.setStartTime(null);
//            } else {
//                task.setStartTime(row.get("startTime").toString());
//            }


            if (null == row.get("durationInMillis") || "".equals(row.get("durationInMillis"))) {
                task.setDurationInMillis(null);
            } else {
                task.setDurationInMillis(row.get("durationInMillis").toString());
            }

            if (null == row.get("workTimeInMillis") || "".equals(row.get("workTimeInMillis"))) {
                task.setWorkTimeInMillis(null);
            } else {
                task.setWorkTimeInMillis(row.get("workTimeInMillis").toString());
            }

            if (null == row.get("claimTime") || "".equals(row.get("claimTime"))) {
                task.setClaimTime(null);
            } else {
                task.setClaimTime(row.get("claimTime").toString());
            }

            if (null == row.get("taskDefinitionKey") || "".equals(row.get("taskDefinitionKey"))) {
                task.setTaskDefinitionKey(null);
            } else {
                task.setTaskDefinitionKey(row.get("taskDefinitionKey").toString());
            }

            if (null == row.get("formKey") || "".equals(row.get("formKey"))) {
                task.setFormKey(null);
            } else {
                task.setFormKey(row.get("formKey").toString());
            }

            if (null == row.get("priority") || "".equals(row.get("priority"))) {
                task.setPriority(null);
            } else {
                task.setPriority(row.get("priority").toString());
            }

            if (null == row.get("dueDate") || "".equals(row.get("dueDate"))) {
                task.setDueDate(null);
            } else {
                task.setDueDate(row.get("dueDate").toString());
            }

            if (null == row.get("parentTaskId") || "".equals(row.get("parentTaskId"))) {
                task.setParentTaskId(null);
            } else {
                task.setParentTaskId(row.get("parentTaskId").toString());
            }

            if (null == row.get("url") || "".equals(row.get("url"))) {
                task.setUrl(null);
            } else {
                task.setUrl(row.get("url").toString());
            }
            list.add(task);
        }
        return list;
    }

    @Override
    public String getProcessDefinitions() {
        String url = WorkflowConstants.REPOSITORY_PROCESS_DEFINITIONS;

        HttpEntity request = new HttpEntity(null, createHttpHeaders());
        ResponseEntity<String> responseEntity = proxy.exchange(url, HttpMethod.GET, request, String.class);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        } else {
            throw new IllegalStateException("HTTP " + responseEntity.getStatusCode() + " Found");
        }
    }

    private HttpHeaders createHttpHeaders() {
        //        Authentication authentication = (Authentication) SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null) {
//            throw new RuntimeException("当前用户未登录！");
//        }
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//        if (userDetails == null) {
//            throw new RuntimeException("当前用户未登录！");
//        }
//        User user = userService.getUserByUserName(userDetails.getUsername());
        User user = loginUserHelper.getCurrentUser();
        if (user == null) {
            throw new RuntimeException("当前用户未登录！");
        }

        HttpHeaders headers = new HttpHeaders();
        String auth = user.getUser_name() + ":" + user.getPassword();
        byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
        String authHeader = "Basic " + new String(encodedAuth);
        headers.set("Authorization", authHeader);
        headers.setContentType(MediaType.valueOf("application/json"));
        headers.set("Charset", "utf-8");
        return headers;
    }

    public ActivitiRESTProxy getProxy() {
        return proxy;
    }

    public void setProxy(ActivitiRESTProxy proxy) {
        this.proxy = proxy;
    }

    public LoginUserHelper getLoginUserHelper() {
        return loginUserHelper;
    }

    public void setLoginUserHelper(LoginUserHelper loginUserHelper) {
        this.loginUserHelper = loginUserHelper;
    }
}
