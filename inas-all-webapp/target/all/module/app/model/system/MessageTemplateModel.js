/**
 * Created by WangJm on 2015/6/11.
 */
Ext.define('inas.model.system.MessageTemplateModel',{
    extend:'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name:'title',type:'string'},
        {name:'context',type:'string'}
    ]
});