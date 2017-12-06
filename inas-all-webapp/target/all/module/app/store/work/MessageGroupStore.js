Ext.define('inas.store.work.MessageGroupStore', {
    extend: 'Ext.data.TreeStore',
    model: 'inas.model.data.DBTypeModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: projectGP('/messageGroup/getMessageGroupTree'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'children'
        }
    },
    root: {
        expanded: false
    }
});

