/**
 * Created by JM-SD09 on 2015/9/24.
 */
Ext.define('inas.store.data.MiddleGridStore',{
   extend:'Ext.data.Store',
    model:'inas.model.data.MiddleGridModel',
    proxy:{
        type:'ajax',
        url:projectGP('/data/getSelectMiddleAllData'),
        reader:{
            type:'json',
            root:'data'
        }
    },
    autoLoad:false
});