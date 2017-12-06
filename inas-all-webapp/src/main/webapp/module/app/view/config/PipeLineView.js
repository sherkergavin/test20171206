/**
 * Created by WangJm on 2015/9/21.
 */
Ext.define('inas.view.config.PipeLineView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.configPipeLineView',
    config : {
        entityId : null
    },
    initComponent: function () {
        var me = this;

        var grid = Ext.create('Ext.grid.Panel',{
            region: 'center',
            xtype: 'grid',
            store: 'config.PipeLineItemStore',
            columns: [
                {header: '', dataIndex: 'id', hidden: true},
                {header: '', dataIndex: 'link_id', hidden: true},
                {
                    header: '流量仪名字', align: 'center', flex: 2, dataIndex: 'entity_id', editor: {
                    xtype: 'combo',
                    store: 'system.StationStore',
                    name: 'entity_id',
                    queryMode: 'local',
                    editable: false,
                    displayField: 'name',
                    valueField: 'id',
                    triggerAction: 'all',
                    allowBlank: false,
                    listeners : {
                        'focus' : function(t,records,eOpts){
                            var store = Ext.data.StoreManager.get('system.DataItemStore');
                            store.load({
                                params : {
                                    'entity_id' : t.getValue()
                                },
                                callback:function(){
                                    me.setEntityId(t.getValue());
                                }
                            });
                        },
                        'select':function(t){
                            var store = Ext.data.StoreManager.get('system.DataItemStore');
                            store.load({
                                params : {
                                    'entity_id' : t.getValue()
                                },
                                callback:function(){
                                    me.setEntityId(t.getValue());
                                }
                            });
                        }
                    }
                }, renderer: function (value,cellmeta,record,rowIndex,columnIndex,store) {
                    if ('' == value || null == value || 0 == value) {
                        record.data.entity_id = null;
                        return null;
                    } else {
                        var store = Ext.data.StoreManager.get('system.StationStore');
                        var index = store.findExact('id', value);
                        return store.getAt(index).get('name');
                    }
                }
                },
                {
                    header: '纳入统计数据项', flex: 2, align: 'center', dataIndex: 'data_item_id', editor: {
                    xtype: 'combo',
                    name: 'data_item_id',
                    store: 'system.DataItemStore',
                    queryMode: 'local',
                    editable: false,
                    displayField: 'data_item_name',
                    valueField: 'id',
                    triggerAction: 'all',
                    allowBlank: false, listeners : {
                        'focus' : function(t,records,eOpts){
                            //if(me.getEntityId() == null){
                            //    return t.getValue();
                            //}else{
                            //    var entityId = null;
                            //    var store = Ext.data.StoreManager.get('system.DataItemStore');
                            //    if(typeof(t.getSelectionModel().getSelection()[0].raw.entity_id) == 'undefined'){
                            //        entityId =  me.getEntityId();
                            //    }else{
                            //        entityId = t.getSelectionModel().getSelection()[0].raw.entity_id;
                            //    }
                            //    store.load({
                            //        params : {
                            //            'entity_id' : entityId
                            //        }
                            //    });
                            //}

                            var entityId = null;
                            var store = Ext.data.StoreManager.get('system.DataItemStore');
                            if(typeof(grid.getSelectionModel().getSelection()[0].raw.entity_id) == 'undefined'){
                                entityId =  me.getEntityId();
                            }else{
                                if(me.getEntityId()==null)
                                    entityId = grid.getSelectionModel().getSelection()[0].raw.entity_id;
                                else
                                    entityId=me.getEntityId();
                            }
                            store.load({
                                params : {
                                    'entity_id' : entityId
                                }
                            });
                        }
                    }
                }, renderer: function (value,cellmeta,record,rowIndex,columnIndex,store) {
                    if ('' == value || null == value || 0 == value) {
                        record.data.data_item_id = null;
                        return null;
                    } else {
                        var store = Ext.data.StoreManager.get('system.DataItemStore');
                        var index = store.find('id', value);
                        var temp = null;
                        try{
                            temp = store.getAt(index).get('data_item_name');
                        }catch(exception){
                            temp = null;
                            record.data.data_item_id = null;
                        }
                        return temp;
                    }
                }
                },
                {
                    header: '流向', width: 95, align: 'center', dataIndex: 'direction', editor: {
                    xtype: 'combo',
                    store: 'system.DictionaryStore',
                    name: 'direction',
                    queryMode: 'local',
                    editable: false,
                    displayField: 'name',
                    valueField: 'id',
                    triggerAction: 'all',
                    allowBlank: false
                }, renderer: function (value,cellmeta,record,rowIndex,columnIndex,store) {
                    if ('' == value || null == value || 0 == value) {
                        //record.data.direction = null;
                        return null;
                    } else {
                        var store = Ext.data.StoreManager.get('system.DictionaryStore');
                        var index = store.find('id', value);
                        return store.getAt(index).get('name');
                    }
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
                        getTip: function (v, meta, record) {
                            if (record.data.id == 0) {
                                return '删除行';
                            } else {
                                return null;
                            }
                        },
                        handler: function (grid, rowIndex, colIndex, item, e, record, row) {
                            if(record.data.id==0){
                                var store = grid.getStore();
                                store.remove(store.getAt(rowIndex));
                            }
                        }
                    }]
                }
            ],
            selType: 'cellmodel',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1,
                pluginId: 'cellplugin'
            })],
            buttons: [{
                xtype: 'jbutton',
                action: 'add'
            }, {
                xtype: 'jbutton',
                action: 'save'
            }]
        });

        Ext.apply(this, {
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'treepanel',
                region: 'west',
                width: 250,
                store: 'config.PipeLineTreeStore',
                rootVisible: false
            }, {
                xtype: 'panel',
                border: true,
                region: 'center',
                tbar: [Ext.create('Jm.button.Button', {
                    iconCls: 'add',
                    text: '新增管线配置',
                    action: 'addLink'
                })],
                layout: 'border',
                items: [{
                    region: 'north',
                    xtype: 'form',
                    url: projectGP('/config/savePipeLine'),
                    items: [{
                        margin: '10 0 15 10',
                        defaults: {
                            fieldWidth: 70
                        },
                        items: [{
                            xtype: 'hidden',
                            name: 'id'
                        }, {
                            layout: 'column',
                            items: [{
                                columnWidth: .3,
                                items: [{
                                    xtype: 'combo',
                                    name: 'from_area_id',
                                    fieldLabel: '起点区域',
                                    allowBlank: false,
                                    store: 'data.AllAreaStore',
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    editable: false,
                                    emptyText: '请选择区域',
                                    triggerAction: 'all'
                                }]
                            }, {
                                columnWidth: .3,
                                items: [{
                                    xtype: 'combo',
                                    name: 'to_area_id',
                                    fieldLabel: '终点区域',
                                    allowBlank: false,
                                    store: 'data.AllAreaStore',
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    editable: false,
                                    emptyText: '请选择区域',
                                    triggerAction: 'all'
                                }]
                            }]
                        }, {
                            xtype: 'textarea',
                            fieldLabel: '描述信息',
                            name: 'description',
                            width: 700,
                            grow: true
                        }]
                    }],
                    buttons: [{
                        xtype: 'jbutton',
                        action: 'save'
                    }]
                }, grid]
            }]
        });
        this.callParent(arguments);
    }
});