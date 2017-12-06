/**
 * Created by zs on 2015/11/10.
 */
Ext.define('inas.store.workflow.WorkFlowInfosStore', {
    extend:'Ext.data.Store',
    model:'inas.model.workflow.EquipmentStopModel',
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/equipment/getEquipmentStopForm'),
        reader: {
            type: 'json',
            root: 'data.list'
        }
    },
    autoLoad: false
});