/**
 * Created by luyufei on 2016/2/4.
 */
Ext.define('inas.store.home.PlanningScheduleFormStore', {
    extend:'Ext.data.Store',
    model:'inas.model.workflow.WorkFlowInfoModel',
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url: projectGP('/workflow/getPlanningScheduleForm'),
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true
});
