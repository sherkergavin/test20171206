Ext.define('inas.controller.data.DataFormatWinController', {
    extend: 'Ext.app.Controller',
    stores: ['pm.DataSpecComboStore','system.DictionaryStore'],
    views: ['pm.DataFormatWin','data.DataFormat'],
    models:['system.DictionaryModel'],
    refs: [
        {
            ref:'dataFormatWin',
            selector:'dataFormatWin'
        },
        {
            ref:'dataFormat',
            selector:'dataFormat'
        },
        {
            ref:'dataFormatName',
            selector:'dataFormatWin>form[name="dataValueForm"]>hiddenfield[name="name"]'
        }
    ],

    init: function () {
        this.control({
            'dataFormatWin':{
                render:this.winDoload,
                close: this.closeWindow
            },
            'dataFormatWin button[action="save"]': {
                click: this.saveWinChange
            },
            'dataFormatWin button[action="reset"]': {
                click: this.resetWin
            },
            'dataFormatWin form>combo[name="data_format_id"]':{
                change:this.dataFormatChange
            },
            'dataFormatWin form>textfield[jm="formatname"]':{
                change:this.dataFormatTextChange
            }
        })
    },
    winDoload:function(){
        var dataWin=this.getDataFormatWin();
        dataWin.down('combo[name="data_format_id"]').store.load({
            params:{
                'code':dataWin.getController()
            }
        });
        dataWin.down('combo[name="data_type"]').store.load({
            params:{
                type:Jm.DB.Constant.DICTIONARY_TYPE_DATASTATUS
            }
        });
        dataWin.down('combo[name="dictionaryId"]').store.load({
            params:{
                type:Jm.DB.Constant.DICTIONARY_TYPE_SWITCHINGVALUE
            }
        });
        //dataWin.down('combo[name="data_spec"]').store.load();
    },
    saveWinChange:function(){
        var ftPanel=this.getDataFormat().down('panel[name="formatPanel"]');
        var actGrid=ftPanel.layout.getActiveItem();
        var dataWin=this.getDataFormatWin();
        var formatId=dataWin.getTreeId();
        var dataFm=dataWin.down('form').getForm();

        var temp = this.getDataFormatWin().down('form[name="dataValueForm"]').down('combo[name="data_format_id"]');

        if(dataWin.getController()=='analog'){
            dataFm.submit({
                method: "POST",
                params: {
                },
                url: projectGP('/format/saveDataFormatEntity'),
                success: function (form, action) {
                    //actGrid.store.load({
                    //    params : {
                    //        //'typeId' : formatId
                    //        'code':dataWin.getController()
                    //    }
                    //});
                    dataWin.close();
                }
                ,
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Jm.MessageBox.error('表单字段不得提交无效值！');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Jm.MessageBox.error('请求失败！');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Jm.MessageBox.error(action.result.handle);
                    }
                }
            });
        }else if(dataWin.getController()=='switching'){
            dataFm.submit({
                method: "POST",
                params: {
                },
                url: projectGP('/format/saveDataFormatSwitching'),
                success: function (form, action) {
                    //actGrid.store.load({
                    //    params : {
                    //        //'typeId' : formatId
                    //        'code':dataWin.getController()
                    //    }
                    //});
                    dataWin.close();
                }
                ,
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Jm.MessageBox.error('表单字段不得提交无效值！');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Jm.MessageBox.error('请求失败！');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Jm.MessageBox.error(action.result.handle);
                    }
                }
            });
        }


    },
    closeWindow: function () {
        var ftPanel=this.getDataFormat().down('panel[name="formatPanel"]');
        var actGrid=ftPanel.layout.getActiveItem();
        var dataWin=this.getDataFormatWin();
        var formatId=dataWin.getTreeId();
        actGrid.store.load({
            params : {
                'code' : dataWin.getController()
            }
        });
    },
    resetWin:function(){
        var form=this.getDataFormatWin().down('form').getForm();
        var id=form.findField('id').getValue();
        //var combo=form.down(combo[name=""])
        var type=form.findField('data_type').getValue();
        if(id==null || id==''){
            form.reset();
            form.findField('data_type').setValue(type);
        }else{
            form.findField('data_type').setValue(type);
            form.findField('id').setValue(id);
            var ftPanel=this.getDataFormat().down('panel[name="formatPanel"]');
            var mGrid=ftPanel.layout.getActiveItem();
            var recode=mGrid.getSelectionModel().getSelection()[0];
            if(recode){
                form.loadRecord(recode);
            }
        }
    },
    dataFormatChange:function(t){
        this.getDataFormatName().setValue(t.getRawValue());
    },
    dataFormatTextChange:function(t,newValue){
        this.getDataFormatName().setValue(newValue);
    }
});