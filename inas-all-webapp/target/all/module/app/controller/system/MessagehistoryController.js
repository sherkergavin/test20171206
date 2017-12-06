Ext.define('inas.controller.system.MessagehistoryController', {
    extend: 'Ext.app.Controller',
    stores: [ 'data.AllMessageGroupStore','system.MessageHistoryStore','system.MessageTemplateStore'],
    refs: [{
        ref: 'mesageHistoryView',
        selector: 'mesageHistoryView'
    },
        {
            ref: 'mesageHistoryForm',
            selector: 'mesageHistoryView>form'
        },
        {
            ref: 'mesageHistoryGrid',
            selector: 'mesageHistoryView>grid'
        }
    ],
    init: function () {
        this.control({
            'mesageHistoryView': {
                render:this.doLoad
            },
            'mesageHistoryView>form>toolbar>button[name="groupSend"]':{
                click:this.groupSend
                //群组发送
            },
            'mesageHistoryView>form>toolbar>button[name="singleSend"]':{
                click:this.singleSend
                //单个号码发送
            },
            'mesageHistoryView>toolbar>button[action="search"]':{
                click:this.doSearch
            },
            'mesageHistoryView>form>container>combo[name="templateConbo"]':{
                change:this.doUserTemp
            }

        })
    },


    doLoad:function(){
        this.getMesageHistoryForm().down('combo[name="message_group_id"]').getStore().load();
        this.getMesageHistoryForm().down('combo[name="templateConbo"]').getStore().load();
        var grid=this.getMesageHistoryGrid();
        grid.getStore().load();

    }
    ,


    doUserTemp:function(t, newValue, oldValue, eOpts){
        //alert('change!'+newValue);
        //根据id查询模板内容
        if(newValue!=null && newValue!=''){
          var currentRec=t.getStore().getById(newValue);
          var content=currentRec.get('context');
          var msgForm=this.getMesageHistoryForm();
          msgForm.down('textarea[name="context"]').setValue(content);
        }
    },

    doSearch:function(){
        var msgView=this.getMesageHistoryView();
        var grid=this.getMesageHistoryGrid();
        var search_startTime=msgView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=msgView.down('datefield[name="search_endTime"]').getValue();
        var search_Cont=msgView.down('textfield[name="search_Context"]').getValue();
        grid.getStore().load({
            method:'POST',
            params: {
                startDateStr:search_startTime,
                endDateStr:search_endTime,
                searchContext:search_Cont
            }
        });

    },

    sendMesg:function(type){
        var msgForm=this.getMesageHistoryForm();
        var grid=this.getMesageHistoryGrid();
        var groupId=msgForm.down('combo[name="message_group_id"]');
        var recpNum=msgForm.down('textfield[name="recipient"]');
        if(type=='group'){
            if(null==groupId.getValue() || groupId.getValue()==0 ||""==groupId.getValue()){
                return  Jm.MessageBox.info("如需群发短信，请先选择短信群组");
            }else{
                recpNum.setValue(null);
            }
        }else if(type=='single'){
            if(null==recpNum.getValue() || recpNum.getValue()==0 ||""==recpNum.getValue()){
                return  Jm.MessageBox.info("如需按单个号码发送短信，请先填写有效的手机号码");
            }else{
                groupId.setValue(null);
            }
        }
        if(msgForm.getForm().isValid()){
            msgForm.getForm().submit({
                url:projectGP('/msgHistory/addMessageHistory'),
                success: function(form, action) {
                    grid.getStore().load();
                    msgForm.getForm().reset();
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', '请求失败请联系管理员');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.handle);
                    }
                }
            });
        }
    },

    groupSend:function(){
        //alert('groupSend');
        //群组发送
        this.sendMesg('group');

    }
    ,

    singleSend:function(){
        this.sendMesg('single');
    }

});