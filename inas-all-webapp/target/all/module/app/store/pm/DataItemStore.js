/**
 * Created by WangJm on 2015/5/11.
 */
Ext.define('inas.store.pm.DataItemStore', {
    extend: 'Ext.data.Store',
    model:'inas.model.data.DataItemModel',
    proxy:{
        type:'ajax',
        url:projectGP('/data/getDataItemByEntity'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader:{
            type:'json',
            root:'data'
        }
    }
});