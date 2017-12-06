/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.store.system.StationStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.StationModel',
    proxy: {
        type: 'ajax',
        url:projectGP('/module/getConfigStationTypeList'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader:{
            type:'json',
            root:'data'
        }
    }
});