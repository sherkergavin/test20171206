Ext.define('inas.model.pm.CollectTaskModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'name', type: 'string'},
        {name:'leaf',type:'boolean'},
       {name:'time_next_task_start', type:Ext.data.Types.DATE , dateFormat: 'u'}
    ]
});