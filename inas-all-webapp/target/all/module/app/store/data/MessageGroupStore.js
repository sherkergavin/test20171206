Ext.define('inas.store.data.MessageGroupStore', {
    extend: 'Ext.data.TreeStore',
    model: 'inas.model.data.MessageGroupModell',
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

