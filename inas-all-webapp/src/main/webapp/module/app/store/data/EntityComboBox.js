/**
 * Created by JM-SD09 on 2015/9/28.
 */
Ext.define('inas.store.data.EntityComboBox', {
    extend:'Ext.data.Store',
    model:'inas.model.data.ExtityComModel',
    proxy:{
        type:'ajax',
        url:projectGP('/data/getEntityIdName'),
        reader:{
            type:'json',
            root:'data'
        }
    },
    autoLoad:false
});