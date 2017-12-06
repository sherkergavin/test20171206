/**
 * Created by WangJm on 2015/5/8.
 */
Ext.define('inas.controller.data.DataItemController', {
    extend: 'Ext.app.Controller',
    models: ['inas.model.data.DataItemModel'],
    views: ['inas.view.data.DataItemView'],
    stores: ['pm.StationTypeTreeStore', 'pm.DataItemStore', 'pm.DataFormatStore', 'pm.AllCollectTaskStore', 'pm.CollectTagNameStore', 'system.DictionaryStore'],
    refs: [{
        ref: 'dataItemView',
        selector: 'dataitemview'
    }, {
        ref: 'dataItemGrid',
        selector: 'dataitemview>grid'
    }],
    config: {
        entity_id: '',
        entity_name: '',
        leaf: ''
    },
    init: function () {
        var me = this;
        me.setLeaf(false);
        this.control({
            'dataitemview': {
                show: this.show
            },
            'dataitemview>treepanel[name="stationTypeTree"]': {
                render: this.initStationTypeTree,
                itemclick: this.nodeClick
                //select:this.nodeSelect
            },
            'dataitemview>toolbar>button[action="add"]': {
                click: this.doAdd
            },
            'dataitemview>toolbar>button[action="save"]': {
                click: this.doSave
            }
        });
    },
    initStationTypeTree: function (t, e) {
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },
    show: function (t, eOpts) {
        var me = this;
        var grid = me.getDataItemGrid();
        grid.getStore().removeAll();
        me.getStore('data.DataFormatStore').load();
        me.getStore('system.DictionaryStore').load({
            params: {
                'type': Jm.DB.Constant.DICTIONARY_TYPE_PUMP
            },
            callback: function (records, operation, success) {
                var nullValue = {
                    id: null,
                    name: '空',
                    code: null,
                    type: 0
                };
                me.getStore('system.DictionaryStore').insert(0, nullValue);
            }
        })
    },
    nodeClick: function (t, record, item, index, e, eOpts) {
        var me = this;
        var grid = me.getDataItemGrid();
        //此处默认树的节点为二层，通过代码获知顶层的parentId为root
        if (record.get('parentId') != 'root') {
            me.setLeaf(true);
            grid.getStore().load({
                params: {
                    'entity_id': record.raw.tid
                }
            });
            me.setEntity_id(record.raw.tid);
            me.setEntity_name(record.raw.text);
        } else {
            me.setLeaf(false);
            grid.getStore().removeAll();
        }
    },
    doAdd: function (btn) {
        var me = this;
        if (me.getLeaf()) {
            var grid = me.getDataItemGrid();
            var store = grid.getStore();
            var cellEditing = grid.getPlugin('cellplugin');
            store.insert(store.getCount(), me.getModel('data.DataItemModel'));
            cellEditing.startEdit(store.getCount() - 1, 0);
        }
    },
    doSave: function (btn) {
        var me = this;
        var flag = null;
        var json = [];

        if (me.getLeaf()) {
            var grid = me.getDataItemGrid();
            var modified = grid.getStore().getModifiedRecords();
            Ext.each(modified, function (item) {
                if (null == item.data.data_item_name || '' == item.data.data_item_name) {
                    flag = '项目名不能为空';
                } else if (null == item.data.data_format_id || '' == item.data.data_format_id) {
                    flag = '数据类型必须选择';
                } else {
                    item.data.entity_id = me.getEntity_id();
                }
                json.push(item.data);
            });
            if (json.length > 0) {
                if (flag != null) {
                    Jm.Msg.error(flag);
                } else {
                    Ext.Ajax.request({
                        method: 'POST',
                        url: projectGP('/data/saveDataItemByEntityId'),
                        params: {
                            jsonResult: Ext.JSON.encode(json)
                        },
                        success: function (response) {
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                grid.getStore().load({
                                    params: {
                                        'entity_id': me.getEntity_id()
                                    }
                                });
                            } else {
                                Jm.Msg.error(result.handle);
                            }
                        }
                    });
                }
            } else {
                Jm.Msg.info('没有需要保存的项目！');
            }
        }
    }
});