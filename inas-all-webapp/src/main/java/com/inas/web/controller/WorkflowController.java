package com.inas.web.controller;

import com.inas.model.workflow.SearchWorkflowModel;
import com.inas.model.workflow.TaskModel;
import com.inas.util.DateUtil;
import com.inas.util.JSONUtil;
import com.inas.workflow.WorkflowConstants;
import com.inas.workflow.impl.WorkflowServiceImpl;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RequestMapping("/workflow")
@Controller
public class WorkflowController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private WorkflowServiceImpl workflowService;

    /**
     * 处理传递的匹配查询参数
     *
     * @param request
     * @param procDefKey
     * @param searchEnty
     * @return
     */
    @RequestMapping(value = "getAllTasks", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getAllTasks(HttpServletRequest request, String procDefKey, SearchWorkflowModel searchEnty) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      List<TaskModel> resultList=new ArrayList<>();
        //查询最好先以状态为条件，可避免多次list删除操作
        if (null != searchEnty.getSearch_state() && !"".equals(searchEnty.getSearch_state())
                && !"all_state".equals(searchEnty.getSearch_state())) {
            String searchState = searchEnty.getSearch_state();
            if (searchState.equals(WorkflowConstants.wf_STARTBYME)) {
                //由我发起
                resultList=workflowService.queryStartedByMeTasks(procDefKey);
            }
            if (searchState.equals(WorkflowConstants.wf_MINE_FNISHED)) {
                //由我完成
                resultList=workflowService.queryInvolvedUserTasks(procDefKey);
            }
            if (searchState.equals(WorkflowConstants.wf_FORMECLAIM)){
                //由我签收
                resultList=workflowService.getTasksByCandidateUser(userDetails.getUsername(), procDefKey);
            }
            if (searchState.equals(WorkflowConstants.wf_MINETURN)){
                //待我签收
                resultList=workflowService.queryCurrentMineTasks(procDefKey);
            }
            if (searchState.equals(WorkflowConstants.wf_RUNNING) || searchState.equals(WorkflowConstants.wf_FINISHED)){
                List<TaskModel> hiList=new ArrayList<>();
                List<TaskModel> ruList=new ArrayList<>();
                List<TaskModel> all=workflowService.getAllTasks(procDefKey);
                if (all.size()>0){
                    for (TaskModel tas:all){
                        if (tas.getState().equals(WorkflowConstants.wf_RUNNING))
                            ruList.add(tas);
                        if (tas.getState().equals(WorkflowConstants.wf_FINISHED))
                            hiList.add(tas);
                    }
                }
                if (searchState.equals(WorkflowConstants.wf_RUNNING) && ruList.size()>0)
                    resultList=ruList;
                if (searchState.equals(WorkflowConstants.wf_FINISHED) && hiList.size()>0)
                    resultList=hiList;
            }
            //...
        }else{
            //状态条件为空
            if (null==searchEnty.getSearch_state() || "".equals(searchEnty.getSearch_state())|| "all_state".equals(searchEnty.getSearch_state())) {
                List<TaskModel> reLi = workflowService.getAllTasks(procDefKey);
                resultList=reLi;
            }
        }
        //时间约束
        if (null!=searchEnty.getSearch_start_time() && !"".equals(searchEnty.getSearch_start_time())){
            try {
                Date searchStartTime = DateUtil.parseStringToDate(searchEnty.getSearch_start_time(), DateUtil.FORMAT_DATE);
                Date searchEndTime = DateUtil.parseStringToDate(searchEnty.getSearch_end_time(), DateUtil.FORMAT_DATE);
                List<TaskModel> tempList=new ArrayList();
                for (int i = 0; i < resultList.size(); i++) {
                        TaskModel model = resultList.get(i);
                        if (null != model.getStartTime() && !"".equals(model.getStartTime())) {
                            Date modelStartTime = DateUtil.parseStringToDate(model.getStartTime(), DateUtil.FORMAT_DATE);
                            int flag1 = DateUtil.compareToDate(modelStartTime, searchStartTime);
                            int flag2 = DateUtil.compareToDate(modelStartTime, searchEndTime);
                            if (flag1>-1 &&(flag2==0 || flag2==-1)) {
                                //在查询时间内
                                tempList.add(model);
                            }
                        }
                    }
                resultList=tempList;
            }catch(Exception e){
                return JSONUtil.toExtResultAllJson(false, e.toString(), null);
            }
        }

        //根据unit查询
            if (resultList.size()>0 && null!=searchEnty.getSearch_unit() && !"".equals(searchEnty.getSearch_unit()) && !"0".equals(searchEnty.getSearch_unit())){
                String searchUnit=searchEnty.getSearch_unit();
                List<TaskModel> unitList=new ArrayList();
                for (TaskModel tk:resultList){
                    if (null!=tk.getFillUnit() && tk.getFillUnit().equals(searchUnit)){
                        //满足条件
                        unitList.add(tk);
                    }
                }
                resultList=unitList;
            }
            //根据概述的关键字查询
            if (resultList.size()>0 && null!=searchEnty.getSearch_Context() && !"".equals(searchEnty.getSearch_Context())){
                String conLike=searchEnty.getSearch_Context();
                List<TaskModel> likeList=new ArrayList();
                for (TaskModel tk:resultList){
                    if (null!=tk.getContext()){
                        //模糊匹配
                        if (tk.getContext().contains(conLike))
                        //满足条件
                            likeList.add(tk);
                    }
                }
                resultList=likeList;
            }

        return JSONUtil.toExtResultAllJson(true, null, resultList);
}


    @RequestMapping(value = "/startProcessByKey", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String startProcessByKey(HttpServletRequest request) {
        String procDefKey = request.getParameter("procDefKey");
        System.out.println("procDefKey===" + procDefKey);
        String state = workflowService.startProcess(procDefKey, request);
        if ("201".equals(state))
            return JSONUtil.toExtFormJson(true, null);
        if ("".equals(state))
            return JSONUtil.toExtFormJson(false, "找不到流程定义");
        return null;
    }

    @RequestMapping(value = "/tempstartProcessByKey", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String tempstartProcessByKey(HttpServletRequest request) {
        String procDefKey = request.getParameter("procDefKey");
        System.out.println("procDefKey===" + procDefKey);
        String state = workflowService.startProcess(procDefKey, request);
        if ("201".equals(state))
            return JSONUtil.toExtFormJson(true, null);
        if ("".equals(state))
            return JSONUtil.toExtFormJson(false, "找不到流程定义");
        return null;
    }

    /**
     * 完成任务，
     * 审批通过或者驳回申请
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/completeTask", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String completeTask(HttpServletRequest request) {
        String taskId = request.getParameter("taskId");
        String compState = workflowService.completeTask(taskId, request);
        if ("200".equals(compState) || "204".equals(compState)) {
            return JSONUtil.toExtFormJson(true, null);
        }
        if ("400".equals(compState)) {
            return JSONUtil.toExtFormJson(true, "该请求操作不合法！");
        }
        if ("404".equals(compState)) {
            return JSONUtil.toExtFormJson(false, "找不到该任务！");
        }
        if ("409".equals(compState)) {
            return JSONUtil.toExtFormJson(false, "任务正在被操作,请稍后...");
        }
        return null;

    }


    /**
     * 完成任务，
     * 审批通过或者驳回申请
     *
     * @param request
     * @return
     */
    //(为适用于extjs的表单提交)
    @RequestMapping(value = "/completeExtTask", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String completeExtTask(HttpServletRequest request) {
        String taskId = request.getParameter("taskId");
        String compState = workflowService.completeTask(taskId, request);
        if ("200".equals(compState) || "204".equals(compState)) {
            return JSONUtil.toExtFormJson(true, null);
        }
        if ("400".equals(compState)) {
            return JSONUtil.toExtFormJson(true, "该请求操作不合法！");
        }
        if ("404".equals(compState)) {
            return JSONUtil.toExtFormJson(false, "找不到该任务！");
        }
        if ("409".equals(compState)) {
            return JSONUtil.toExtFormJson(false, "任务正在被操作,请稍后...");
        }
        return null;

    }


    //符合反软表显示的result
    @RequestMapping(value = "/getHistoryVariables", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getHistoryVariables(HttpServletRequest request, String processInstanceId) {
        List variablesList = workflowService.getHistoryVariables(processInstanceId);
        String urlParams = "";
        for (int i = 0; i < variablesList.size(); i++) {
            Map map = (Map) variablesList.get(i);
            String name = map.get("name").toString();
            String value = "";
            if (null != map.get("value")) {
                value = map.get("value").toString();
            }
            try {
                urlParams = urlParams + "&" + name + "=" + java.net.URLEncoder.encode(java.net.URLEncoder.encode(value, "utf-8"),"utf-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.println("coe=="+urlParams);
        return urlParams;
    }


    //返回符合extjs表单的result
    @RequestMapping(value = "/getExtHistoryVariables", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getExtHistoryVariables(HttpServletRequest request, String processInstanceId) {
        List variablesList = workflowService.getHistoryVariables(processInstanceId);
        List list = new ArrayList();
        Map itemMap = new HashMap();
        for (int i = 0; i < variablesList.size(); i++) {
            Map map = (Map) variablesList.get(i);
            String name = map.get("name").toString();
            String value = "";
            if (null != map.get("value")) {
                value = map.get("value").toString();
            }
            itemMap.put(name, value);
        }
        return JSONUtil.toExtFormJson(true, null, itemMap);
    }


    @RequestMapping(value = "/claimTask", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String claimTask(HttpServletRequest request, String taskId, String op) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String claimState = workflowService.claimTask(taskId, userDetails.getUsername());
        if ("200".equals(claimState)) {
            return JSONUtil.toExtFormJson(true, null);
        }
        if ("400".equals(claimState)) {
            return JSONUtil.toExtFormJson(true, "该请求操作不合法！");
        }
        if ("404".equals(claimState)) {
            return JSONUtil.toExtFormJson(false, "找不到该任务！");
        }
        if ("409".equals(claimState)) {
            return JSONUtil.toExtFormJson(false, "任务正在被操作,请稍后...");
        }
        return null;
    }


//    @RequestMapping(params = "form", produces = "text/html")
//    public String createForm(Model uiModel) {
//        uiModel.addAttribute("workflow", new TaskEntity());
//        return "workflow/create";
//    }

    @RequestMapping(value = "/getProcessDefinitions", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getProcessDefinitions() {
        String result = workflowService.getProcessDefinitions();
        return result;
    }

    @RequestMapping(value = "/getCurrentMineTasks", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getCurrentMineTasks() {
        logger.info("begin getCurrentMineTasks...");
        JSONObject json=new JSONObject();
        JSONArray jsonMembers = new JSONArray();
        JSONObject member1 = new JSONObject();
        JSONObject member2 = new JSONObject();
        JSONObject member3 = new JSONObject();
        JSONObject member4 = new JSONObject();
        int VOProcess=workflowService.queryCurrentMineTasks("ValveOperationProcess").size();
        int FProcess=workflowService.queryCurrentMineTasks("FlushingProcess").size();
        int WProcess=workflowService.queryCurrentMineTasks("WaterBreakProcess").size();
        int TEProcess=workflowService.queryCurrentMineTasks("TestStopEquipmentProcess").size();
        if( VOProcess != 0 ){
            member1.put("names","阀门操作单");
            member1.put("text", VOProcess);
            jsonMembers.put(member1);
        }
        if(FProcess != 0 ){
            member2.put("names","冲洗消毒单");
            member2.put("text", FProcess);
            jsonMembers.put(member2);
        }
        if(WProcess != 0 ){
            member3.put("names","断水申请单");
            member3.put("text",WProcess);
            jsonMembers.put(member3);
        }
        if(TEProcess != 0 ){
            member4.put("names","设备停役单");
            member4.put("text", TEProcess);
            jsonMembers.put(member4);
        }
        json.put("root",jsonMembers);
        logger.info("end getCurrentMineTasks...");
        return json.toString();
    }


    /**
     * 查询所有由我发起的未结束流程实例
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "getStartedByMeProcessInstances", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getStartedByMeTasks(HttpServletRequest request) {
        List<TaskModel> resultList =  workflowService.queryStartedByMeTasks();
        int a = 0;
        for(TaskModel taskModel : resultList){
            if ( a == 0) {
                taskModel.setName("泰和水厂设备停役单");
            }else if (a == 1){
                taskModel.setName("供水公司断水申请单");
            }
            a++;
        }
        return JSONUtil.toExtResultAllJson(true, null, resultList);
    }

    /**
     * 查询所有待我签收的任务
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "getMyTask", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getMyTask(HttpServletRequest request) {
        List<TaskModel> resultList=workflowService.queryCurrentMineTasks();
        int a = 0;
        for(TaskModel taskModel : resultList){
            if ( a == 0) {
                taskModel.setName("泰和水厂设备停役单");
            }else if (a == 1){
                taskModel.setName("供水公司断水申请单");
            }
            a++;
        }
        return JSONUtil.toExtResultAllJson(true, null, resultList);
    }

    /**
     * 查询所有正在执行的调度指令
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "getExecutingScheduleForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getExecutingScheduleForm(HttpServletRequest request) {
        List<TaskModel> resultList=workflowService.getExecutingScheduleForm();
        return JSONUtil.toExtResultAllJson(true, null, resultList);
    }


    /**
     * 查询所有正在计划的调度指令
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "getPlanningScheduleForm", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getPlanningScheduleForm(HttpServletRequest request) {
        List<TaskModel> resultList=workflowService.getPlanningScheduleForm();
        return JSONUtil.toExtResultAllJson(true, null, resultList);
    }


}
