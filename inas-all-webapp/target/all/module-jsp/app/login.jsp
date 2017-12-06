<!DOCTYPE html>
<html lang="en">
<head>
    <%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录</title>
    <link rel="stylesheet" type="text/css" href="../../css/style.css" />
    <script src="../../js/modernizr.custom.63321.js"></script>
    <!--[if lte IE 7]><style>.main{display:none;} .support-note .note-ie{display:block;}</style><![endif]-->
    <style>

        body {
            background: #7f9b4e url(../../images/water.jpg) no-repeat center top;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            background-size: cover;
        }
        .container > header h1,
        .container > header h2 {
            color: #fff;
            text-shadow: 0 1px 1px rgba(0,0,0,0.7);
        }
    </style>
</head>
<body>
<div class="container">


    <header>

        <h1>监管平台</h1>

    </header>

    <section class="main">
        <form class="form-4">

            <p>
                <label for="username"><spring:message code="screen.welcome.label.netid" /></label>
                <input type="text" id="username" name="username" placeholder="用户名"
                       value="${sessionScope.openIdLocalId}" required />
                <%--<label for="login">Username or email</label>--%>
                <%--<input type="text" name="login" placeholder="用户名" required>--%>
            </p>
            <p>
                <label for="password"><spring:message code="screen.welcome.label.password" /></label>
                <spring:message code="screen.welcome.label.password.accesskey" var="passwordAccessKey" />
                <form:password cssClass="required" cssErrorClass="error" id="password" size="25" tabindex="2"
                               path="password"  accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off" />
                <input type="password" id="password" name='password' placeholder="密码" required>
            </p>

            <p>
                <input type="submit" name="submit" value="登陆">
            </p>
        </form>​
    </section>

</div>
</body>
</html>