Ext.define('inas.model.alarm.PolicyMessageModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'int'},
        {name:'message_group_id',type:'int'},
        {name: 'message_group_name', type: 'string'},
        {name:'checked',type:'boolean'}
    ]
});