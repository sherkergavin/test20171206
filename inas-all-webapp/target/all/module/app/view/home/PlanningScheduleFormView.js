/**
 * Created by luyufei on 2016/2/4.
 */
Ext.define('inas.view.home.PlanningScheduleFormView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.planningscheduleformview',
    margin: '10 10 10 10',

    requires: [
        'Jm.button.Button'
    ],

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            title: '计划执行的操作单',
            height: 300,
            modal: true,
            name:'taskInfoGrid',
            border: true,

            store: Ext.create('inas.store.home.PlanningScheduleFormStore'),
            columns: [
                {
                    text: '',
                    dataIndex: 'parentTaskId',
                    hidden: true
                }, {
                    text: 'processDefinitionId',
                    dataIndex: 'processDefinitionId',
                    hidden: true
                },{
                    text: '',
                    dataIndex: 'id',
                    hidden: true
                },{
                    text: '',
                    dataIndex: 'executionId',
                    hidden: true
                },{
                    text: '',
                    dataIndex: 'formKey',
                    hidden: true
                },{
                    text: '',
                    dataIndex: 'taskDefinitionKey',
                    hidden: true
                },{
                    text: '',
                    dataIndex: 'url',
                    hidden: true
                }, {
                    text:'编号',
                    dataIndex:'processInstanceId',
                    editor: 'numberfield',
                    flex:1,
                    align:'center'
                }, {
                    text: '名称',
                    dataIndex: 'name',
                    editor: 'textfield',
                    flex:1,
                    align: 'center'
                }, {
                    text:'概述',
                    dataIndex:'context',
                    editor:'textfield',
                    flex:1,
                    align:'center'
                }
            ]
        });
        this.callParent(arguments);
    }
});

