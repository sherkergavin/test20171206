/**
 * Created by WangJm on 2016/1/23.
 */
Ext.define('inas.store.pm.DataHistoryStatisticsStore', {
    extend: 'Ext.data.Store',
    model:'inas.model.pm.DataHistoryStatistics',
    proxy:{
        type:'ajax',
        timeout: 100000000,
        url:projectGP('/dataHistory/getDataHistoryStatistics'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader:{
            type:'json',
            root:'data'
        }
    }
});