Ext.define('inas.store.alarm.AllConditionStore', {
    extend:'Ext.data.Store',
    model:'inas.model.alarm.ConditionModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/condition/getConditionByVO'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
    ,
    autoLoad: false
})