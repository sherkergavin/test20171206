Ext.define('inas.model.pm.ExternalDBModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'name', type: 'string'},
        {name:'leaf',type:'boolean'},
    ]
});