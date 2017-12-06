/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.store.pm.StationTypeStore',{
    extend:'Ext.data.Store',
    //requires:['inas.model.data.StationTypeModel'],
    model:'inas.model.pm.StationTypeModel',
    proxy: {
        type: 'ajax',
        url:projectGP('/data/entityTypeList'),
        reader:{
            type:'json',
            root:'data'
        }
    }
});