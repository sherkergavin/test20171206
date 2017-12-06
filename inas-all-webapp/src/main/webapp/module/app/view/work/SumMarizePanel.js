/**
 * Created by JM-SD09 on 2015/8/28.
 */
Ext.define('inas.view.work.SumMarizePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sumMarizePanel',
    initComponent: function () {
        var tbar = Ext.create('Ext.Toolbar', {
            align: 'center',
            region: 'north',
            name: 'SumMarizeToolbar',
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
                fieldLabel: '起始',
                name: 'starTime',
                editable: false,
                labelWidth: 100,
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
                    xtype: 'textfield',
                    fieldLabel: '编号',
                    name: 'code',
                    labelWidth: 40,
                    editable: false
            }, {
                    xtype: 'textfield',
                    fieldLabel: '名称',
                    name: 'name',
                    labelWidth: 40,
                    editable: false
            }, {
                    xtype: 'textfield',
                    fieldLabel: '人员',
                    name: 'attendance',
                    labelWidth: 40,
                    editable: false
             }, {
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
            items: [tbar, {
                xtype: 'grid',
                width: '88%',
                region: 'center',
                layout: 'fit',
                name: 'SumMarizeGrid',
                border: false,
                autoHeight: true,
                store: 'work.SumMarizeStore',
                columns: [{xtype: 'rownumberer'},
                    {
                        text: '文档编号',
                        dataIndex: 'code',
                        flex: 4,
                        align: 'center'
                    }, {
                        text: '小结名称',
                        dataIndex: 'name',
                        flex: 8,
                        align: 'center'
                    }, {
                        text: '小结人员',
                        dataIndex: 'attendance',
                        flex: 8,
                        align: 'center'
                    }, {
                        text: '小结时间',
                        dataIndex: 'dateTime',
                        flex: 4,
                        align: 'center',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d')
                    }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    store: 'work.SumMarizeStore'
                }
            }],
            forceFit: true
        });
        this.callParent(arguments)
    }
});