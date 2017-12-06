Ext.define('inas.model.alarm.ConditionModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'int'},
        {name:'type',type:'int'},
        {name:'data_format_id',type:'int'},
        {name:'num1',type:'int'},
        {name:'num2',type:'int'},
        {name:'time_length',type:'int'},
        {name:'type_name',type:'string'},
        {name:'format_name',type:'string'},
        {name:'description',type:'string'}
    ]
});