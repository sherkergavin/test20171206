/**
 * Created by WangJm on 2015/8/4.
 */
Ext.define('inas.controller.work.DailyItemController', {
    extend: 'Ext.app.Controller',
    models: ['inas.model.work.DailyItemModel'],
    stores: ['work.DailyItemStore', 'system.OrganiztionStore', 'system.UserStore'],
    views: ['work.DailyItemView'],
    refs: [{
        ref: 'dailyItemView',
        selector: 'dailyItemView'
    }, {
        ref: 'dailyItemGrid',
        selector: 'dailyItemView>grid'
    }, {
        ref: 'dailyShiftForm',
        selector: 'dailyItemView>form'
    }, {
        ref: 'dailyItemTxt',
        selector: 'dailyItemView>textareafield'
    }],
    init: function () {
        this.control({
            'dailyItemView': {
                show: this.show()
            },
            'dailyItemView>toolbar>button[action="add"]': {
                click: this.doAdd
            },
            'dailyItemView>toolbar>button[action="save"]': {
                click: this.doSave
            },
            'dailyItemView>toolbar>button[action="refresh"]': {
                click: this.doRefresh
            },
            'dailyItemView': {
                render: this.doRender
            }
        })
    },
    show: function (t, eOpts) {
        this.getStore('system.OrganiztionStore').load();
        this.getStore('system.UserStore').load({
            params : {
                'role_id':2
            }
        });
    },
    doRefresh: function () {
        this.doRender();
    },
    doAdd: function () {
        var me = this;
        var grid = me.getDailyItemGrid();
        var store = grid.getStore();
        var cellEditing = grid.getPlugin('cellplugin');
        store.insert(store.getCount(), me.getModel('work.DailyItemModel'));
        cellEditing.startEdit(store.getCount() - 1, 0);
    },
    doRender: function () {
        var dateStr = this.getDailyItemView().getDailyDate();
        this.getDailyItemGrid().getStore().load();
        var form = this.getDailyShiftForm().getForm();
        var txtArea = this.getDailyItemView().down('textareafield[name="content"]');
        Ext.Ajax.request({
            method: 'POST',
            url: projectGP('/dailyShift/getDailyShiftsByDate'),
            params: {
                'dailyDateStr': Ext.Date.format(dateStr, 'Y-m-d')
            },
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                form.setValues(result.data[0]);
            }
        });
        Ext.Ajax.request({
            method: 'POST',
            url: projectGP('/workInstruct/getInstructByDate'),
            params: {
                'searchMonth': Ext.Date.format(dateStr, 'Y-m-d')
            },
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if ('undefined' != typeof(result.data)) {
                    txtArea.setValue(result.data.content);
                }
            }
        });
    },
    doSave: function () {
        var me = this;
        var flag = null;
        var json = [];
        var grid = me.getDailyItemGrid();
        var form = me.getDailyShiftForm().getForm();
        var modified = grid.getStore().getModifiedRecords();
        var dateStr = this.getDailyItemView().getDailyDate();

        Ext.each(modified, function (item) {
            json.push(item.data);
        });
        if (json.length > 0) {
            if (flag != null) {
                Jm.Msg.error(flag);
            } else {
                Ext.Ajax.request({
                    method: 'POST',
                    url: projectGP('/work/saveDailyItem'),
                    params: {
                        jsonResult: Ext.JSON.encode(json)
                    },
                    success: function (response) {
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.success) {
                            if (form.isValid()) {
                                form.url = projectGP('/dailyShift/saveDailyShift');
                                form.submit({
                                    method: 'POST',
                                    submitEmptyText: false,
                                    success: function (forms, action) {
                                        me.doRender();
                                    }, failure: function (forms, action) {
                                        Jm.Msg.error(action.result.handle);
                                    }
                                });
                            }
                        } else {
                            Jm.Msg.error(result.handle);
                        }
                    }
                });
            }
        } else {
            if (form.isValid()) {
                form.url = projectGP('/dailyShift/saveDailyShift');
                form.submit({
                    method: 'POST',
                    submitEmptyText: false,
                    success: function (forms, action) {
                        me.doRender();
                    }, failure: function (forms, action) {
                        Jm.Msg.error(action.result.handle);
                    }
                });
            }
        }


    }
});