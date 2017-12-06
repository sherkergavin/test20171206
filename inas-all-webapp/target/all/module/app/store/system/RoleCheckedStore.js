/*
 *itemselector
 */
Ext.define('inas.store.system.RoleCheckedStore',{
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
        url:projectGP('/role/getUserRole'),
        reader:{
            type:'array',
            root:'data'
        }
    }
});