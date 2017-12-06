/**
 * Created by WangJm on 2015/9/16.
 */
Ext.define('inas.controller.config.PipeLineController', {
    extend: 'Ext.app.Controller',
    models: ['config.PipeLineGridModel'],
    stores: ['config.PipeLineTreeStore', 'config.PipeLineItemStore', 'data.AllAreaStore', 'system.StationStore', 'system.DictionaryStore', 'system.DataItemStore'],
    views: ['config.PipeLineView'],
    refs: [{
        ref: 'configPipeLineView',
        selector: 'configPipeLineView'
    }, {
        ref: 'configPipeLineViewForm',
        selector: 'configPipeLineView>panel>form'
    }, {
        ref: 'configPipeLineViewGrid',
        selector: 'configPipeLineView>panel>grid'
    }],
    config: {
        type: null
    },
    init: function () {
        this.control({
            'configPipeLineView': {
                render: this.show
            },
            'configPipeLineView>treepanel': {
                render: this.initTree,
                itemclick: this.nodeClick
            },
            'configPipeLineView>panel>toolbar>button[action="addLink"]': {
                click: this.doLink
            },
            'configPipeLineView>panel>form>toolbar>button[action="save"]': {
                click: this.doSave
            },
            'configPipeLineView>panel>grid>toolbar>button[action="add"]': {
                click: this.doGridAdd
            },
            'configPipeLineView>panel>grid>toolbar>button[action="save"]': {
                click: this.doGridSave
            }
        });
    },
    show: function () {
        var me = this;
        this.getStore('data.AllAreaStore').load();
        this.getStore('system.StationStore').load({
            params:{
                'entity_type_id':Jm.DB.ENTITYTYPE.LIULIANGJIANCEDIAN
            }
        });
        this.getStore('system.DataItemStore').load();
        this.getStore('system.DictionaryStore').load({
            params: {
                'type': Jm.DB.Constant.DICTIONARY_TYPE_FLOW
            }
        });
        var grid = me.getConfigPipeLineViewGrid();
        grid.getStore().removeAll();
    },
    initTree: function (t, e) {
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },
    doLink: function () {
        var form = this.getConfigPipeLineViewForm().getForm();
        form.reset();
    },
    doSave: function () {
        var me = this;
        var form = this.getConfigPipeLineViewForm().getForm();
        if (form.isValid()) {
            var from_id = form.findField('from_area_id').getValue();
            var to_id = form.findField('to_area_id').getValue();

            if (from_id == to_id) {
                Jm.Msg.warning('"起点"与"终点"不能指向同一个区域', function () {
                    return;
                });
            } else {
                form.submit({
                    success: function (fm, action) {
                        Jm.Msg.success('操作成功!');
                        me.show();
                    },
                    failure: function (fm, action) {
                        Jm.Msg.error(action.result.handle);
                    }
                });
            }
        }
    },
    nodeClick: function (t, record, item, index, e, eOpt) {
        var me = this;
        var id = record.raw.view;
        var type = record.raw.lo;

        me.setType(type);
        me.getConfigPipeLineView().setEntityId(null);
        var from_area_id = record.raw.parentId;
        var form = me.getConfigPipeLineViewForm().getForm();
        var grid = me.getConfigPipeLineViewGrid();

        if (record.raw.view != null) {
            Ext.Ajax.request({
                method: 'post',
                url: projectGP('/config/getPipeLineByEntity'),
                params: {
                    'id': id,
                    'from_area_id': from_area_id
                },
                success: function (response) {
                    var result = Ext.JSON.decode(response.responseText);
                    form.setValues(result.data[0]);

                    grid.getStore().load({
                        params: {
                            'link_id': id,
                            'type': type
                        }
                    //    ,
                    //    callback:function(records){
                    //        if(records.length > 0){
                    //            for(var i=0;i<records.length;i++){
                    //                records[i].raw.entity_id;
                    //            }
                    //            //for(var temp in records){
                    //            //    alert(temp.raw.entity_id);
                    //            //}
                    //        }
                    //    }
                    });
                }
            });

            //me.getStore('system.DataItemStore').load({
            //    callback: function (records, operation, success) {
            //
            //    }
            //});
        }else{
            grid.getStore().removeAll();
        }
    },
    doGridAdd: function () {
        var me = this;
        var form = this.getConfigPipeLineViewForm().getForm();
        var id = form.findField('id').getValue();
        if (id != '') {
            var grid = me.getConfigPipeLineViewGrid();
            var store = grid.getStore();
            var cellEditing = grid.getPlugin('cellplugin');
            store.insert(store.getCount(), me.getModel('config.PipeLineGridModel'));
            cellEditing.startEdit(store.getCount() - 1, 0);
        } else {
            Jm.Msg.warning('请先选中所要配置的管线！');
        }
    },
    doGridSave: function () {
        var me = this;
        var flag = null;
        var json = [];
        var grid = me.getConfigPipeLineViewGrid();
        var form = me.getConfigPipeLineViewForm().getForm();
        var modified = grid.getStore().getModifiedRecords();
        var id = form.findField('id').getValue();
        me.getStore('system.DataItemStore').load({
            callback: function (records, operation, success) {
                if (id != '') {
                    Ext.each(modified, function (item) {
                        if (null == item.data.entity_id || '' == item.data.entity_id) {
                            flag = '站点不能为空';
                        } else if (null == item.data.data_item_id || '' == item.data.data_item_id) {
                            flag = '项目不能为空';
                        } else if (null == item.data.direction || '' == item.data.direction) {
                            flag = '流向不能为空';
                        }
                        item.data.link_id = id;
                        json.push(item.data);
                    });
                    if (json.length > 0) {
                        if (flag != null) {
                            Jm.Msg.error(flag);
                        } else {
                            Ext.Ajax.request({
                                method: 'POST',
                                url: projectGP('/config/savePipleLineItem'),
                                params: {
                                    jsonResult: Ext.JSON.encode(json),
                                    type: me.getType()
                                },
                                success: function (response) {
                                    var result = Ext.JSON.decode(response.responseText);
                                    if (result.success) {
                                        Jm.Msg.success('添加成功!');
                                        grid.getStore().load({
                                            params: {
                                                'link_id': id,
                                                'type': me.getType()
                                            }
                                        });
                                    } else {
                                        Jm.Msg.error(result.handle);
                                    }
                                }
                            });
                        }
                    } else {
                        return;
                    }
                } else {
                    Jm.Msg.warning('请先选中所要配置的管线！');
                }
            }
        });
    }
});