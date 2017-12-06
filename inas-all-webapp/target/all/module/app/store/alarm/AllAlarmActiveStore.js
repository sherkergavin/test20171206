Ext.define('inas.store.alarm.AllAlarmActiveStore', {
    extend:'Ext.data.Store',
    model:'inas.model.alarm.AlarmActiveModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/alarm/show/getAlarmActive'),
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