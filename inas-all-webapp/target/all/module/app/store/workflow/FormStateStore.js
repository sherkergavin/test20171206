/**
 * Created by luyufei on 2016/3/23.
 */
Ext.define('inas.store.workflow.FormStateStore', {
    extend:'Ext.data.Store',
    model:'inas.model.workflow.FormStateModel',
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        //url: projectGP('/system/getDictionaryByType'),
        url: projectGP('/workflow/getFormState'),
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: false
});