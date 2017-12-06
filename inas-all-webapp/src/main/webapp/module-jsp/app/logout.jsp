<%@ page import="org.springframework.core.io.Resource" %>
<%@ page import="org.springframework.core.io.ClassPathResource" %>
<%@ page import="java.util.Properties" %>
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %>
<%--
  Created by IntelliJ IDEA.
  User: chai
  Date: 2015/8/13
  Time: 15:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<%
    Resource resource = new ClassPathResource("security.properties");
    Properties props = PropertiesLoaderUtils.loadProperties(resource);
    session.invalidate();
    String host = props.getProperty("cas.protocol");
    String domain = props.getProperty("cas.service.host");//当前域名
    String servermain=props.getProperty("cas.server.host");//cas服务器域名
    String project =  request.getContextPath();
    String projectIn =host + "://" + domain + project;
    response.sendRedirect(host + "://" + servermain + "/cas/logout?jmproject=" + projectIn);
%>
</body>
</html>
