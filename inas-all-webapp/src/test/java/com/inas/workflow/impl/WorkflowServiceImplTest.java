package com.inas.workflow.impl;

import com.inas.model.system.User;
import com.inas.workflow.LoginUserHelper;
import com.inas.workflow.WorkflowService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext-test.xml"})
public class WorkflowServiceImplTest {
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    WorkflowService workflowService;

    @Autowired
    LoginUserHelper loginUserHelper;

    @Test
    public void testGetProcessDefinitions() throws Exception {
        User user = new User();
        user.setUser_name("admin");
        user.setPassword("admin");
        loginUserHelper.setCurrentUser(user);
        String definitions = workflowService.getProcessDefinitions();
        assertNotNull(definitions);
    }
}