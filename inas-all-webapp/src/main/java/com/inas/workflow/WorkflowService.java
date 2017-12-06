package com.inas.workflow;

import com.inas.model.workflow.ProcessModel;
import com.inas.model.workflow.TaskModel;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
public interface WorkflowService {

    /**
     * 查询所有当前用户的所有任务
     * @param procDefKey
     * @return
     */
    public List<TaskModel> getAllTasks(String procDefKey);

    /**
     * 待我办理的所有任务
     * @param prcessDefKey
     * @return
     */
    public List<TaskModel> queryCurrentMineTasks(String prcessDefKey);

    /**
     * 待我办理的所有任务
     * @param //prcessDefKey
     * @return
     */
    public List<TaskModel> queryCurrentMineTasks();

    /**
     * 由我发起的所有任务
     * @param processDefKey
     * @return
     */
    public List<TaskModel> queryStartedByMeTasks(String processDefKey);

    /**
     * 由我发起的未完成审批的流程
     * @param //processDefKey
     * @return
     */
    public List<TaskModel> queryStartedByMeTasks();

    public List<TaskModel> queryInvolvedUserTasks(String processDefKey);



    /**
     * 根据procId查询正在运行的任务
     * @param procId
     * @param procKey
     * @return
     */
    public List<TaskModel> queryRunningTaskByProcId(String procId,String OPState,String procKey);

    /**
     * 根据流程Id查找流程信息
     * @param id
     * @return
     */
    public ProcessModel queryProcInstanceById(String id);



//    /**
//     * 根据流程实例id查询所有流程相关的任务
//     * ACT_HI_TASKINST,以完成+运行中
//     * @param procId
//     * @return
//     */
//    public List<TaskModel> queryAllTasksByProcId(String procId);


    /**
     * 启动流程
     * @param procDefKey
     * @return
     */
    String startProcess(String procDefKey,HttpServletRequest fmRequest);

    /**
     * 完成任务
     * @param taskId
     * @param //op(审批通过/驳回)
     * @param //rejectReason（驳回理由）
     * @return
     */
    String completeTask(String taskId,HttpServletRequest request);

    /**
     * 领取任务
     * @param taskId
     * @return
     */
    String claimTask(String taskId,String userId);


    /**
     * 获取任务的变量
     * @param taskId
     * @param scope 
     * @return
     */
    String getRunTaskVariables(String taskId,boolean scope);


    /**
     * 获取完成填报后的数据
     * @param processInstanceId
     * @return List
     */
    public List getHistoryVariables(String processInstanceId);


    /**
     * 可以被指定用户领取的任务列
     * 包含将用户设置为直接候选人和用户作为候选群组一员的情况
     * @param candidateUser
     * @param processDefKey
     * @return
     */
    List<TaskModel> getTasksByCandidateUser(String candidateUser, String processDefKey);

    /**
     * 获取所有部署的流程定义
     * @return
     */
    String getProcessDefinitions();

    /**
     * 查询所有正在执行的调度指令
     */
    public List<TaskModel> getExecutingScheduleForm();

    /**
     * 查询所有正在计划的调度指令
     */
    public List<TaskModel> getPlanningScheduleForm();


}



