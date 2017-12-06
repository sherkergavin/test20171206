/*
 *itemselector
 */
Ext.define('inas.store.system.PermCheckedStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.SelectorModel',
    //  autoLoad: true,
    sortInfo: {
        field: 'value',
        direction: 'ASC'
    },
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/permission/getRolePerm'),
        reader:{
            type:'array',
            root:'data'
        }
    }
});