Ext.define('inas.model.pm.DBTypeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name:'name',type:'string'},
        {name: 'text', type: 'string'},
        {name: 'controller', type: 'string'},
        {name:'leaf',type:'boolean'}
    ]
});