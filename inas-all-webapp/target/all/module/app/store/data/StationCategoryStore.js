/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.store.data.StationCategoryStore',{
    extend:'Ext.data.Store',
    model:'inas.model.data.StationCategoryModel',
    proxy: {
        type: 'ajax',
        url:projectGP('/data/stationCategory.json'),
        reader:{
            type:'json',
            root:'data'
        }
    }
});