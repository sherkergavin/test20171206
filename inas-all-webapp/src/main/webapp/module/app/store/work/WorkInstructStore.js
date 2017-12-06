Ext.define('inas.store.work.WorkInstructStore', {
    extend: 'Ext.data.Store',
    //fields: ['id', 'daily_date','name'],
    fields: [{
        name: 'id'
    }, {
        name: 'content'
    }, {
        name: 'daily_date',
        type: Ext.data.Types.DATE,
        dateFormat: 'time'
    }],
    proxy: {
        type: 'ajax',
        url: projectGP('/workInstruct/getMonthInstructs'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: false
});