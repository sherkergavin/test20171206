/**
 * Created by JM-SD09 on 2015/9/21.
 */
Ext.define('inas.controller.data.MiddlePanelController', {
    extend: 'Ext.app.Controller',
    models: ['data.MiddleGridModel', 'data.ExtityComModel'],
    views: ['data.MiddleWindow'],
    stores: ['work.switchTreeStore', 'data.MiddleGridStore', 'data.EntityComboBox', 'data.ItemComboBox', 'data.MiddleEntityTypeStore', 'data.MiddleEntityStore'],
    refs: [{
        ref: 'middlePanel',
        selector: 'middlePanel'
    },
    //    {
    //    ref: 'middleForm',
    //    selector: 'middlePanel>form[name=middleForm]'
    //},
        {
        ref: 'middleGrid',
        selector: 'middlePanel>grid[name=middleGrid]'
    }],
    init: function () {
        this.control({
            'middlePanel': {
                render: this.panelRender
            },
            'middlePanel>grid>toolbar>combobox[name=entity_id]': {
                render: this.onRender,
                select: this.queryItem,
            },
            'middlePanel>grid>toolbar>combobox[name=item_id]':{
                //render: this.onRender
            },
            'middlePanel>grid[name=middleGrid]': {
                render: this.gridRender,
                //select: this.getSelect
            },
            'middlePanel>grid': {
                itemdblclick: this.onEditItem
            },
            'middlePanel>grid>toolbar>button[action=edit]': {
                click: this.onEditItem
            },
            'middlePanel>form>toolbar>button[action=edit]': {
                click: this.onEdit
            },
            'middlePanel>form>toolbar>button[action=save]': {
                click: this.onSave
            }, 'middlePanel>form>toolbar>button[action=reset]': {
                click: this.onReset
            }, 'middlePanel>grid>toolbar>button[action=search]': {
                click: this.onSearch
            }, 'middlePanel>grid>toolbar>button[action=delete]':{
                click: this.ondelete
            }, 'middlePanel>grid>toolbar>button[action=add]':{
                click: this.onAdd
            }
        })
    },
    panelRender: function () {
        var panel = this.getMiddlePanel();
        var grid = this.getMiddleGrid();
        panel.down('combobox[name=item_id]').disable();
    },
    //onEditItem: function (t, record) {
    //    var win = Ext.create('inas.view.data.MiddleWindow');
    //    win.setTitle("编辑开关车指令");
    //    var form = win.down('form[name=middleForm]');//form名称
    //    form.getForm().loadRecord(record);
    //    win.show();
    //},

    onAdd: function () {
        var grid = this.getMiddleGrid();
        var panel = this.getMiddlePanel();
        var addWin = Ext.create('inas.view.data.MiddleWindow');
        addWin.down('textfield[name="user_name"]').hide();
        addWin.setTitle('新增开关车指令');
        addWin.show();
    },

    onEditItem: function () {
        var grid = this.getMiddleGrid();
        var panel = this.getMiddlePanel();
        var selRec = grid.getSelectionModel().getSelection()[0];
        if (selRec) {
            var edtWin = Ext.create('inas.view.data.MiddleWindow');
            edtWin.setTitle('修改开关车指令');
            selRec = grid.getStore().findRecord('id', selRec.get('id'));
            if (selRec.get('data_format_id') == 108) {
                edtWin.down('radio[id="op_order1"]').setBoxLabel('进水');
                edtWin.down('radio[id="op_order2"]').setBoxLabel('关水');
                edtWin.down('radio[id="op_order3"]').hide();
            }
            edtWin.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
            edtWin.down('hiddenfield[name="data_item_id"]').setValue(selRec.get('data_item_id'));
            edtWin.down('combobox[name="entity_type_id"]').disable();
            edtWin.down('radio[id="op_order1"]').disable();
            edtWin.down('radio[id="op_order2"]').disable();
            edtWin.down('radio[id="op_order3"]').disable();
            //edtWin.down('datetimefield[name="repl_order_time1"]').disable();
            edtWin.down('textfield[name="user_name"]').disable();
            edtWin.down('combobox[name="entity_type_id"]').setValue(selRec.get('entity_type_id'));
            edtWin.down('combobox[name="entity_name"]').setRawValue(selRec.get('entity_name'));
            edtWin.down('combobox[name="data_item_name"]').setRawValue(selRec.get('data_item_name'));
            edtWin.down('datetimefield[name="order_time1"]').setValue(selRec.get('order_time'));
            edtWin.down('datetimefield[name="repl_order_time1"]').setValue(selRec.get('repl_order_time'));
            edtWin.down('textfield[name="pressure_before"]').setValue(selRec.get('pressure_before'));
            edtWin.down('textfield[name="pressure2_before"]').setValue(selRec.get('pressure2_before'));
            edtWin.down('textfield[name="pressure3_before"]').setValue(selRec.get('pressure3_before'));
            edtWin.down('textfield[name="pressure_after"]').setValue(selRec.get('pressure_after'));
            edtWin.down('textfield[name="pressure2_after"]').setValue(selRec.get('pressure2_after'));
            edtWin.down('textfield[name="pressure3_after"]').setValue(selRec.get('pressure3_after'));
            edtWin.down('textfield[name="user_name"]').setValue(selRec.get('user_name'));
            edtWin.down('hiddenfield[name="user_id"]').setValue(selRec.get('user_id'));
            edtWin.down('textareafield[name="description"]').setValue(selRec.get('description'));
            if (selRec.get('op_order') == 1){
                edtWin.down('radio[id="op_order1"]').setValue('1');
            }
            if (selRec.get('op_order') == 0){
                edtWin.down('radio[id="op_order2"]').setValue('0');
            }
            if (selRec.get('op_order') == 2){
                edtWin.down('radio[id="op_order3"]').setValue('2');
            };
            edtWin.down('textfield[name="user_name"]').setValue(selRec.get('user_name'));
            edtWin.show();
        } else {
            Jm.Msg.warning('请选中所需要编辑的数据！');
        }
    },


    //onConfirm: function (t, record) {
    //    var grid = this.getMiddleGrid();
    //    var sm = grid.getSelectionModel();
    //    if (sm.getSelection().length == 0) {
    //        return Jm.MessageBox.info("请选择一条数据进行操作");
    //    }
    //    var win = Ext.create('inas.view.data.MiddleConfirmWindow');
    //    win.setTitle("开关车指令确认");
    //    var form = win.down('form[name=middleConfirmForm]');
    //    var select = grid.getSelectionModel().selected;
    //    for (var i = 0; i < select.length; i++) {
    //        var record = select.get(i);
    //        form.getForm().loadRecord(record);
    //    }
    //    win.show();
    //},

    onRender: function (t) {
        t.getStore().load();
    },

    queryItem:function (combo, records) {
        var panel = this.getMiddlePanel();
        var entity_id = panel.down('combobox[name=entity_id]').getValue();
        var item = panel.down('combobox[name=item_id]');
        item.getStore().getProxy().url = projectGP('/data/getItemIdName');
        item.getStore().load({
            params: {
                entity_id: entity_id
            }
        });
    },

    gridRender: function (t) {
        t.getStore().getProxy().url = projectGP('/data/getSelectMiddleAllData');
        t.getStore().load();
    },
    //getSelect: function (t, record, item, index, e, eOpts) {
    //    var form = this.getMiddleForm();
    //    form.getForm().loadRecord(record);
    //    form.down('datetimefield[name=hiddenDateYmd]').setValue(record.data.record_time_in_3rd_db);
    //    form.down('datetimefield[name=hiddenDateYmdHis]').setValue(record.data.record_time_in_3rd_db);
    //    form.down('datetimefield[name=recordTime]').setValue(record.data.record_time_in_3rd_db);
    //
    //},
    //onEdit: function (t) {
    //    var panel = this.getMiddlePanel();
    //    var id=panel.down('form hiddenfield[name=id]').getValue();
    //    if(id==""){
    //        return Jm.MessageBox.error("请选择站点");
    //    }
    //    t.disable();
    //    panel.down('form textfield[name=entity_name]').enable();
    //    panel.down('form textfield[name=user_name]').enable();
    //    panel.down('form radiogroup').enable();
    //    panel.down('form datetimefield[name=recordTime]').enable();
    //    panel.down('form textarea').enable();
    //    panel.down('form toolbar button[action=save]').enable();
    //    panel.down('form toolbar button[action=reset]').enable();
    //
    //},
    //onSave: function () {
    //    var form = this.getMiddleForm();
    //    var record_time_in_3rd_db = form.down('textfield[name=recordTime]').getValue();
    //    var grid = this.getMiddleGrid();
    //    var panel = this.getMiddlePanel();
    //    var entity_id = panel.down('combobox[name=entity_id]').getValue();
    //    var startTime = panel.down('datetimefield[name=startTime]').getValue();
    //    var endTime = panel.down('datetimefield[name=endTime]').getValue();
    //    this.getMiddleForm().getForm().submit({
    //        method: 'POST',
    //        url: projectGP('/data/updateMiddle'),
    //        success: function (forms, action) {
    //            grid.getStore().load({
    //                params: {
    //                    entity_id: entity_id,
    //                    startTime: startTime,
    //                    endTime: endTime
    //                }
    //
    //            });
    //            form.down('datetimefield[name=hiddenDateYmd]').setValue(record_time_in_3rd_db);
    //            form.down('datetimefield[name=hiddenDateYmdHis]').setValue(record_time_in_3rd_db);
    //            panel.down('form textfield[name=entity_name]').disable();
    //            panel.down('form textfield[name=user_name]').disable();
    //            panel.down('form radiogroup').disable();
    //            panel.down('form datetimefield[name=recordTime]').disable();
    //            panel.down('form textarea').disable();
    //            panel.down('form toolbar button[action=save]').disable();
    //            panel.down('form toolbar button[action=reset]').disable();
    //            panel.down('form toolbar button[action=edit]').enable();
    //        },
    //        failure: function (forms, action) {
    //            Jm.MessageBox.error(action.result.handle);
    //        }
    //    });
    //},
    //onReset: function () {
    //    var me = this;
    //    var mGrid = me.getMiddleGrid();
    //    var form = me.getMiddleForm();
    //    var id = form.getForm().findField('id').getValue();
    //    var selected = mGrid.getSelectionModel().getSelection();
    //    var record = null;
    //    for(var i=0;i<selected.length;i++){
    //        record = selected[i];
    //    }
    //    form.getForm().reset();
    //    if (id != null && id != '') {
    //        var recode = mGrid.getSelectionModel().getSelection()[0];
    //        recode = mGrid.getStore().findRecord('id', recode.get('id'));
    //        if (recode) {
    //            form.down('datetimefield[name=recordTime]').setValue(record.data.record_time_in_3rd_db);
    //            form.getForm().loadRecord(recode);
    //        }
    //    }
    //},
    onSearch: function () {
        var panel = this.getMiddlePanel();
        var grid = panel.down('grid[name=middleGrid]');
        var entity_id = panel.down('combobox[name=entity_id]').getValue();
        var startTime = panel.down('datetimefield[name=startTime]').getValue();
        var endTime = panel.down('datetimefield[name=endTime]').getValue();
        var item_id = panel.down('combobox[name=item_id]').getValue();
        if (entity_id == null || entity_id == '') {
            return Jm.MessageBox.error('请选择站点');
        }
        if (item_id == null || entity_id == '') {
            return Jm.MessageBox.error('请选择泵');
        }
        grid.getStore().getProxy().url = projectGP('/data/getSelectByDateMiddle');
        grid.getStore().load({
            params: {
                entity_id: entity_id,
                startTime: startTime,
                endTime: endTime,
                item_id: item_id
            }
        });
        var store = grid.getStore();
        //for (var i=0;i<store.getCount();i++) {
        //    var pressure_before = store.getAt(i).get('pressure_before');
        //    var pressure2_before = store.getAt(i).get('pressure2_before');
        //    var pressure3_before = store.getAt(i).get('pressure3_before');
        //    var pressure_after = store.getAt(i).get('pressure_after');
        //    var pressure2_after = store.getAt(i).get('pressure2_after');
        //    var pressure3_after = store.getAt(i).get('pressure3_after');
        //    var pressure_all = '123';
        //    store.getAt(i).set('pressure_all','12');
        //}
    },
    ondelete: function () {
        var me = this;
        var grid = me.getMiddleGrid();
        var selRec = grid.getSelectionModel().getSelection()[0];
        if (selRec) {
            Jm.Msg.confirm('确定删除该行数据吗?', function (btn) {
                if (btn == 'ok') {
                    Ext.Ajax.request({
                        url: projectGP('/data/delDataMiddLe'),
                        params: {
                            data_item_id: selRec.get('data_item_id'),
                            order_time:selRec.get('order_time')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if(res.success){
                                grid.store.reload();
                            } else {
                                Jm.MessageBox.error(res.handle);
                            }
                        }
                    });
                }
            });
        } else {
            Jm.Msg.warning('请选中需要删除的数据！');
        }
    }


});