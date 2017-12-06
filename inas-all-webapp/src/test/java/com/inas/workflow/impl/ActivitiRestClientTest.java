package com.inas.workflow.impl;

import com.inas.model.system.User;
import com.inas.util.JSONUtil;
import com.inas.workflow.WorkflowConstants;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.ssl.Base64;
import org.junit.Assert;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.*;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext-test.xml"})
public class ActivitiRestClientTest {
    @Autowired
    RestTemplate restTemplate;

    HttpHeaders headers;

    @Before
    public void setUp() throws Exception {
        headers = new HttpHeaders();
//        String auth = "admin" + ":" + "admin";
        String auth = "zhangsan" + ":" + "111111";
        byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
        String authHeader = "Basic " + new String(encodedAuth);
        headers.set("Authorization", authHeader);
        headers.setContentType(MediaType.valueOf("application/json"));
        headers.set("Charset", "utf-8");
    }

    private Map<String, Object> getFormParamMap(Map paramters) {
        List<Object> variables = new ArrayList<>();
        Iterator iter = paramters.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry entry = (Map.Entry) iter.next();
            Map<String, Object> variable = new HashMap<>();
            variable.put("name", entry.getKey());
            variable.put("value", entry.getValue());
            variables.add(variable);
        }
        Map<String, Object> processMap = new HashMap<>();
        processMap.put("variables", variables);
        return processMap;
    }

    public String startProcess(String procDefKey, Map<String, String> parameters) {
        Map<String, Object> fmParamMap = this.getFormParamMap(parameters);
        String url = "http://localhost:8180/workflow/rest" + "/runtime/process-instances";
        fmParamMap.put("processDefinitionKey", procDefKey);
        String headParamsJson = net.sf.json.JSONObject.fromObject(fmParamMap).toString();
        System.out.println("startJson======" + headParamsJson);
        HttpEntity request = new HttpEntity(headParamsJson, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
        return responseEntity.getBody();
    }


    /**
     * 断水申请单提交接口
     *
     * @param jobId                 工程编号
     * @param constructUnit         施工单位
     * @param preparer              填表人
     * @param jobSection            工程路段
     * @param filingDate            申请实施时间
     * @param licenceDate           批准实施时间
     * @param jobContent            实施内容
     * @param ProjectManager        项目经理
     * @param ManagerPhone          经理电话
     * @param affiliationArea       所属区域
     * @param scenePrincipal        现场负责人
     * @param PrincipalPhone        现场负责人电话
     * @param ManagementWaterSupply 所属供水管理所
     * @param sketchMapImg          断水、并网示意图
     * @param projectId             工程管理部（签章）编号
     * @param supervisorId          监理单位（签章）编号
     * @param waterBusinessId       供水业务管理部（签章）编号
     * @param partyDispatchId       集团运管中心：调度（签章）编号
     *                              water_isQuality 		水质合格
     *                              Measure_isArriving 	措施到位
     *                              sketching_isComplete	草图编制完成
     *                              material _isComplete 	资料完成
     *                              operationDring_isComplete 操作单编制完成
     *                              substation_isAffirm     分所确认
     * @return
     */
    @Test
    public void testStartWaterbreakProcess() throws Exception {
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("jobId", "000003");                          //工程编号
        params.put("constructUnit", "上海自来水总厂1");             //施工单位
        params.put("preparer", "王立德1");                      //填表人
        params.put("jobSection", "D345-09");                 //工程路段
        params.put("filingDate", "2015-10-30");             //申请实施时间
        params.put("licenceDate", "");                      //批准实施时间
        params.put("jobContent", "泵站季度检修");      //实施内容
        params.put("ProjectManager", "张得力");           //项目经理
        params.put("ManagerPhone", "15862359874");            //		    经理电话
        params.put("affiliationArea", "浦东西区1002");            //	    所属区域
        params.put("scenePrincipal", "余青");            //          现场负责人
        params.put("PrincipalPhone", "15836925565");            //          现场负责人电话
        params.put("ManagementWaterSupply", "新区7段总水局");            //   所属供水管理所
        params.put("sketchMapImg", "0");            //                         断水、并网示意图
        params.put("projectId", "张文丽");            //			     工程管理部（签章）编号
        params.put("supervisorId", "庹琴");            //           监理单位（签章）编号
        params.put("waterBusinessId", "周列");            // 供水业务管理部（签章）编号
//        params.put("partyDispatchId", "秦兴中");            // 集团运管中心：调度（签章）编号
        params.put("water_isQuality", "true");        //水质合格
        params.put("Measure_isArriving", "false");    //措施到位
        params.put("sketching_isComplete", "true");    //草图编制完成
        params.put("material _isComplete", "false");    //资料完成
        params.put("operationDring_isComplete", "false"); //操作单编制完成
        params.put("substation_isAffirm", "true");     //分所确认
        String result = startProcess("process", params);
        System.out.println("rsult==" + result);
        System.out.println("========");
    }


    /**
     * 启动阀门操作单流程
     *
     * @throws Exception
     */
    @Test
    public void testStartValveOperationProcess() throws Exception {
        HashMap<String, String> params = new HashMap<String, String>();
        //加入的字段
//        fillUnit			填报单位
//        来电情况：
//        beforeJob			操作前来电
//        afterJob			操作后来电
//        beforeFinish		完成工作内容前来电
//        afterFinish			完成操作内容后来电
        params.put("filingDate", "2015-11-20");//		申请实施时间
        params.put("place", "上海芦家桥段");//				地点
        params.put("jobContent", "水质检验");//			工作内容
        params.put("code", "2015112500001");//			编号

        params.put("fillUnit", "闵行供水管理所");
        params.put("beforeJob", "true");
        params.put("afterJob", "false");
        params.put("beforeFinish", "false");
        params.put("afterFinish", "false");

        //阀门编号、口径
        params.put("valve_1", "1");//				阀门编号
        params.put("caliber_1", "500");//			口径
        params.put("scheduled_close_time_1", "23:00");//	     	预定关闭时间
        params.put("actual_close_time_1", "23:30");//			  	实际关闭时间
        params.put("scheduled_open_time_1", "1:00");//	      	预定开启时间
        params.put("actual_open_time_1", "1:00");//			  	实际开启时间
        params.put("revolution_1", "30");//				  	转数
        params.put("opening_direction_1", "顺");//			  	开启方向


        params.put("valve_2", "1");//				阀门编号
        params.put("caliber_2", "150");//			口径
        params.put("scheduled_close_time_2", "23:00");//	     	预定关闭时间
        params.put("actual_close_time_2", "");//			  	实际关闭时间
        params.put("scheduled_open_time_2", "关闭");//	      	预定开启时间
        params.put("actual_open_time_2", "");//			  	实际开启时间
        params.put("revolution_2", "新");//				  	转数
        params.put("opening_direction_2", "顺");//			  	开启方向


        //操作前做何项准备工作:
        params.put("valveChecked", "true");//			校验阀门
        params.put("productionMeeting", "true");//		开生产会议
        params.put("factoryMeeting", "true");//			开有关厂所会议
        params.put("noticeImportantUser", "true");//		通知重要客户
        params.put("contactWater", "true");//			联系水厂
        params.put("notifyWorkshop", "true");//			通知所属有关车间
        params.put("notifyFire", "false");//				通知消防处
        params.put("needAdvertised", "false");//			需要登报

        params.put("coverage", "芦家桥居民区");//						估计断水、降压影响范围

        //    操作后情：
        params.put("normal", "true");//			完全正常
        params.put("gateLeakage", "false");//		闸门漏水
        params.put("gateBroken", "false");//		闸门铜梗折断
        params.put("cloudy_Water", "true");//		水质浑浊
        params.put("waterDown", "true");//			水压低
        params.put("notnotifyAffect", "false");//		未通知工业用户影响生产

        params.put("constructTeam", "水务建设");//			施工队
        params.put("informedUsers", "卢湾居民");//			通知用户
        params.put("valveTeam", "1组");//				阀门操作队
        params.put("sketchingImg", "000.png");//			草图

        params.put("directorOfficeId", "詹飒");//		所长室
        params.put("WebsiteManagementId", "李斯");//		官网管理科
        params.put("operationsManagerId", "余力");//		操作负责人
        params.put("listerId", "王梅");//	制表人

        params.put("waterBusinessId", "李跃群");//		供水业务管理部
        params.put("generalManagerId", "常丽云");//		总经理
//        params.put("dispatchingId", "冯一奇");//			调度运营室
        params.put("isMonitoringCenter", "false");//		局调度监测中心chingImg		草图

        String result = startProcess("ValveOperationProcess", params);
        System.out.println("rsult==" + result);
        System.out.println("========");
    }


    /**
     * 冲洗消毒申请单
     *
     * @throws Exception
     */
    @Test
    public void testStartFlushingProcess() throws Exception {
        HashMap<String, String> params = new HashMap<String, String>();

        //冲洗消毒申请单
        params.put("jobId", "杨浦0021");                    //工程编号
        params.put("constructUnit","杨树浦水厂");           	//施工单位
        params.put("preparer", "张钰琪");                    //				    填表人

        params.put("jobSection","杨树浦路上清路34-78d段");//			    工程路段
        params.put("filingDate","2015-09-11");//				    申请实施时间

        params.put("jobContent","出水总管清理消毒");//				    实施内容
        params.put("licenceDate","");//				批准实施时间

        params.put("ProjectManager","张鹏飞");//			    项目经理
        params.put("ManagerPhone","1593255220");//				经理电话
        params.put("ManagementWaterSupply","杨树浦水管所");//	   所属供水管理所

        params.put("scenePrincipal","龚商祺");//	          现场负责人
        params.put("PrincipalPhone","13822388957");//	          现场负责人电话
        params.put("flushingAmount","1200");//				 冲水量

        params.put("flushCalibre","40");//	 			冲水水源口径
        params.put("drainCalibre ","45");//				排放口口径
        params.put("sewersCalibre","30");//				下水道口径

        params.put("addDose ","4000");//					加药总量
        params.put("addDuration","2小时");//				加药时长

//        冲洗消毒前开展情况：
        params.put("isMonthPlan","true");//				列入当月计划
        params.put("schemeIsUploaded","true");//			方案上传完成
        params.put("isInstalled","false");//	 			测流测压点安装完成

//        冲洗消毒情况：
//        （浊度）
        params.put("turDate","2015-11-11");//	 				日期
        params.put("turTime	","3");//				时段
        params.put("turFlow","200");//	 				流量
        params.put("turHydraulic","400");//	  			压力

//        （加氯）
        params.put("addChloDate","2015-11-20");//	  			日期
        params.put("addChloTime","4");//	  			时段
        params.put("addChloFlow","211");//	  			流量
        params.put("addChloHydraulic","100");//	  		压力

//        （冲氯）
        params.put("flushChloDate","2015-11-11");//				日期
        params.put("flushChloTime","2");//				日期时段
        params.put("flushChloFlow","80");//				日期流量
        params.put("flushChloHydraulic","23");//			日期压力


//        水质采样：
//        （浊度）
        params.put("turSampleDate","2015-11-12");//				日期
        params.put("turSampleTime","2");//				时段
        params.put("turSampleSpot","杨树浦1管所");//	 			采样地点

//        （取样）
        params.put("sampleDate","2015-11-12");//					日期
        params.put("sampleTime","2");//					时段
        params.put("sampleSpot","杨树浦水管总所");//					采样地点

        params.put("constructUnitId","上海水务建设");//		 			//施工单位
        params.put("partyDispatchId","张丽");//		 			//集团运管中心：调度（签章）编号
        params.put("waterQualityId","王运德");//		 			//集团运管中心：水质科（签章）编号

        params.put("waterBusinessId","成立元");//	  			//供水业务管理部（签章）编号
        params.put("projectId","李勤国");//			 			//工程管理部（签章）编号
        params.put("supervisorId","胡元义");//	     			//监理单位（签章）编号

        params.put("sketchMapImg","0.png");//		 			//示意图

        String result = startProcess("FlushingProcess", params);
        System.out.println("rsult==" + result);
        System.out.println("========");

        params.put("", "");
    }


@Test
public void testStartStopEquipment(){
    HashMap<String, String> params = new HashMap<String, String>();
    params.put("filingDate","2015-12-09");
    params.put("fillUnit","上海城市建设");
    params.put("WorkStarTime","2015-09-09");
    params.put("WorkOverTime","2016-08-30");
    params.put("maintenanceItem","下水管道排污阀检修");
    params.put("stopDevices","虹口管道1片区");
    params.put("code","SheBeiTingYi2015-12");
    String result=startProcess("StopEquipmentProcess",params);
    System.out.println("stopEquipment:"+result);

}








    @Test
    public void testActivitiRestClient() throws Exception {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:8080/activiti-rest/service/runtime/tasks", HttpMethod.GET, request, String.class);
        String result = response.getBody();
        Assert.assertEquals("{\"data\":[],\"total\":0,\"start\":0,\"sort\":\"id\",\"order\":\"asc\",\"size\":0}", result);
    }

    @Test
    public void testQueryHiTaskByProcId() {

        String url = WorkflowConstants.SERVER_PATH + "/repository/process-definitions/{processDefinitionId}";
        Map params = new HashMap();
        params.put("processDefinitionId", "test1:1:7566");
        HttpEntity request = new HttpEntity(null, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class, params);
        String result = response.getBody();
        System.out.println(">>>>>>>>>>>>");
        System.out.println(result);
        System.out.println("<<<<<<<<<<<<");
    }


    @Test
    public void testCompleteTask() throws Exception {
//        POST runtime/tasks/{taskId}

        String jsonParams = " {\n" +
                "            \"action\" : \"complete\"\n" +
                "        }";


        String url = WorkflowConstants.SERVER_PATH + "/runtime/tasks/{taskId}";
        Map params = new HashMap();
        params.put("taskId", "30");
        HttpEntity request = new HttpEntity(jsonParams, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class, params);
        System.out.println("complete=====" + response.getBody());

    }


    private List jsonConvertToList(String jsonResult) {
        JSONObject jsonObject = new JSONObject(jsonResult);
        JSONArray jsonArray = jsonObject.getJSONArray("data");
        String jsonStr = jsonArray.toString();
        List jsonList = JSONUtil.fromJson(jsonStr, ArrayList.class);
        return jsonList;
    }

    @Test
    public void testGetVariables() throws Exception {
        String url = WorkflowConstants.SERVER_PATH + "/history/historic-variable-instances?processInstanceId={processInstanceId}";
        Map params = new HashMap();
        params.put("processInstanceId", "2510");
        HttpEntity request = new HttpEntity(null, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, request, String.class, params);
        String result = responseEntity.getBody();
        //将json转为List
        List jsonList = this.jsonConvertToList(result);
        Map resultMap = new HashMap();
        for (int i = 0; i < jsonList.size(); i++) {
            Map map = (Map) jsonList.get(i);
            Map mapSon = (Map) map.get("variable");
            resultMap.put(mapSon.get("name"), mapSon.get("value"));
        }
        String printJson = net.sf.json.JSONObject.fromObject(resultMap).toString();
        System.out.println("result===" + result + "printJson======" + printJson);
    }


    @Test
    public void testAllMyTaskList() throws Exception {
        HttpEntity request = new HttpEntity<>(null, headers);
        //待我审批的任务
        String url1 = WorkflowConstants.SERVER_PATH + WorkflowConstants.RUNTIME_TASK
                + "?processDefinitionKey={processDefinitionKey}&assignee={assignee}";
        Map params = new HashMap();
        params.put("assignee", "admin");
        params.put("processDefinitionKey", "leave");
        ResponseEntity<String> responseEntity = restTemplate.exchange(url1, HttpMethod.GET, request, String.class, params);
        String result = responseEntity.getBody();
        System.out.println("待我审批的任务======" + result);
    }


    @Test
    public void testStartedByMeTaskList() throws Exception {
        //查询所有由我发起的任务
//        GET history/historic-process-instances
//        startedBy

        HttpEntity request = new HttpEntity<>(null, headers);
        String url1 = WorkflowConstants.SERVER_PATH + WorkflowConstants.HIS_PROCESS_INSTANCES
                + "?startedBy={startedBy}&processDefinitionKey={processDefinitionKey}";
        Map params = new HashMap();
        System.out.println("utl=======" + url1);
        params.put("startedBy", "admin");
        params.put("processDefinitionKey", "leave");
        ResponseEntity<String> responseEntity = restTemplate.exchange(url1, HttpMethod.GET, request, String.class, params);
        String result = responseEntity.getBody();
        System.out.println("由我发起的任务======" + result);

    }


//    @Test
//    public void testAboutMeTaskList()throws  Exception{
//        //查询所有有我参与的任务列表
////        GET runtime/tasks
////        involvedUser
////        processDefinitionKey
//        HttpEntity request = new HttpEntity<>(null, headers);
//        //待我审批的任务
//        String url1=WorkflowConstants.SERVER_PATH+WorkflowConstants.HIS_PROCESS_INSTANCES
//                +"?involvedUser={involvedUser}&processDefinitionKey={processDefinitionKey}";
//        Map params=new HashMap();
//        params.put("involvedUser","admin");
//        params.put("processDefinitionKey","leave");
//        ResponseEntity<String> responseEntity=restTemplate.exchange(url1, HttpMethod.GET, request, String.class, params);
//        String result= responseEntity.getBody();
//        System.out.println("查询所有有我参与的任务列表======"+result);
//    }


    public void testImg() {
        HttpEntity request = new HttpEntity<>(null, headers);
        String url1 = WorkflowConstants.SERVER_PATH + "/runtime/process-instance/{processInstanceId}/diagram";
        Map params = new HashMap();
        params.put("processInstanceId", "87511");
        ResponseEntity<InputStream> responseEntity = restTemplate.exchange(url1, HttpMethod.GET, request, InputStream.class, params);
        InputStream imageStream = responseEntity.getBody();
        byte[] b = new byte[1024];
        int len = 0;
        try {
            while ((len = imageStream.read(b, 0, 1024)) != -1) {
//                response.getOutputStream().write(b, 0, len); }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}