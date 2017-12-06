Ext.define('inas.store.pm.DataFormatTreeStore', {
    extend: 'Ext.data.TreeStore',
    model:'inas.model.pm.DBTypeModel',
    proxy: {
        type: 'ajax',
        url:projectGP('/format/getTypeTree'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'children'
        }
    }
    ,
    autoLoad: false,
    root: {
        expanded: false
    }
});