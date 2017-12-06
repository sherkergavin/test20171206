/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.store.data.StationStatusStore',{
    extend:'Ext.data.Store',
    //requires:['inas.model.data.StationTypeModel'],
    model:'inas.model.data.StationStatusModel',
    proxy: {
        type: 'ajax',
        url:projectGP('/data/stationStatus.json'),
        reader:{
            type:'json',
            root:'data'
        }
    }
});