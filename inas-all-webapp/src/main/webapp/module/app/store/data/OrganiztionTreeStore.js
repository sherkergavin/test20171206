
Ext.define('inas.store.data.OrganiztionTreeStore',{
    extend:'Ext.data.TreeStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/organization/getOrgsTree'),
        reader:{
            type:'json'
        }
    }
    ,
    root: {
        text:'全市'
    }
});