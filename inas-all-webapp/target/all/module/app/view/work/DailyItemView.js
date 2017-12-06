/**
 * Created by WangJm on 2015/8/5.
 */
Ext.define('inas.view.work.DailyItemView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dailyItemView',
    requires: [
        'Jm.button.Button'
    ],

    config : {
        dailyDate : null
    },
    initComponent: function () {

        var me = this;
        var tDate = (me.getDailyDate() == null)?Ext.Date.format(new Date, 'Y年m月d日'):me.getDailyDate();

        Ext.apply(me, {
            layout:'border',//border,
            tbar: [
                Ext.create('Jm.button.Button', {action: 'add'}),
                Ext.create('Jm.button.Button', {action: 'save'}),
                Ext.create('Jm.button.Button', {action: 'refresh'})

            ],
            items: [{
                xtype: 'textareafield',
                region: 'north',
                height: '200',
                margins: '5 5 5 5',
                grow: true,
                name: 'content',
                readOnly: true,
                anchor: '100%'
            },
            {
                xtype: 'grid',
                autoScroll : 'auto',
                region: 'center',
                flex: 3,
                store: 'work.DailyItemStore',
                columns: [
                    {header: '', dataIndex: 'id', hidden: true},
                    {
                        header: '机构单位', flex: 1, dataIndex: 'system_organization_id', editor: {
                        xtype: 'combo',
                        store: 'system.OrganiztionStore',
                        name: 'system_organization_id',
                        queryMode: 'local',
                        editable: false,
                        displayField: 'name',
                        valueField: 'id',
                        triggerAction: 'all',
                        allowBlank: false
                    }, renderer: function (value) {
                        if ('' == value || null == value || 0 == value) {
                            return null;
                        } else {
                            var store = Ext.data.StoreManager.get('system.OrganiztionStore');
                            var index = store.findExact('id', value);
                            return store.getAt(index).get('name');
                        }
                    }
                    },
                    {
                        header: '时间', width: 90, align: 'center', dataIndex: 'daily_time', editor: {
                        xtype: 'textfield',
                        name: 'daily_time',
                        allowBlank: false,
                        regex: /^[0-2][0-9]:[0-5][0-9]$/,
                        regexText: '必须录入00:00格式，时间最大不能超过23:59(中间冒号为英文格式)',
                        listeners: {
                            'focus': function (t) {
                                if (t.getValue() == '') {
                                    t.setValue(Ext.Date.format(new Date(), 'H:i'));
                                }
                            }
                        }
                    }
                    },
                    {
                        header: '设备名称', flex: 2, dataIndex: 'equip', editor: {
                        xtype: 'textfield',
                        name: 'equip',
                        maxLength: 50
                    }
                    },
                    {
                        header: '内容', flex: 3, dataIndex: 'content', editor: {
                        xtype: 'textfield',
                        name: 'content',
                        maxLength: 255
                    }
                    },
                    {
                        xtype: 'actioncolumn', align: 'center',
                        width: 50,
                        items: [{
                            getClass: function (v, meta, record) {
                                if (record.data.id == 0) {
                                    return 'close';
                                } else {
                                    return null;
                                }
                            },
                            getTip: function () {
                                return '删除行';
                            },
                            handler: function (grid, rowIndex, colIndex, item, e, record, row) {
                                var store = grid.getStore();
                                store.remove(store.getAt(rowIndex));
                            }
                        }]
                    }
                ],
                selType: 'cellmodel',
                plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 2,
                    pluginId: 'cellplugin'
                })]
            }, {
                region: 'south',
                xtype: 'form',
                layout: 'fit',//column
                width:500,
                autoScroll : true,
                items: [
                    {

                    // frame:true,
                        autoScroll :true,
                        layout:{

                            type:'table',
                            columns:4
                        },
                        height:80,
                        items:[
                                ///////////////

                            {
                               // columnWidth: .22,
                                rowspan:1,
                                layout: 'column',
                                xtype: 'fieldset',
                                title: '早班',
                                autoHeight: true,
                                defaultType: 'textfield',
                                width:300,//200
                               height:60,

                                items: [
                                    {
                                        xtype: 'combo',
                                        name: 'user_mmanager_id',
                                        fieldLabel: '调度员1',
                                        labelWidth: 60,
                                        store: 'system.UserStore',
                                        queryMode: 'local',
                                        displayField: 'staff_real_name',
                                        valueField: 'id',
                                        editable: false,
                                        emptyText: '选调度员',
                                        triggerAction: 'all',
                                        columnWidth: 0.5
                                    }, {
                                        xtype: 'combo',
                                        name: 'user_moperator_id',
                                        fieldLabel: '调度员2',
                                        labelWidth: 60,
                                        store: 'system.UserStore',
                                        queryMode: 'local',
                                        displayField: 'staff_real_name',
                                        valueField: 'id',
                                        editable: false,
                                        emptyText: '选调度员',
                                        triggerAction: 'all',
                                        columnWidth: 0.5
                                    },
                                    //  {fieldLabel: '气象摘要', name: 'mweather'},
                                ]
                            }, {
                                //columnWidth: .22,
                                rowspan:1,
                                layout: 'column',
                                xtype: 'fieldset',
                                title: '中班',
                                autoHeight: true,
                                defaultType: 'textfield',
                                width:300,
                                height:60,
                                items: [{
                                    xtype: 'combo',
                                    name: 'user_amanager_id',
                                    fieldLabel: '调度员1',
                                    labelWidth: 60,
                                    store: 'system.UserStore',
                                    queryMode: 'local',
                                    displayField: 'staff_real_name',
                                    valueField: 'id',
                                    editable: false,
                                    emptyText: '选调度员',
                                    triggerAction: 'all',
                                    columnWidth: 0.5
                                }, {
                                    xtype: 'combo',
                                    name: 'user_aoperator_id',
                                    fieldLabel: '调度员2',
                                    labelWidth: 60,
                                    store: 'system.UserStore',
                                    queryMode: 'local',
                                    displayField: 'staff_real_name',
                                    valueField: 'id',
                                    editable: false,
                                    emptyText: '选调度员',
                                    triggerAction: 'all',
                                    columnWidth: 0.5
                                },

                                    //    {fieldLabel: '最低温度(°C)', xtype: 'numberfield', name: 'alowest'},
                                ]
                            }, {
                                //columnWidth: .22,
                                rowspan:1,
                                layout: 'column',
                                xtype: 'fieldset',
                                title: '晚班',
                                autoHeight: true,
                                defaultType: 'textfield',
                                width:300,
                                height:60,
                                items: [{
                                    xtype: 'combo',
                                    name: 'user_emanager_id',
                                    fieldLabel: '调度员1',
                                    labelWidth: 60,
                                    store: 'system.UserStore',
                                    queryMode: 'local',
                                    displayField: 'staff_real_name',
                                    valueField: 'id',
                                    editable: false,
                                    emptyText: '选调度员',
                                    triggerAction: 'all',
                                    columnWidth: 0.5
                                }, {
                                    xtype: 'combo',
                                    name: 'user_eoperator_id',
                                    fieldLabel: '调度员2',
                                    labelWidth: 60,
                                    store: 'system.UserStore',
                                    queryMode: 'local',
                                    displayField: 'staff_real_name',
                                    valueField: 'id',
                                    editable: false,
                                    emptyText: '选调度员',
                                    triggerAction: 'all',
                                    columnWidth: 0.5
                                },


                                    //{fieldLabel: '最高温度(°C)', xtype: 'numberfield', name: 'ehighest'}
                                ]
                            },
                            {
                                //columnWidth: .33,
                                rowspan:1,
                                layout: 'column',
                                xtype: 'fieldset',
                                title: '气温',
                                autoHeight: true,
                                defaultType: 'textfield',
                                width:780,//450
                                height:60,
                                items: [
                                    {
                                        labelWidth: 60,
                                        columnWidth: 0.64,
                                        fieldLabel: '气象摘要', name: 'mweather'
                                    },{
                                        labelWidth: 80,
                                        columnWidth: 0.18,
                                        fieldLabel: '最高温度(°C)', xtype: 'numberfield', name: 'ehighest'
                                    }, {
                                        labelWidth: 80,
                                        columnWidth: 0.18,
                                        fieldLabel: '最低温度(°C)',xtype: 'numberfield', name: 'alowest'
                                    },


                                    //{fieldLabel: '最高温度(°C)', xtype: 'numberfield', name: 'ehighest'}
                                ]
                            }
                                //////////////
                        ]



                    }
                //
                //    {
                //    columnWidth: .22,
                //    layout: 'column',
                //    xtype: 'fieldset',
                //    title: '早班',
                //    autoHeight: true,
                //    defaultType: 'textfield',
                //
                //    items: [
                //        {
                //            xtype: 'combo',
                //            name: 'user_mmanager_id',
                //            fieldLabel: '调度员1',
                //            labelWidth: 60,
                //            store: 'system.UserStore',
                //            queryMode: 'local',
                //            displayField: 'staff_real_name',
                //            valueField: 'id',
                //            editable: false,
                //            emptyText: '选择调度员',
                //            triggerAction: 'all',
                //            columnWidth: 0.5
                //        }, {
                //            xtype: 'combo',
                //            name: 'user_moperator_id',
                //            fieldLabel: '调度员2',
                //            labelWidth: 60,
                //            store: 'system.UserStore',
                //            queryMode: 'local',
                //            displayField: 'staff_real_name',
                //            valueField: 'id',
                //            editable: false,
                //            emptyText: '选择调度员',
                //            triggerAction: 'all',
                //            columnWidth: 0.5
                //        },
                //        //  {fieldLabel: '气象摘要', name: 'mweather'},
                //    ]
                //}, {
                //    columnWidth: .22,
                //    layout: 'column',
                //    xtype: 'fieldset',
                //    title: '中班',
                //    autoHeight: true,
                //    defaultType: 'textfield',
                //    items: [{
                //        xtype: 'combo',
                //        name: 'user_amanager_id',
                //        fieldLabel: '调度员1',
                //        labelWidth: 60,
                //        store: 'system.UserStore',
                //        queryMode: 'local',
                //        displayField: 'staff_real_name',
                //        valueField: 'id',
                //        editable: false,
                //        emptyText: '选择调度员',
                //        triggerAction: 'all',
                //        columnWidth: 0.5
                //    }, {
                //        xtype: 'combo',
                //        name: 'user_aoperator_id',
                //        fieldLabel: '调度员2',
                //        labelWidth: 60,
                //        store: 'system.UserStore',
                //        queryMode: 'local',
                //        displayField: 'staff_real_name',
                //        valueField: 'id',
                //        editable: false,
                //        emptyText: '选择调度员',
                //        triggerAction: 'all',
                //        columnWidth: 0.5
                //    },
                //
                //        //    {fieldLabel: '最低温度(°C)', xtype: 'numberfield', name: 'alowest'},
                //    ]
                //}, {
                //    columnWidth: .22,
                //    layout: 'column',
                //    xtype: 'fieldset',
                //    title: '晚班',
                //    autoHeight: true,
                //    defaultType: 'textfield',
                //    items: [{
                //        xtype: 'combo',
                //        name: 'user_emanager_id',
                //        fieldLabel: '调度员1',
                //        labelWidth: 60,
                //        store: 'system.UserStore',
                //        queryMode: 'local',
                //        displayField: 'staff_real_name',
                //        valueField: 'id',
                //        editable: false,
                //        emptyText: '选择调度员',
                //        triggerAction: 'all',
                //        columnWidth: 0.5
                //    }, {
                //        xtype: 'combo',
                //        name: 'user_eoperator_id',
                //        fieldLabel: '调度员2',
                //        labelWidth: 60,
                //        store: 'system.UserStore',
                //        queryMode: 'local',
                //        displayField: 'staff_real_name',
                //        valueField: 'id',
                //        editable: false,
                //        emptyText: '选择调度员',
                //        triggerAction: 'all',
                //        columnWidth: 0.5
                //    },
                //
                //
                //        //{fieldLabel: '最高温度(°C)', xtype: 'numberfield', name: 'ehighest'}
                //    ]
                //},
                //    {
                //        columnWidth: .33,
                //        layout: 'column',
                //        xtype: 'fieldset',
                //        title: '气温',
                //        autoHeight: true,
                //        defaultType: 'textfield',
                //        items: [
                //            {
                //                labelWidth: 60,
                //                columnWidth: 0.33,
                //                fieldLabel: '气象摘要', name: 'mweather'
                //            },{
                //                labelWidth: 90,
                //                columnWidth: 0.33,
                //                fieldLabel: '最高温度(°C)', xtype: 'numberfield', name: 'ehighest'
                //            }, {
                //                labelWidth: 80,
                //                columnWidth: 0.33,
                //                fieldLabel: '最低温度(°C)', xtype: 'numberfield', name: 'alowest'
                //            },
                //
                //
                //            //{fieldLabel: '最高温度(°C)', xtype: 'numberfield', name: 'ehighest'}
                //        ]
                //    }

                ]
            }],
            //buttons: [{
            //    xtype: 'jbutton',
            //    action: 'add'
            //}, {
            //    xtype: 'jbutton',
            //    action: 'save'
            //}],
            listeners:{
                afterrender:function(t){
                    tDate = 'abc';
                }
            }
        });
        this.callParent(arguments);
    }
});