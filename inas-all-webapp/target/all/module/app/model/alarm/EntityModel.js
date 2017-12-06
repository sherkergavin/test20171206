Ext.define('inas.model.alarm.EntityModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'entity_id', type: 'int'},
        {name: 'entity_name', type: 'string'},
        //,
        //{name:'data_item_id',type:'int'},
        //{name:'data_item_name',type:'string'}
        {name:'checked',type:'boolean'}
    ]
});