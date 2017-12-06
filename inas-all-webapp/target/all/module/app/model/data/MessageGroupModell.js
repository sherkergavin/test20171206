Ext.define('inas.model.data.MessageGroupModell', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name:'name',type:'string'},
        {name: 'text', type: 'string'},
        {name: 'controller', type: 'string'},
        {name:'leaf',type:'boolean'}
    ]
});