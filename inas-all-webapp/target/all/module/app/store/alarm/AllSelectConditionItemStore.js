Ext.define('inas.store.alarm.AllSelectConditionItemStore', {
    extend:'Ext.data.Store',
    model:'inas.model.alarm.ConditionItemModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/conditionItem/getConditionItemByEntityId'),
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