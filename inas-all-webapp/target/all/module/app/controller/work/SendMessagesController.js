/**
 * Created by ZS on 2015/8/27.
 */
Ext.define('inas.controller.work.SendMessagesController', {
    extend:'Ext.app.Controller',
    views: ['work.SendMessages'],
    stores: ['work.AllMessageGroupStore'],
    refs: [{
        ref: 'messageForm',
        selector: 'messageForm'
    }
    ],
    init: function () {
        this.control(
            {
            'messageForm combo[name="messageGroup"]':{
                render:this.loadCombo
                //,
                //change:this.changeGroup
            }
            ,
            'messageForm button[text="发送"]':{
                click:this.sendMessages
            }
        });
    },

    loadCombo: function () {
        this.getMessageForm().down('combo').getStore().load();
    },

    ////combo改变时给grid，现实收信人展示
    //changeGroup: function (combo, newValue, oldValue, eOpts) {
    //    if(null!=newValue && 0!=newValue){
    //        var messageContainer = this.getMessageForm().down('container[name="accepters"]');
    //    Ext.Ajax.request({
    //        url: projectGP('/messageGroup/getMessageGroupById'),
    //        method: 'post',
    //        params: {
    //            id:newValue
    //        },
    //        success: function (response) {
    //            var myResObj = Ext.JSON.decode(response.responseText);
    //           for()
    //            messageContainer.add("")
    //        }
    //    });
    //    }
    //},


    sendMessages: function (btn) {
        var gid=this.getMessageForm().down('combo').getValue();
        var text=this.getMessageForm().down('textarea').getValue();
        alert('send='+ gid+"text="+text);

        Ext.Ajax.request({
            url: projectGP('/messageGroup/sendMessage'),
            method: 'post',
            params: {
                messageGroupId:gid,
                text:text
            },
            success: function (response) {
                var myResObj = Ext.JSON.decode(response.responseText);
                //for(var i in myResObj){
                //    alert(i);
                //}
                if (myResObj.success) {
                    grid.store.load({
                        params: {
                            bindId: win.bind_id
                        }
                        ,
                        callback: function (records, operation, success) {
                        }
                    });
                }else{
                    Jm.MessageBox.error(myResObj.handle);
                }
            }
        });
    }
});