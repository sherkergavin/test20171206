Ext.define('inas.model.pm.DataHistoryStatistics', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'maxvalue', type: 'number'},
        {name:'minvalue',type:'number'},
        {name: 'avgvalue', type: 'number'},
        {name: 'countvalue', type: 'number'},
        {name: 'name', type: 'string'}
    ]
});