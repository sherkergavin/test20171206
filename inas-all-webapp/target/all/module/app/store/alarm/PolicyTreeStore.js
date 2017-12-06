
Ext.define('inas.store.alarm.PolicyTreeStore',{
    extend:'Ext.data.TreeStore',
    autoLoad: false,
    root: {
        expanded: false
    },
    proxy: {
        type: 'ajax',
        url:projectGP('/policy/getPolicyTree'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader:{
            type:'json'
        }
    }
});