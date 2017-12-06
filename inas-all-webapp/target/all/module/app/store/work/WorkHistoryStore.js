Ext.define('inas.store.work.WorkHistoryStore', {
    extend:'Ext.data.Store',
    fields: [
        {
            name : 'daily_date',
            type : Ext.data.Types.DATE,//加上这个
            dateFormat : 'time'//加上这个
        }, {
            name : 'user_moperator_id'
        },
        {
            name : 'user_mopName'//名
        },
        {
            name : 'user_aoperator_id'
        },
        {
            name : 'user_aopName'//名
        },{
            name : 'user_eoperator_id'
        },
        {
            name : 'user_eopName'//名
        },
    ],
    proxy: {
        type: 'ajax',
        url: projectGP('/dailyShift/getDailyShifts'),
        reader: {
            type: 'json',
            root: 'data'
        }
    }
    ,
    autoLoad: false
})