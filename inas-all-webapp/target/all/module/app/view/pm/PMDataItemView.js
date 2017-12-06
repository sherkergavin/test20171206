/**
 * Created by WangJm on 2015/5/7.
 */
Ext.define('inas.view.pm.DataItemView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dataitemview',
    requires: [
        'Jm.button.Button',
        'Jm.ux.MultiComboBox'
    ],
    initComponent: function () {
        var me = this;
        var pubStore=Ext.create('inas.store.pm.DataItemStore');
        var rollupTimeStore=Ext.create('Ext.data.Store', {
            fields: [
                {name: 'name'},
                {name: 'value'}
            ],
            data : [
                {name: '10分钟',    value: '10'},
                {name: '15分钟', value: '15'},
                {name: '1小时', value: '60'},
                {name: '4小时', value: '240'},
                {name: '1天', value: '1440'},
                {name: '空', value: '0'}
                //{name: '10分钟',    value: 10},
                //{name: '15分钟', value: 15},
                //{name: '1小时', value: 60},
                //{name: '4小时', value: 240},
                //{name: '1天', value: 1440},
                //{name: '空', value: 0}
            ]
        });


        Ext.apply(me, {
            layout: 'border',
            items: [{
                xtype: 'treepanel',
                region: 'west',
                width: '20%',
                store: 'pm.StationTypeTreeStore',
                name: 'stationTypeTree',
                forceFit: true,
                rootVisible: false,
                listeners:{
                    //加载相关压力Store
                    //itemclick: function (g, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    itemclick: function (tree, record, item, index, e, eOpts){
                        var station_id = record.raw.tid;
                        if (station_id != null && station_id != '' && station_id!=0){
                            Ext.Ajax.request({
                                url: projectGP('/format/getDataFormatByEn'),
                                method:'POST',
                                params: {
                                    'name':'压力'
                                },
                                success: function(response){
                                    var jsonObj =  Ext.JSON.decode(response.responseText);
                                    var mData=jsonObj.data;
                                    //alert('lent='+mData[0].name+'==='+mData[0].id);
                                    if(mData.length>0){
                                        var formatId=mData[0].id;//数据类型压力对应的id
                                        pubStore.load({
                                            params:{
                                                'entity_id':station_id
                                                ,
                                                'data_format_id':formatId
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                },
                border: true
            }, {
                xtype: 'grid',
                border: true,
                region: 'center',
                plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1,
                    pluginId: 'cellplugin'
                })],
                store: Ext.create('inas.store.pm.DataItemStore'),

                columns: [
                    {header: '', dataIndex: 'id', hidden: true},
                    {header: '', dataIndex: 'entity_id', flex: 1, hidden: true},
                    {
                        header: '数据项名称', flex: 1, dataIndex: 'data_item_name', editor: {
                        xtype: 'textfield',
                        maxLength: 50,
                        allowBlank: false
                    }
                    },
                    {
                        header: '数据项类型', flex: 1, dataIndex: 'data_format_id', editor: {
                        xtype: 'combo',
                        store: 'pm.DataFormatStore',
                        name: 'data_format_id',
                        queryMode: 'local',
                        editable: false,
                        displayField: 'descriptions',
                        valueField: 'id',
                        triggerAction: 'all',
                        allowBlank: false
                    }, renderer: function (value) {
                        if ('' == value || null == value) {
                            return value;
                        } else {
                            var store = Ext.data.StoreManager.get('pm.DataFormatStore');
                            var index = store.findExact('id', value);
                            return store.getAt(index).get('descriptions');
                        }
                    }
                    },
                    {
                        header: '项目类型', flex: 1, dataIndex: 'type', editor: {
                        xtype: 'combo',
                        store: 'system.DictionaryStore',
                        name: 'type',
                        queryMode: 'local',
                        editable: false,
                        displayField: 'name',
                        valueField: 'id',
                        triggerAction: 'all',
                        allowBlank: false
                    }, renderer: function (value,cellmeta,record,rowIndex,columnIndex,store) {
                        if ('' == value || null == value || 0 == value) {
                            record.data.type = null;
                            return null;
                        } else {
                            var store = Ext.data.StoreManager.get('system.DictionaryStore');
                            var index = store.findExact('id', value);
                            return store.getAt(index).get('name');
                        }
                    }
                    },


                    {
                        header: '归档时间', flex: 1, dataIndex: 'roll_interval', editor: {
                        xtype: 'multicombobox',
                        store: rollupTimeStore,
                        name: 'rollup_interval',
                        queryMode: 'local',
                        multiSelect:true,
                        editable: false,
                        displayField: 'name',
                        valueField: 'value',
                        triggerAction: 'all',
                        allowBlank: true
                    }
                        , renderer: function (value,cellmeta,record,rowIndex,columnIndex,store) {
                        if ('' == value || null == value || 0 == value) {
                            record.data.rollup_interval = null;
                            return null;
                        } else {
                            var result='';
                            var array= value.split(',');
                            for (var i=0; i < array.length; i++){
                                var id=array[i]
                                var store = rollupTimeStore;
                                var index = store.findExact('value', id);
                                result=result+store.getAt(index).get('name');
                                if(i<array.length-1){
                                    result=result+',';
                                }
                            }
                            return result;


                        }
                    }
                    },

                    {
                        header: '泵关联压力', flex: 1, dataIndex: 'pressure_data_item_id', editor: {
                        xtype: 'combo',
                        store: pubStore,
                        name: 'pressure_data_item_id',
                        queryMode: 'local',
                        editable: false,
                        displayField: 'data_item_name',
                        valueField: 'id',
                        triggerAction: 'all',
                        allowBlank: true
                    }, renderer: function (value,cellmeta,record,rowIndex,columnIndex,store) {
                        if ('' == value || null == value || 0 == value) {
                            record.data.pressure_data_item_id = null;
                            return null;
                        } else {
                            pubStore.reload();
                            var index = store.findExact('id', value);
                            var itemName=store.getAt(index).get('data_item_name');
                            //console.log('itemName='+itemName);
                            return itemName;
                        }
                    }
                    },


                    {
                        header: '排序', width: 95, dataIndex: 'lo', editor: {
                        xtype: 'numberfield',
                        maxLength: 9
                    }
                    },
                    {
                        xtype: 'actioncolumn', align: 'center', name: 'config',
                        width: 50,
                        items: [{
                            getClass: function (v, meta, record) {
                                return 'config';
                            },
                            getTip: function () {
                                return '采集键值配置';
                            },
                            handler: function (grid, rowIndex, colIndex) {
                                var row = grid.getStore().getAt(rowIndex);
                                var d_data_id = parseInt(row.data.id);
                                if (d_data_id != 0) {
                                    var window = Ext.create('inas.view.pm.DataItemConfigWin');
                                    window.setData_item_id(row.data.id);
                                    window.show();
                                } else {
                                    Jm.Msg.error('新增项目未保存前不能配置采集键值！');
                                }
                            }
                        }]
                    }
                ],
                listeners: {

                }
            }],
            buttons: [{
                xtype: 'jbutton',
                action: 'add'
            }, {
                xtype: 'jbutton',
                action: 'save'
            }]
        });
        this.callParent(arguments);
    }
});