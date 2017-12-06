package com.inas.workflow;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Created by pdai on 2015/12/2.
 */
public class ActivitiRESTProxy {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private String actRestServiceURI;
    private RestTemplate restTemplate;

    public <T> ResponseEntity<T> exchange(String url, HttpMethod method, HttpEntity<?> requestEntity, Class<T> responseType, Object... uriVariables) {
        if (StringUtils.isBlank(url)) {
            throw new NullPointerException("URL不能为空！");
        }

        String actURL = actRestServiceURI + url;

        logger.debug("Http URL: {}", actURL);
        logger.debug("URI variables: {}", uriVariables);
        logger.debug("Http Headers: {}", requestEntity.getHeaders());
        logger.debug("Parameters: {}", requestEntity.getBody());
        ResponseEntity<T> responseEntity = restTemplate.exchange(actURL, method, requestEntity, responseType, uriVariables);
        return responseEntity;
    }

    public <T> ResponseEntity<T> exchange(String url, HttpMethod method, HttpEntity<?> requestEntity, Class<T> responseType, Map<String, ?> uriVariables) {
        if (StringUtils.isBlank(url)) {
            throw new NullPointerException("URL不能为空！");
        }

        String actURL = actRestServiceURI + url;

        logger.debug("Http URL: {}", actURL);
        logger.debug("URI variables: {}", uriVariables);
        logger.debug("Http Headers: {}", requestEntity.getHeaders());
        logger.debug("Parameters: {}", requestEntity.getBody());
        ResponseEntity<T> responseEntity = restTemplate.exchange(actURL, method, requestEntity, responseType, uriVariables);
        return responseEntity;
    }

    public String getActRestServiceURI() {
        return actRestServiceURI;
    }

    public void setActRestServiceURI(String actRestServiceURI) {
        this.actRestServiceURI = actRestServiceURI;
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
}
