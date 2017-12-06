/**
 * Created by luyufei on 2016/2/1.
 */
Ext.define('inas.store.home.FormStartByMeStore', {
    extend:'Ext.data.Store',
    model:'inas.model.workflow.WorkFlowInfoModel',
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url: projectGP('/workflow/getStartedByMeProcessInstances'),
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true
});