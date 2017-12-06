Ext.define('inas.store.system.OrganiztionStore', {
    extend:'Ext.data.Store',
    model: 'inas.model.system.OrganiztionModel',
    proxy: {
        type: 'ajax',
        autoLoad : false,
        url: projectGP('/module/getSystemOrganizationList'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});