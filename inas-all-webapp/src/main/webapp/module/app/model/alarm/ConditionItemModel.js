Ext.define('inas.model.alarm.ConditionItemModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'int'},
        {name:'condition_id',type:'int'},
        {name: 'entity_id', type: 'int'},
        {name: 'entity_name', type: 'string'},
        {name:'data_item_id',type:'int'},
        {name:'data_item_name',type:'string'},
        {name:'checked',type:'boolean'}
    ]
});