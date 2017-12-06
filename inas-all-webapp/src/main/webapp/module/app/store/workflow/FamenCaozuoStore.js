/**
 * Created by luyufei on 2016/3/23.
 */

Ext.define('inas.store.workflow.FamenCaozuoStore', {
    extend:'Ext.data.Store',
    model:'inas.model.workflow.FamenCaozuoModel',
    pageSize: 5,
    proxy: {//数据代理
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url: projectGP('/workflow/getFamenCaozuoForm'),
        reader: {//主要用于将proxy数据代理读取的数据按照不同的规则进行解析，将解析好的数据保存到指定Model中
            type: 'json',
            root: 'data.list',
            totalProperty: 'totalProperty'
        }
    },
    autoLoad: false
});