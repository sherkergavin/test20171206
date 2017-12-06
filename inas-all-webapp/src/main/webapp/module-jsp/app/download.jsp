<%@ page import="java.net.URLDecoder" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.io.BufferedInputStream" %>
<%@ page import="org.opensaml.common.binding.decoding.BasicURLComparator" %>
<%@ page import="java.net.URI" %>
<%--
  Created by IntelliJ IDEA.
  User: zs
  Date: 2015/12/7
  Time: 10:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%

  String fileName=request.getParameter("fileName");//文件名
  String filepath=request.getParameter("filepath");//下载地址路径
  String fileTrr=request.getParameter("trrTrue");//后缀

  String decodefilename =URLDecoder.decode(fileName,"UTF-8");//去掉所有空格，否则下载出错
  //String decodefilename = fileName;
  //String downPath =URLDecoder.decode(filepath,"UTF-8");
  String downPath = filepath;


  //设置为下载类型
  response.setContentType("application/x-download");
  //接受输入的文件流
  response.setHeader("Content-Type", "application/octet-stream");
//  response.setCharacterEncoding("UTF-8");
//  response.setHeader("Content-Disposition", "attachment;filename="+new String(decodefilename.getBytes("UTF-8"), "UTF-8"));
//  response.addHeader("Content-Disposition","attachment; filename="+decodefilename+fileTrr);
  response.setHeader("Content-disposition", "attachment;filename=\"" + decodefilename+fileTrr+"\"");
//读写输入流
  java.io.OutputStream outp = null;
  BufferedInputStream in = null;
  try
  {
    outp = response.getOutputStream();
    URL url = new URL(downPath);
    in=new BufferedInputStream(url.openStream());

    byte[] b = new byte[1024];
    int i = 0;

    while((i = in.read(b)) > 0)
    {
      outp.write(b, 0, i);
    }
//
    outp.flush();
//要加以下两句话，否则会报错
//java.lang.IllegalStateException: getOutputStream() has already been called for //this response
    out.clear();
    out = pageContext.pushBody();
  }
  catch(Exception e)
  {
    System.out.println(e.getMessage());
    e.printStackTrace();
  }
  finally
  {
    if(in != null)
    {
      in.close();
      in = null;
    }



//这里不能关闭
if(outp != null)
  {
  outp.close();
  outp = null;
  }
  }




%>
<html>
<head>
    <title></title>
</head>
<body>

</body>
</html>
