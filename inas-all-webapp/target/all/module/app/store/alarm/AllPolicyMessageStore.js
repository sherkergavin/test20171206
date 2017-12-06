Ext.define('inas.store.alarm.AllPolicyMessageStore', {
    extend:'Ext.data.Store',
    model:'inas.model.alarm.PolicyMessageModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/policyMessage/getPolicyMessageByVo'),
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