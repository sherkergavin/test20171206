Ext.define('inas.store.alarm.AllSelectEntityStore', {
    extend:'Ext.data.Store',
    model:'inas.model.alarm.EntityModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/conditionItem/getSelectEntity'),
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