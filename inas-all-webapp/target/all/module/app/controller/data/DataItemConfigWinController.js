Ext.define('inas.controller.data.DataItemConfigWinController',{
    extend : 'Ext.app.Controller',
    models : ['pm.SourceTypeModel'],
    stores : ['pm.AllCollectTaskStore','pm.CollectTagNameStore'],
    refs : [
        {
            ref : 'dataItemConfigWin',
            selector : 'dataItemConfigWin'
        }
    ],
    init : function () {
        this.control({
            'dataItemConfigWin':{
                render:this.winLoadCom
            },
            'dataItemConfigWin button[name="save"]' : {
                click : this.doSave
            },
            'dataItemConfigWin >form>textfield[name="name"]' : {
                change : this.doChange
            },
            'dataItemConfigWin >grid' : {
                itemclick : this.rowClick
            }
        })
    }
    ,
    //加载combo，接受dataitemId
    winLoadCom:function(){
        var window = this.getDataItemConfigWin();
        var form = window.down('form');
        var tgGrid=window.down('grid[name="tagGrid"]');
        tgGrid.getStore().removeAll();
        var winItemId=window.getData_item_id();
        form.getForm().findField('data_item_id').setValue(winItemId);
        form.down('combo[name="collect_task_id"]').getStore().load();
            Ext.Ajax.request({

                url:projectGP('/collectItem/queryByDataItemId'),
                params: {
                    dataItemId:winItemId
                },
                success: function(response){
                    var text = response.responseText;
                    var repJsonData=Ext.JSON.decode(text).data;
                    //alert(repJsonData.name);
                    form.getForm().setValues(repJsonData);
                }
            });
    },
    //tagaName的提示查询
    doChange : function (t, newValue, oldValue, eOpts ) {
        var collect_task_id = this.getDataItemConfigWin().down('form').getForm().findField('collect_task_id').getValue();
        var grid=this.getDataItemConfigWin().down('grid[name="tagGrid"]');
        if (null != collect_task_id && newValue.length>1){
            this.getStore('data.CollectTagNameStore').load({
                params: {
                    taskId: collect_task_id,
                    regex: newValue
                }
            });
        }
    },
    doSave : function () {
        var window = this.getDataItemConfigWin();
        var form = window.down('form');
        form.getForm().findField('data_item_id').setValue(window.getData_item_id());
        var vl=form.getForm().findField('data_item_id').getValue();
        var name =window.down('form').getForm().findField('name').getValue();
        var grid=this.getDataItemConfigWin().down('grid[name="tagGrid"]');
        if (form.isValid()) {
            if(grid.getStore().getCount() > 0){
                if(name == grid.getStore().getAt(0).get('gather_key')){
                    form.submit({
                        waitMsg : '请稍等...',
                        url : projectGP('/collectItem/saveCollectItem'),
                        success : function (form1,action) {
                            window.close();
                        },
                        failure : function (form1,action) {
                            Jm.MessageBox.error(action.result.handle);
                        }
                    })
                }else{
                    if(name!=""){
                        Jm.Msg.error("请选择列表中存在的键值或为空！");
                    }else{
                        form.submit({
                            waitMsg : '请稍等...',
                            url : projectGP('/collectItem/saveCollectItem'),
                            success : function (form1,action) {
                                window.close();
                            },
                            failure : function (form1,action) {
                                Jm.MessageBox.error(action.result.handle);
                            }
                        })
                    }
                }
            }else{
                if(name!=""){
                    Jm.Msg.error("没有可用的键值，请清空采集键值框");
                }
            }
        }
    },
    rowClick : function (t,record,item,index,e,eOpts) {
        this.getDataItemConfigWin().down('form').getForm().findField('name').setValue(record.raw.gather_key);
    }
});