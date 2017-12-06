Ext.define('inas.controller.alarm.AlarmHistoryController',{
    extend:'Ext.app.Controller',
    stores:['alarm.AllAlarmHistoryStore','system.DictionaryStore','data.DataFormatStore'],
    views:['alarm.AlarmHistoryView'],
    models:['alarm.AlarmActiveModel'],
    refs:[
        {
            ref:'alarmHistoryView',
            selector:'alarmHistoryView'
        }

    ],
    init:function(){
        this.control({
            'alarmHistoryView':{
                render:this.doLoad
            },
            'alarmHistoryView button[action=search]':{
                click:this.doSearch
            },
            'alarmHistoryView button[action=submit]': {
                click: this.doSubmit
            },
            'alarmHistoryView button[action=cancel]':{
                click:this.doCancel
            }

        });
    },

    doLoad:function (){
        var me=this;
        var historyView=me.getAlarmHistoryView();
        var sstartTime= historyView.down('datetimefield[name="startTime"]').getRawValue();
        var sendTime= historyView.down('datetimefield[name="endTime"]').getRawValue();
        historyView.down('grid').getStore().load({
            params:{
                'estart_time':sstartTime,
                'eend_time':sendTime
            }
        });
        historyView.down('combo[name="type"]').getStore().load({
            params:{type:Jm.DB.Constant.DICTIONARY_TYPE_ALRAMTYPE},
            callback: function (records, operation, success) {
                var nullValue={
                    id:null,
                    name:'空'
                };
                historyView.down('combo[name="type"]').getStore().insert(0,nullValue);//给下拉框加入空值
            }
        });
        historyView.down('combo[name="severity"]').getStore().load({
            params:{type:Jm.DB.Constant.DICTIONARY_TYPE_ALRAMLEVEL},
            callback: function (records, operation, success) {
                var nullValue={
                    id:null,
                    name:'空'
                };
                historyView.down('combo[name="severity"]').getStore().insert(0,nullValue);//给下拉框加入空值
            }
        });
        me.getAlarmHistoryView().down('combo[name="data_item_id"]').getStore().load({
            params:{'code':'analog'},
            callback: function (records, operation, success) {
                var nullValue={
                    id:null,
                    name:'空'
                };
                me.getAlarmHistoryView().down('combo[name="data_item_id"]').getStore().insert(0,nullValue);//给下拉框加入空值
            }
        });

    },

    doSearch:function(){
        //获取各个查询组件的值
        var historyView=this.getAlarmHistoryView();
        var sType= historyView.down('textfield[name="type"]').getValue();
        var sacknowledged= historyView.down('textfield[name="acknowledged"]').getValue();
        var sdataItemId= historyView.down('textfield[name="data_item_id"]').getValue();
        var sseverity= historyView.down('textfield[name="severity"]').getValue();
        var sMessage= historyView.down('textfield[name="message"]').getValue();
        var sstartTime= historyView.down('datetimefield[name="startTime"]').getRawValue();
        var sendTime= historyView.down('datetimefield[name="endTime"]').getRawValue();
        historyView.down('grid').getStore().load({
            params:{
                'type':sType,
                'data_item_id':sdataItemId,
                'severity':sseverity,
                'message':sMessage,
                'estart_time':sstartTime,
                'eend_time':sendTime,
                'acknowledged':sacknowledged
            }
        });
    },
    doSubmit: function () {
        var me = this;
        var grid = me.getAlarmHistoryView().down('grid');
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
                    url: projectGP('/alarm/show/updateAlarmHistory'),
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