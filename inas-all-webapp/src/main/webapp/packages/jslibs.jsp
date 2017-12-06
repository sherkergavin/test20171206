<%@ page import="org.springframework.core.io.Resource" %>
<%@ page import="org.springframework.core.io.ClassPathResource" %>
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %>
<%@ page import="java.util.Properties" %>
<%--
  Created by IntelliJ IDEA.
  User: WangJm
  Date: 2015/4/10
  Time: 16:20
  JS脚本文件导入管理
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
  //读取配置文件属性
  Resource repSource = new ClassPathResource("reportIp.properties");
  Properties reppro = PropertiesLoaderUtils.loadProperties(repSource);

  Resource wfSource = new ClassPathResource("application.properties");
  Properties wfpro = PropertiesLoaderUtils.loadProperties(wfSource);
  String wfRest= wfpro.getProperty("workflow.service.url");
  String wfIp=wfRest.replace("/rest", "");

  Resource ftpSource = new ClassPathResource("ftpInfo.properties");
  Properties ftpPro = PropertiesLoaderUtils.loadProperties(ftpSource);

  String host=request.getHeader("HOST");
%>
<script type="text/javascript">
  //项目根路径GP=GlobalPath
  var projectGP = function(msg){
    return '${ctx}' + msg;
  };

  var projectHOST=function(){
    return '<%=host%>';
  }
  //返回ext-sdk路径GP=GlobalPath
  var extGP = function(msg){
    return '${ext}' + msg;
  };

//读取报表域名
  var reportIp = function(msg){
    return '<%=reppro.getProperty("reportIp")%>'+msg;
  };


  //读取工作流域名
  var wfproIp = function(msg){
    return '<%=wfIp%>'+msg;
  };


  var ftpHttpUrl = function(){
    return '<%=ftpPro.getProperty("ftpInfo.httpUrl")%>';
  };



  //返回 oam webapp 下的images path
  var sxtGP = function (msg) {
    return '${sxt}'+ msg
  }
</script>
<script type="text/javascript" src="${ext}/ext-all.js"></script>
<%--<script type="text/javascript" src="${ext}/ext-all-debug.js"></script>--%>
<script type="text/javascript" src="${ext}/packages/ext-theme-neptune/build/ext-theme-neptune.js"></script>
<script type="text/javascript" src="${ext}/locale/ext-lang-zh_CN.js"></script>
<%--时间控件时分秒添加--%>
<script type="text/javascript" src="${ext}/support/Jm/ux/DateTimeField.js"></script>
<script type="text/javascript" src="${ext}/support/Jm/Constant.js"></script>
<script type="text/javascript" src="${ext}/support/Jm/button/Button.js"></script>
<script type="text/javascript" src="${ext}/support/Jm/MessageBox.js"></script>
<%--特殊类JS--%>
<script type="text/javascript" src="${ext}/examples/shared/examples.js"></script>
<%--窗体缩小自适应--%>
<script type="text/javascript">
  function ActiveTabSize() {
    var main_Tab = Ext.getCmp("center-tabpanel");
    main_Tab.doLayout();
  }
</script>

<%--项目前端MVC导入--%>
<script type="text/javascript" src="${ctx}/module/app.js"></script>

