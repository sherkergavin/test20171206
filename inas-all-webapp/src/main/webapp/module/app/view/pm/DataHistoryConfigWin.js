/**
 * Created by WangJm on 2016/1/27.
 */
Ext.define('inas.view.pm.DataHistoryConfigWin', {
    extend: 'Ext.window.Window',
    requires: [
        'Jm.button.Button'
    ],
    config : {
        entityName : null
    },
    initComponent: function () {
        var me = this;

        var grid = Ext.create('Ext.grid.Panel',{
            region: 'center',
            border: true,
            autoScroll : true,
            flex: 2,
            title: '数据项',
            store: 'pm.DataItemStore',
            columns: [
                {header: '', dataIndex: 'id', hidden: true},
                {header: '数据项名称', flex: 1, dataIndex: 'data_item_name'}
            ],
            listeners : {
                render : function(t){
                    t.getStore().removeAll();
                },
                itemdblclick : function(t,record){
                    var flag = true;
                    var id = t.getSelectionModel().getSelection()[0].raw.id;
                    var name = t.getSelectionModel().getSelection()[0].raw.data_item_name;
                    var itemStore = itemGrid.getStore();
                    itemStore.each(function(f){
                        if(f.data.id == id){
                            flag = false;
                        }
                    });
                    if(flag){
                        name = me.getEntityName()+'('+name+')';
                        var data = [[id,name]];
                        itemStore.add(data);
                    }else{
                        Jm.Msg.warning('此项目已添加!');
                    }
                }
            }
        });

        var itemGrid = Ext.create('Ext.grid.Panel',{
            region: 'center',
            autoScroll : true,
            title: '已选项目',
            store : 'pm.DataHistoryConfigStore',
            columns: [
                {header: '', dataIndex: 'id', hidden: true},
                {xtype: 'rownumberer',text:'',width:35},
                {header: '数据项名称', flex: 1, dataIndex: 'name',align : 'center'},
                {
                    xtype: 'actioncolumn', align: 'center',
                    width: 50,
                    items: [{
                        getClass: function (v, meta, record) {
                            return 'close';
                        },
                        getTip: function () {
                            return '删除行';
                        },
                        handler: function (grid, rowIndex, colIndex, item, e, record, row) {
                            if(rowIndex == 0){
                                Jm.Msg.warning("主项不能删!");
                            }else{
                                var store = grid.getStore();
                                store.remove(store.getAt(rowIndex));
                            }
                        }
                    }]
                }
            ]
        });

        Ext.apply(me, {
            title: '项目配置',
            width: 1000,
            height: 650,
            modal: true,
            layout: 'border',
            items: [{
                region: 'north',
                xtype: 'panel',
                height : 350,
                layout: 'border',
                resizable: false,
                autoScroll : true,
                items: [{
                    region: 'west',
                    xtype: 'treepanel',
                    border: true,
                    title : '站点',
                    width: 300,
                    store: 'pm.StationTypeTreeStore',
                    name: 'stationTypeTree',
                    autoScroll : true,
                    forceFit: true,
                    rootVisible: false,
                    listeners: {
                        render: function (t) {
                            t.store.load({
                                callback: function (records, operation, success) {
                                    t.expandAll();
                                }
                            });
                        },
                        itemclick:function(t, record){
                            if (record.get('parentId') != 'root') {
                                grid.getStore().load({
                                    params: {
                                        'entity_id': record.raw.tid
                                    }
                                });
                                me.setEntityName(record.raw.text);
                            } else {
                                grid.getStore().removeAll();
                            }
                        }
                    }
                },grid]
            },itemGrid]
        });
        this.callParent(arguments);
    }
});