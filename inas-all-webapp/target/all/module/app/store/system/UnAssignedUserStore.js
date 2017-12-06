/*
 *itemselector
 */
Ext.define('inas.store.system.UnAssignedUserStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.SelectorModel',
    sortInfo: {
        field: 'value',
        direction: 'ASC'
    },
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/role/getUnAssignedUser'),
        reader:{
            type:'array',
            root:'data'
        }
    }
});