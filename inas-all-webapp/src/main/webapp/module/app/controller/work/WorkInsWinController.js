/**
 * Created by ZS on 2015/7/29.
 */
Ext.define('inas.controller.work.WorkInsWinController',{
    extend:'Ext.app.Controller',
    refs:[{
        ref:'instructWin',
        selector:'instructWin'
    },
        {
            ref:'instructForm',
            selector:'instructWin>form'
        },
        {
            ref: 'instructionGrid',
            selector: 'instructionPanel>grid'
        }
    ],
    init:function(){
        this.control({
            'instructWin button[action="save"]':{
                click:this.doSave
            },
            'instructWin button[action="reset"]':{
                click:this.doReset
            }
        });
    },
    doSave:function(btn){
        var me=this;
        var wi=me.getInstructWin();
        var insForm=me.getInstructForm().getForm();
        //var monStr=insForm.findField('daily_date').getValue();
        //var id=insForm.findField('id').getValue();
        //var name=insForm.findField('name').getValue();
        //var mon=Ext.Date.add(new Date(monStr), Ext.Date.DAY, 0);
        //insForm.findField('daily_date').setValue(mon);
        //alert('time:'+monStr+'id:'+id+'name:'+name);
        if (insForm.isValid()) {
            insForm.submit({
                method: "POST",
                //params: {
                    //mon:mon,
                    //id:id,
                    //name:name
                //},
                url: projectGP('/workInstruct/saveInstruct'),
                success: function (fm, action) {
                    wi.close();
                    me.getInstructionGrid().store.reload();
                },
                failure: function (fm, action) {
                    Jm.Msg.error(action.result.handle);
                }

            });
        }
    },
    doReset:function(btn){
        //alert('reset');
        var me=this;
        var form=me.getInstructForm();
        var id=form.getForm().findField('id').getValue();
        form.getForm().reset();
        if(id!=null && id!=''){
            var mGrid=me.getInstructionGrid();
            var recode=mGrid.getSelectionModel().getSelection()[0];
            recode=grid.getStore().findRecord('id',recode.get('id'));
            if(recode){
                form.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
                form.down('datefield[name="mon"]').setValue(selRec.get('daily_date'));
                form.down('textareafield[name="name"]').setValue(selRec.get('name'));
                form.getForm().loadRecord(recode);
            }
        }else{
            form.getForm().findField('id').setValue(id);
        }
    }


});