/**
 * Created by JM-SD09 on 2015/9/25.
 */
Ext.define('inas.controller.work.SwitchWindowController', {
    extend: 'Ext.app.Controller',
    models: ['data.ExtityComModel'],
    views: ['work.SwitchWindow', 'work.SwitchWinForm', 'work.SwitchMiddleWindow'],
    stores: ['data.EntityComboBox', 'data.ItemComboBox', 'data.MiddleEntityTypeStore', 'data.MiddleEntityStore'],
    refs: [{
        ref: 'switchPanel',
        selector: 'switchPanel'
    }, {
        ref: 'switchWindow',
        selector: 'switchWindow'
    }, {
        ref: 'switchWinForm',
        selector: 'switchWinForm'
    }, {
        ref: 'radioGroupValue',
        selector: 'switchWinForm>form>radiogroup'
    }, {
        ref: 'switchWinGrid',
        selector: 'switchWinGrid'
    }],
    init: function () {
        this.control({
            'switchWindow button[action=close]': {
                click: this.onClose
            },
            'switchWindow button[action=save]': {
                click: this.onSave
            },
            'switchWindow button[action=add]': {
                click: this.onAdd
            },
            'switchWindow button[action=edit]': {
                click: this.onEdit
            },
            'switchWinForm button[action=submit]': {
                click: this.onSubmit
            },
            'switchWinForm button[action=close]': {
                click: this.onFormClose
            },
            'switchWindow grid[name=switchWinGrid]':{
                itemdblclick: this.onEdit
            }
        })
    },
    onClose: function () {
        this.getSwitchWindow().close();
        var panel = this.getSwitchPanel();
        var grid = panel.down('grid[name=switchGrid]');
        grid.getStore().reload();
    },
    onSave: function () {
        var panel = this.getSwitchPanel();
        var sGrid = panel.down('grid[name=switchGrid]');
        var entity_id = null;
        var tree = panel.down('treepanel[name=switchTree]');
        var selected = tree.getSelectionModel().getSelection();
        var treeArray = new Array();
        for (var i = 0; i < selected.length; i++) {
            entity_id = selected[i].raw.tid;
        }
        var win = this.getSwitchWindow();
        var grid = win.down('grid[name=switchWinGrid]');
        var form = win.down('form[name=switchWinForm]');
        var data_item_id = form.down('hiddenfield[name=id]').getValue();
        var recordTime = form.down('hiddenfield[name=recordTime]').getValue();
        form.down('hiddenfield[name=id]').getValue();
        if (grid.getStore().getCount() == 0) {
            grid.getStore().reload({
                params: {
                    data_item_id: data_item_id,
                    recordTime: recordTime
                }
            });
            win.close();
            return;
        }
        form.getForm().submit({
            method: 'POST',
            url: projectGP('/data/updateMiddleStuts'),
            success: function (forms, action) {
                sGrid.getStore().reload({
                    params: {
                        entity_id: entity_id,
                        selectTime: recordTime
                    }
                });
                grid.getStore().reload({
                    params: {
                        data_item_id: data_item_id,
                        recordTime: recordTime
                    }
                });
                win.close();
            }
        })
    },
    onAdd: function () {
        //var window = this.getSwitchWindow();
        //var winForm = window.down('form[name=switchWinForm]');
        //var data_item_id = winForm.down('hiddenfield[name=id] ').getValue();
        //var data_item_name = winForm.down('textfield[name=data_item_name] ').getValue();
        //var type = winForm.down('hiddenfield[name=type] ').getValue();
        //var entity_name = winForm.down('textfield[name=entity_name] ').getValue();
        //var win = Ext.create("inas.view.work.SwitchWinForm");
        //var form = win.down('form[name=switchWindowForm]');
        //form.down('hiddenfield[name=id] ').setValue(data_item_id);
        //form.down('textfield[name=data_item_name] ').setValue(data_item_name);
        //form.down('textfield[name=entity_name] ').setValue(entity_name);
        //form.down('hiddenfield[name=type] ').setValue(type);
        //win.show();

        //alert('123');
        var win = this.getSwitchWindow();
        var winForm = win.down('form[name=switchWinForm]');
        var addWin = Ext.create('inas.view.work.SwitchMiddleWindow');
        addWin.down('textfield[name="user_name"]').hide();
        addWin.setTitle('新增开关车指令');
        var entity_type_id = winForm.down('hiddenfield[name="entity_type_id"]').getValue();
        var entity_id = winForm.down('hiddenfield[name="entity_id"]').getValue();
        var data_item_id = winForm.down('hiddenfield[name="data_item_id"]').getValue();
        var entity_name = winForm.down('textfield[name="entity_name"]').getValue();
        var data_item_name = winForm.down('textfield[name="data_item_name"]').getValue();
        var data_format_id = winForm.down('hiddenfield[name="data_format_id"]').getValue();
        if (data_format_id == 108) {
            edtWin.down('radio[id="op_order1"]').setBoxLabel('进水');
            edtWin.down('radio[id="op_order2"]').setBoxLabel('关水');
            edtWin.down('radio[id="op_order3"]').hide();
        }
        if(entity_type_id ==2) {
            addWin.down('combobox[name="entity_type_id"]').setValue(2);
        }else{
            addWin.down('combobox[name="entity_type_id"]').setValue(3);
        }
        addWin.down('combobox[name="entity_name"]').setRawValue(entity_name);
        addWin.down('combobox[name="data_item_name"]').setRawValue(data_item_name);
        addWin.down('hiddenfield[name="data_item_id"]').setValue(data_item_id);
        addWin.show();
    },

    onEdit: function () {
        //var window = this.getSwitchWindow();
        //var grid=window.down("grid");
        //var record=grid.getSelectionModel().getSelection()[0];
        //if(record==null||record==''){
        //    Ext.Msg.alert("提示","请选择要修改的数据")
        //}
        //else {
        //    var winForm = window.down('form[name=switchWinForm]');
        //    var data_item_id = winForm.down('hiddenfield[name=id] ').getValue();
        //    var data_item_name = winForm.down('textfield[name=data_item_name] ').getValue();
        //    var type = winForm.down('hiddenfield[name=type] ').getValue();
        //    var entity_name = winForm.down('textfield[name=entity_name] ').getValue();
        //    var win = Ext.create("inas.view.work.SwitchWinForm");
        //    var form = win.down('form[name=switchWindowForm]');
        //    form.getForm().loadRecord(record);
        //    form.down('textfield[name=data_item_name] ').setValue(data_item_name);
        //    form.down('textfield[name=entity_name] ').setValue(entity_name);
        //    form.down('hiddenfield[name=id] ').setValue(data_item_id);
        //    form.down('hiddenfield[name=type] ').setValue(type);
        //    //form.down('textfield[name=start_stop_before_pressure1] ').setValue(0);
        //    //form.down('textfield[name=start_stop_before_pressure2] ').setValue(1);
        //    //form.down('textfield[name=start_stop_after_pressure1] ').setValue(2);
        //    //form.down('textfield[name=start_stop_after_pressure2] ').setValue(3);
        //    //form.down('radio[name=data_value] ').setValue(1);
        //    //form.down('datetime[name=recordTime] ').setValue(2342);
        //    win.show();
        //}
        var win = this.getSwitchWindow();
        var grid = win.down('grid[name=switchWinGrid]');
        var winForm = win.down('form[name=switchWinForm]');
        var selRec = grid.getSelectionModel().getSelection()[0];
        if (selRec) {
            var edtWin = Ext.create('inas.view.work.SwitchMiddleWindow');
            edtWin.setTitle('修改开关车指令');
            selRec = grid.getStore().findRecord('id', selRec.get('id'));
            var data_format_id = winForm.down('hiddenfield[name="data_format_id"]').getValue();
            if (data_format_id == 108) {
                edtWin.down('radio[id="op_order1"]').setBoxLabel('进水');
                edtWin.down('radio[id="op_order2"]').setBoxLabel('关水');
                edtWin.down('radio[id="op_order3"]').hide();
            }
            edtWin.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
            edtWin.down('hiddenfield[name="data_item_id"]').setValue(winForm.down('hiddenfield[name="data_item_id"]').getValue());
            edtWin.down('combobox[name="entity_type_id"]').disable();
            edtWin.down('radio[id="op_order1"]').disable();
            edtWin.down('radio[id="op_order2"]').disable();
            edtWin.down('radio[id="op_order3"]').disable();
            edtWin.down('textfield[name="user_name"]').disable();
            if(winForm.down('hiddenfield[name="entity_type_id"]').getValue()==2) {
                edtWin.down('combobox[name="entity_type_id"]').setRawValue('水厂');
            }else{
                edtWin.down('combobox[name="entity_type_id"]').setRawValue('泵站');
            }
            edtWin.down('combobox[name="entity_name"]').setRawValue(winForm.down('textfield[name=entity_name"]').getValue());
            edtWin.down('combobox[name="data_item_name"]').setRawValue(winForm.down('textfield[name=data_item_name"]').getValue());
            edtWin.down('datetimefield[name="order_time1"]').setValue(selRec.get('order_time'));
            edtWin.down('datetimefield[name="repl_order_time1"]').setValue(selRec.get('repl_order_time'));
            edtWin.down('textfield[name="pressure_before"]').setValue(selRec.get('pressure_before'));
            edtWin.down('textfield[name="pressure2_before"]').setValue(selRec.get('pressure2_before'));
            edtWin.down('textfield[name="pressure3_before"]').setValue(selRec.get('pressure3_before'));
            edtWin.down('textfield[name="pressure_after"]').setValue(selRec.get('pressure_after'));
            edtWin.down('textfield[name="pressure2_after"]').setValue(selRec.get('pressure2_after'));
            edtWin.down('textfield[name="pressure3_after"]').setValue(selRec.get('pressure3_after'));
            edtWin.down('textfield[name="user_name"]').setValue(selRec.get('user_name'));
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
            edtWin.show();
        } else {
            Jm.Msg.warning('请选中所需要编辑的数据！');
        }

    },
    onFormClose: function () {
        this.getSwitchWinForm().close();
    },
    onSubmit: function () {
        var window = this.getSwitchWindow();
        var sGrid = this.getSwitchPanel().down('grid[name=switchGrid]');
        var grid = window.down('grid[name=switchWinGrid]');
        var win = this.getSwitchWinForm();
        var form = win.down('form[name=switchWindowForm]');
        var winForm = this.getSwitchWinForm();
        var data_item_id = winForm.down('hiddenfield[name=id]').getValue();

        form.down('hiddenfield[name=data_item_id]').setValue(data_item_id);
        var value = this.getRadioGroupValue().getValue().data_value;

        var panel = this.getSwitchPanel();
        var entity_id = null;
        var tree = panel.down('treepanel[name=switchTree]');
        var selected = tree.getSelectionModel().getSelection();
        var treeArray = new Array();
        for (var i = 0; i < selected.length; i++) {
            entity_id = selected[i].raw.tid;
        }

        if (grid.getStore().getCount() > 0) {
            var record = grid.getStore().getAt(grid.getStore().getCount() - 1);
            var record_time_in_3rd_db = record.data.record_time_in_3rd_db;
            var data_value = record.data.data_value;
        }
        if (form.isValid()) {
        if (value == null) {
            return Jm.MessageBox.error('必须选择一个指令!');
        } else if (value == data_value && data_value == 1) {
            return Jm.MessageBox.error('必须选择停指令!');
        } else if (value == data_value && data_value == 0) {
            return Jm.MessageBox.error('必须选择开指令!');
        }
        var textDate = this.getSwitchWinForm().down('textfield[name=recordTime]').getValue();
        if (grid.getStore().getCount() > 0) {
            if (textDate <= record_time_in_3rd_db) {
                return Jm.MessageBox.error('添加失败,时间必须大于\t最后一条记录时间');
            }
        }


            form.getForm().submit({
                method: 'POST',
                url: projectGP('/data/saveMiddle'),
                success: function (forms, action) {
                    grid.getStore().load({
                        params: {
                            data_item_id: data_item_id,
                            recordTime: textDate
                        }
                    });
                    sGrid.getStore().load({
                        params: {
                            entity_id: entity_id,
                            selectTime: textDate
                        }
                    });
                    win.close();
                },
                failure: function (forms, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            });

        }
    }
});