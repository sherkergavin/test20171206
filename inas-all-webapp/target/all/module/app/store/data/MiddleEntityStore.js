/**
 * Created by JM-SD09 on 2016/4/19.
 */
Ext.define('inas.store.data.MiddleEntityStore', {
    extend:'Ext.data.Store',
    model:'inas.model.data.EntityTypeModel',
    proxy:{
        type:'ajax',
        url:projectGP('/data/getEntityByType'),
        reader:{
            type:'json',
            root:'data'
        }
    },
    autoLoad:false
});