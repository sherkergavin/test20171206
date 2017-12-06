package com.inas.web.pmcontroller;

import com.inas.model.data.DataFormat;
import com.inas.model.data.DataTypeValue;
import com.inas.model.system.Dictionary;
import com.inas.service.data.DataFormatService;
import com.inas.service.data.DataTypeValueService;
import com.inas.service.system.DictionaryService;
import com.inas.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ZS on 2015/6/12.
 */
@RequestMapping("/formatValue")
@Controller
public class DataFormatValueController {
    @Resource(name = "dataTypeValueService")
    private DataTypeValueService dataTypeValueService;

    @Resource(name = "dictionaryService")
    private DictionaryService dictionaryService;

    @Resource(name = "dataFormatService")
    private DataFormatService dataFormatService;


    @RequestMapping(value = "/getDataValueInfo", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataValueInfoByFormatId(HttpServletRequest request, Dictionary dictionary) {
        Dictionary dict = dictionaryService.getDictionaryByIdOrCode(dictionary);
        DataFormat dataFormat = new DataFormat();
        dataFormat.setData_type(dict.getId());
        List listFormat = dataFormatService.findByDataTypeEntity(dataFormat);
        List<DataTypeValue> allValueList = new ArrayList<>();
        for (int i = 0; i < listFormat.size(); i++) {
            DataFormat df = (DataFormat) listFormat.get(i);
            DataTypeValue dataTypeValue = new DataTypeValue();
            dataTypeValue.setDataFormatId(df.getId());
            //查询所有该类型的
            List<DataTypeValue> listValueInfo = dataTypeValueService.queryValueByEntity(dataTypeValue);
            for (DataTypeValue da : listValueInfo) {
                da.setData_type(dict.getId());
            }
            allValueList.addAll(listValueInfo);
        }
        return JSONUtil.toExtResultJson(allValueList);
    }
}
