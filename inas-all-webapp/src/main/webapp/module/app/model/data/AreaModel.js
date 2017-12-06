Ext.define('inas.model.data.AreaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'name', type: 'string'},
        {name:'leaf',type:'boolean'},
        {name:'parent_id',type:'int'}
    ]
});