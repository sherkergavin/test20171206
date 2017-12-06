Ext.define('inas.controller.alarm.AlarmActiveController', {
    extend: 'Ext.app.Controller',
    stores: ['alarm.AllAlarmActiveStore', 'system.DictionaryStore', 'data.DataFormatStore'],
    views: ['alarm.AlarmActiveView'],
    models: ['alarm.AlarmActiveModel'],
    refs: [
        {
            ref: 'alarmActiveView',
            selector: 'alarmActiveView'
        }, {
            ref: 'alarmHistoryView',
            selector: 'alarmHistoryView'
        }

    ],
    init: function () {
        this.control({
            'alarmActiveView': {
                render: this.doLoad
            },
            'alarmActiveView button[action=search]': {
                click: this.doSearch
            },
            'alarmActiveView button[action=submit]': {
                click: this.doSubmit
            },
            'alarmActiveView button[action=cancel]': {
                click: this.doActiveCancle
            },
            'alarmActiveView button[action=clear]': {
                click: this.doClear
            }

        });
    },

    /**
     * 初始化加载combo
     */
    doLoad: function () {
        var me = this;
        me.getAlarmActiveView().down('grid').getStore().load();

        me.getAlarmActiveView().down('combo[name="type"]').getStore().load({
            params: {type: Jm.DB.Constant.DICTIONARY_TYPE_ALRAMTYPE},
            callback: function (records, operation, success) {
                var nullValue = {
                    id: null,
                    name: '空'
                };
                me.getAlarmActiveView().down('combo[name="type"]').getStore().insert(0, nullValue);//给下拉框加入空值
            }
        });
        me.getAlarmActiveView().down('combo[name="severity"]').getStore().load({
            params: {type: Jm.DB.Constant.DICTIONARY_TYPE_ALRAMLEVEL},
            callback: function (records, operation, success) {
                var nullValue = {
                    id: null,
                    name: '空'
                };
                me.getAlarmActiveView().down('combo[name="severity"]').getStore().insert(0, nullValue);//给下拉框加入空值
            }
        });
        me.getAlarmActiveView().down('combo[name="data_item_id"]').getStore().load({
            params: {'code': 'analog'},
            callback: function (records, operation, success) {
                var nullValue = {
                    id: null,
                    name: '空'
                };
                me.getAlarmActiveView().down('combo[name="data_item_id"]').getStore().insert(0, nullValue);//给下拉框加入空值
            }
        });

    },

    doSearch: function () {
        //获取各个查询组件的值
        var activeView = this.getAlarmActiveView();
        var sType = activeView.down('textfield[name="type"]').getValue();
        var sdataItemId = activeView.down('textfield[name="data_item_id"]').getValue();
        var sseverity = activeView.down('textfield[name="severity"]').getValue();
        var sMessage = activeView.down('textfield[name="message"]').getValue();
        activeView.down('grid').getStore().load({
            params: {
                'type': sType,
                'data_item_id': sdataItemId,
                'severity': sseverity,
                'message': sMessage
            }
        });
    },

    doSubmit: function () {
        var me = this;
        var grid = me.getAlarmActiveView().down('grid');
        var record = grid.getSelectionModel().getSelection();
        if (record.length == 0) {
            Jm.Msg.warning('请先选择您要操作的行!');
        } else {
            var ids = [];
            for (var i = 0; i < record.length; i++) {
                var id = record[i].get('id');
                if (null != id && '' != id && 0 != id) {
                    ids.push(id);
                }
            }
            if (null != ids && '' != ids) {
                Ext.Ajax.request({
                    url: projectGP('/alarm/show/updateAlarmActiveToHistory'),
                    params: {
                        jsonResult: Ext.encode(ids)
                    },
                    success: function (response) {
                        var text = response.responseText;
                        grid.getStore().load();
                    }
                });
            }
        }
    },
    doClear: function () {
        var me = this;
        var grid = me.getAlarmActiveView().down('grid');
        var record = grid.getSelectionModel().getSelection();
        if (record.length == 0) {
            Jm.Msg.warning('请先选择您要操作的行!');
        } else {
            var ids = [];
            for (var i = 0; i < record.length; i++) {
                var id = record[i].get('id');
                if (null != id && '' != id && 0 != id) {
                    ids.push(id);
                }
            }
            if (null != ids && '' != ids) {
                Ext.Ajax.request({
                    url: projectGP('/alarm/show/deleteAlarmActiveToHistory'),
                    params: {
                        jsonResult: Ext.encode(ids)
                    },
                    success: function (response) {
                        var text = response.responseText;
                        grid.getStore().load();
                    }
                });
            }
        }
    }
});