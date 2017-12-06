/**
 * Created by JM-SD09 on 2016/4/19.
 */
Ext.define('inas.store.data.MiddleEntityTypeStore', {
    extend:'Ext.data.Store',
    model:'inas.model.data.EntityTypeModel',
    proxy:{
        type:'ajax',
        url:projectGP('/data/getAllEntityType'),
        reader:{
            type:'json',
            root:'data'
        }
    },
    autoLoad:false
});