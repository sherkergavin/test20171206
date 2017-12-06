Ext.define('inas.model.system.MsgTempTreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name:'title',type:'string'},
        {name: 'text', type: 'string'},
        {name:'leaf',type:'boolean'}
    ]
});