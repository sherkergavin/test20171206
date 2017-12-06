package com.inas.web.aspect;

import com.inas.model.util.Model;
import com.inas.model.work.DailyItemVO;
import com.inas.util.DateUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;

/**
 * Created by WangJm on 2015/9/11.
 */

@Controller
@Aspect
public class AspetController {
    private Logger logger = LoggerFactory.getLogger(AspetController.class);

    @Pointcut("execution(* com.inas.web.*controller.*Controller*.*(..))")
    public void pointCut() {
    }

    @After("pointCut()")
    public void after(JoinPoint joinPoint) {
    }

    @Before("pointCut()")
    public void before(JoinPoint joinPoint) throws ClassNotFoundException, NoSuchFieldException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Object[] args = joinPoint.getArgs();
        Signature signature = joinPoint.getSignature();
        String methods = signature.getName();
        if(methods.length() > 5){
            String AddOrUdp = methods.substring(0,3);
            String InsertOrUpdate = methods.substring(0,6);
            String Save = methods.substring(0,4);
            if(AddOrUdp.equals("add") || AddOrUdp.equals("udp")||InsertOrUpdate.equals("insert") || InsertOrUpdate.equals("update")||Save.equals("save")){
                Method method = null;
                for (int i = 0; i < args.length; i++) {
                    Class classTemp = args[i].getClass();
                    if (Model.class.isAssignableFrom(classTemp)) {
                        method = classTemp.getMethod("setCreator", String.class);
                        method.invoke(args[i], userDetails.getUsername());
                        method = classTemp.getMethod("setEditor", String.class);
                        method.invoke(args[i], userDetails.getUsername());
                        method = classTemp.getMethod("setEdit_date", Date.class);
                        method.invoke(args[i], DateUtil.getDate());
                        method = classTemp.getMethod("setCreate_date", Date.class);
                        method.invoke(args[i], DateUtil.getDate());
                    }
                }
            }
        }
    }

    @AfterReturning(pointcut = "pointCut()", returning = "returnVal")
    public void afterReturning(JoinPoint joinPoint, Object returnVal) {
    }

    @Around("pointCut()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        Signature signature = pjp.getSignature();
        logger.info("类名：" + signature.getDeclaringTypeName());
        logger.info("方法名：" + signature.getName());
        Object[] args = pjp.getArgs();
        Object returnValue = pjp.proceed(args);
        return returnValue;
    }
}
