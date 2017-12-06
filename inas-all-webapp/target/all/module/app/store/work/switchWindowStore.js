/**
 * Created by JM-SD09 on 2015/9/7.
 */
Ext.define('inas.store.work.switchWindowStore',{
    extend:'Ext.data.Store',
    model:'inas.model.work.switchWindowModel',
    proxy:{
        type:'ajax',
        url:projectGP('/data/getMiddleFindById'),
        reader:{
            type:'json',
            root:'data'
        }
    },
    autoLoad:false
});