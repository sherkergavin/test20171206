/**
 * Created by JM-SD09 on 2015/8/26.
 */
Ext.define("inas.view.work.MakePlanPanel", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.makePlanPanel',
    title: '测试',
    initComponent: function () {
        var me = this;
        var tar = Ext.create('Ext.Toolbar', {
            align: 'center',
            region: 'north',
            height: 40,
            items: [{
                xtype: 'jbutton',
                action: 'add'
            }, {
                xtype: 'jbutton',
                action: 'edit'
            },
            //    {
            //    xtype: 'jbutton',
            //    action: 'delete'
            //},
                {
                xtype: 'datefield',
                fieldLabel: '起始(开始时间)',
                name: 'staTime',
                labelWidth: 100,
                editable: false,
                format: 'Y-m-d',
                value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -7), 'Y-m-d')
            }, {
                xtype: 'datefield',
                fieldLabel: '至',
                name: 'endTime',
                labelWidth: 25,
                editable: false,
                format: 'Y-m-d',
                value: Ext.Date.format(new Date(), 'Y-m-d')
            }, {
                    fieldLabel: '文档编号',
                    labelWidth: 60,
                    name: 'code',
                    xtype: 'textfield'
                }, {
                    fieldLabel: '计划名称',
                    labelWidth: 60,
                    name: 'name',
                    xtype: 'textfield'
                },{
                xtype: 'jbutton',
                action: 'search'
            }]
        });
        Ext.apply(this, {
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [tar, {
                xtype: 'grid',
                width: '88%',
                region: 'center',
                layout: 'fit',
                name: 'makePlanGrid',
                border: true,
                autoHeight: true,
                store: 'work.MakePlanStore',
                columns: [{xtype: 'rownumberer'}, {
                    text: '文档编号',
                    dataIndex: 'code',
                    flex: 3,
                    align: 'center'
                }, {
                    text: '计划名称',
                    dataIndex: 'name',
                    flex: 8,
                    align: 'center'
                }, {
                    text: '开始时间',
                    flex: 8,
                    dataIndex: 'starttime',
                    align: 'center',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                }, {
                    text: '结束时间',
                    flex: 8,
                    dataIndex: 'endtime',
                    align: 'center',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    store: 'work.MakePlanStore'
                }
            }],
            forceFit: true
        });
        this.callParent(arguments);
    }
});