package com.inas.workflow;

public class WorkflowConstants {

    //操作所属类别
    public static final String OP_RUN="OP_RUN";//操作runtime的表
    public static final String OP_HIS="OP_HIS";//操作history的表
    //任务所处状态
    public static final String wf_STARTBYME="startby_me";//完成(由我发起)
    public static final String wf_FINISHED="finished";//完成(由我发起)
    public static final String wf_RUNNING="running";//进行中(由我发起)

    public static final String wf_MINETURN="mine_turn";//待我办理
    public static final String wf_FORMECLAIM="forme_claim";//可由我签收
    public static final String wf_ALL_STATE="all_state";//所有状态
    public static final String wf_MINE_FNISHED="mine_fnished";//由我完成








    public static final String WORKFLOW_URI_START = "/act/start";
//    public static final String hea="";
//    http://username:password@localhost
    public static final String SERVER_PATH="http://localhost:8080/workflow/rest";


    /**
     * 历史相关
     */
    public static final String HIS_PROCESS_INSTANCES="/history/historic-process-instances";
    public static final String HIS_TASK_INSTANCES="/history/historic-task-instances";
    /**
     * 运行相关
     */
    public static final String RUNTIME_TASK="/runtime/tasks";//r
    public static final String RUNTIME_INSTANCES="/runtime/process-instances";//启动流程实例

//    public static final String


    // 所有流程定义
    public static final String REPOSITORY_PROCESS_DEFINITIONS = "/repository/process-definitions";

    // 待签收任务-所有流程
    public static final String RUNTIME_TASKS_ALL_CANDIDATE_USERS = "/runtime/tasks?candidateUser={candidateUser}";
    // 待签收任务-单个流程
    public static final String RUNTIME_TASKS_CANDIDATE_USERS = "/runtime/tasks?candidateUser={candidateUser}&processDefinitionKey={processDefinitionKey}";

    // 待处理任务-所有流程
    public static final String RUNTIME_TASKS_ALL_ASSIGNEE = "/runtime/tasks?assignee={candidateUser}";
    // 待处理任务-单个流程
    public static final String RUNTIME_TASKS_ASSIGNEE = "/runtime/tasks?processDefinitionKey={processDefinitionKey}&assignee={candidateUser}";

    // 流程处理（签收/审批/分配）
    public static final String RUNTIME_TASKS_ACTION = "/runtime/tasks/{taskId}";


    public static final String HISTORY_PROCESSINSTANCE="/history/historic-process-instances/{processInstanceId}";//get

    //用户参与过的任务
    public static final String HISTORY_TASK_INVOLVEDUSER="/history/historic-process-instances?involvedUser={involvedUser}&processDefinitionKey={processDefinitionKey}&size={size}";


    /**
     * 相关表单类型
     */
    public static final String WF_STOPEQUIPMENT="TestStopEquipmentProcess";//停役单
    public static final String WF_FLUSHING="FlushingProcess";//冲洗消毒单
    public static final String WF_WATERBREAK="WaterBreakProcess";//断水申请单
    public static final String WF_VALVEOPERATION="ValveOperationProcess";//阀门操作单



}
