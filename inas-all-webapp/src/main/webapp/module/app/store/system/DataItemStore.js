/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.store.system.DataItemStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.DataItemModel',
    proxy: {
        type: 'ajax',
        url:projectGP('/module/getDataItemTypeEntity'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader:{
            type:'json',
            root:'data'
        }
    }
});