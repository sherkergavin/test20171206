/**
 * Created by luyufei on 2016/4/18.
 */

Ext.define('inas.controller.workflow.ChongxiWinController',{
    extend:'Ext.app.Controller',
    views: ['workflow.ChongxiWin'],
    stores:['workflow.ChongxiStore'],
    refs:[
        {
           ref:'chongxiWin',
           selector:'chongxiWin'
        },
        {
           ref:'chongxiForm',
           selector:'chongxiWin>form'
        },
        {
            ref:'chongxiGrid',
            selector:'chongxiNewView>grid'
        }
    ],
    init:function(){
        this.control({
            'chongxiWin>form>button[action="save"]':{
                click:this.doSave
            },

            'chongxiWin>form>button[action="reset"]':{
                click:this.doReset
            }
        });
    },
    doSave:function(btn){
        var me=this;
        var chongxiWin=me.getChongxiWin();
        var chongxiForm=me.getChongxiForm().getForm();
        alert("doSave");
        if (chongxiForm.isValid()) {
            chongxiForm.submit({
                method: "POST",
                url: projectGP('/workflow/saveChongxiForm'),
                success: function (fm, action) {
                    chongxiWin.close();
                    me.getChongxiGrid().getStore().load();
                },
                failure: function (fm, action) {
                    //Jm.Msg.error('加载错误！请联系管理员！'+action);
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                    }
                }

            });
        }
    },
    doReset:function(btn){
        //var me=this;
        //var form=me.getMetRecForm();
        //var id=form.getForm().findField('id').getValue();
        //form.getForm().reset();
        //if(id!=null && id!=''){
        //    var mGrid=me.getMettingRecGrid();
        //    var recode=mGrid.getSelectionModel().getSelection()[0];
        //    recode=mGrid.getStore().findRecord('id',recode.get('id'));
        //    if(recode){
        //        form.getForm().loadRecord(recode);
        //        form.down('fileuploadfield[name="met_img1"]').emptyText=recode.get('img1');
        //        form.down('fileuploadfield[name="met_doc1"]').emptyText=recode.get('doc1');
        //        form.down('fileuploadfield[name="met_img2"]').emptyText=recode.get('img2');
        //        form.down('fileuploadfield[name="met_doc2"]').emptyText=recode.get('doc2');
        //        form.down('fileuploadfield[name="met_img3"]').emptyText=recode.get('img3');
        //        form.down('fileuploadfield[name="met_doc3"]').emptyText=recode.get('doc3');
        //        form.down('fileuploadfield[name="met_img4"]').emptyText=recode.get('img4');
        //        form.down('fileuploadfield[name="met_doc4"]').emptyText=recode.get('doc4');
        //        form.down('datefield[name="hyTime"]').setValue(recode.get('time'));
        //    }
        //}
    }
});