/**
 * Created by JM-SD09 on 2016/3/28.
 */
Ext.define('inas.store.data.ItemComboBox', {
    extend:'Ext.data.Store',
    model:'inas.model.data.ItemComModel',
    proxy:{
        type:'ajax',
        url:projectGP('/data/getItemIdName'),
        reader:{
            type:'json',
            root:'data'
        },
        autoLoad: false,
        root: {
            expanded: false
        }
    },
    autoLoad:false
});