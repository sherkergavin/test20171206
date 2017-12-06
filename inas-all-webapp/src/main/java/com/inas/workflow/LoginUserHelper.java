package com.inas.workflow;

import com.inas.model.system.User;
import com.inas.service.system.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockServletContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.RequestContextListener;

import javax.servlet.ServletRequestEvent;

@Service("loginUserHelper")
public class LoginUserHelper {

    @Autowired
    private UserService userService;

    public User getCurrentUser() {
        User user = (User) RequestContextHolder.getRequestAttributes().getAttribute("LOGIN_USER", RequestAttributes.SCOPE_SESSION);
        if (user == null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            user = userService.getUserByUserName(userDetails.getUsername());
        }
        return user;
    }

    /**
     * 用于模拟http request测试
     * @param user
     */
    public void setCurrentUser(User user) {
        final RequestContextListener listener = new RequestContextListener();
        final MockServletContext context = new MockServletContext();
        final MockHttpServletRequest request = new MockHttpServletRequest(context);
        listener.requestInitialized(new ServletRequestEvent(context, request));
        RequestContextHolder.getRequestAttributes().setAttribute("LOGIN_USER", user, RequestAttributes.SCOPE_SESSION);
    }

}
