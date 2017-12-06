/**
 * Created by ZS on 2015/8/6.
 */
Ext.define('inas.view.work.MettingRecView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mettingRecPanel',
    initComponent: function () {
        var m = this;

        var tbar = Ext.create("Ext.Toolbar", {
            //width: '15%',
            align: 'center',
            region: 'north',
            height: '40',
            items: [
                {
                    xtype: 'jbutton',
                    action: 'add'
                },
                {
                    xtype: 'jbutton',
                    action: 'edit'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '时间',
                    name: 'staTime',
                    labelWidth: 30,
                    editable: false,
                    format: 'Y-m-d',
                    value : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -3), 'Y-m-d')
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '至',
                    labelWidth: 20,
                    name: 'endTime',
                    editable: false,
                    format: 'Y-m-d',
                    value : Ext.Date.format(new Date(), 'Y-m-d')
                }, {
                    fieldLabel: '文档编号',
                    labelWidth: 60,
                    name: 'code',
                    xtype: 'textfield'
                }
                , {
                    fieldLabel: '会议名称',
                    labelWidth: 60,
                    name: 'name',
                    xtype: 'textfield'
                }, {
                    fieldLabel: '与会人员',
                    labelWidth: 60,
                    name: 'attendance',
                    xtype: 'textfield'
                }
                , {
                    fieldLabel: '会议地点',
                    labelWidth: 60,
                    name: 'address',
                    xtype: 'textfield'
                }
                ,
                {
                    xtype: 'jbutton',
                    action: 'search'
                }
              //  '->',

                //,
                //{
                //    xtype:'jbutton',
                //    action:'delete'
                //}
            ]
        });

        Ext.apply(this, {
            title: '会议纪要',
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                //日期查询
                tbar,
                {
                    xtype: 'grid',
                    width: '88%',
                    region: 'center',
                    border: true,
                    layout: 'fit',
                    store: 'work.MettingRecStore',
                    columns: [
                        {
                            text: '',
                            dataIndex: 'id',
                            hidden: true
                        },
                        {
                            text: '文档编号',
                            dataIndex: 'code',
                            editor: 'textfield',
                            flex: 8,
                            align: 'left'
                        },
                        {
                            text: '会议时间',
                            dataIndex: 'time',
                            flex: 2,
                            align: 'left',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                            //renderer : Ext.util.Format.dateRenderer('Y-m-d')
                            //renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                        },
                        {
                            text: '会议名称',
                            dataIndex: 'name',
                            editor: 'textfield',
                            flex: 8,
                            align: 'center'
                        },
                        {
                            text: '与会人员',
                            dataIndex: 'attendance',
                            editor: 'textfield',
                            flex: 8,
                            align: 'center'
                        },
                        {
                            text: '会议地点',
                            dataIndex: 'address',
                            editor: 'textfield',
                            flex: 8,
                            align: 'left'
                        }

                    ]
                    ,
                    bbar: {
                        xtype: 'pagingtoolbar',
                        store: 'work.MettingRecStore'
                    }
                }
            ]
        });
        this.callParent(arguments);
    }
});