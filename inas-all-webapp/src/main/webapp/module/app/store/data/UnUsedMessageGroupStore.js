/*
 *itemselector
 */
Ext.define('inas.store.data.UnUsedMessageGroupStore',{
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
        url:projectGP('/messageGroup/getUnUsedMessageGroupUser'),
        reader:{
            type:'array',
            root:'data'
        }
    }
});