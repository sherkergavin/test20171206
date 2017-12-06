/**
 * Created by luyufei on 2016/2/4.
 */
Ext.define('inas.store.home.ExecutingScheduleFormStore', {
    extend:'Ext.data.Store',
    model:'inas.model.workflow.WorkFlowInfoModel',
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url: projectGP('/workflow/getExecutingScheduleForm'),
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true
});
