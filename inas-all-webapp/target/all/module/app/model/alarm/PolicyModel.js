Ext.define('inas.model.alarm.PolicyModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'name', type: 'string'},
        {name:'leaf',type:'boolean'},
        {name:'parent_id',type:'int'}
    ]
});