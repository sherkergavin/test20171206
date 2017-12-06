/**
 * Created by JM-SD09 on 2015/9/7.
 */
Ext.define('inas.store.work.switchGridStore',{
    extend:'Ext.data.Store',
    model:'inas.model.work.switchGridModel',
    groupField: 'entity_name',         //分组列表
    proxy:{
        type:'ajax',
        url:projectGP('/data/getMiddleJSON'),
        reader:{
            type:'json',
            root:'data'
        }
    },
    autoLoad:false
});


//'/module/app/store/workflow/test.json'