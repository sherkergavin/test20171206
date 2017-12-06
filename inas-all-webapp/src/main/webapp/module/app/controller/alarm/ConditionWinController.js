Ext.define('inas.controller.alarm.ConditionWinController', {
    extend: 'Ext.app.Controller',
    stores: ['data.DataFormatStore','alarm.AllSelectEntityStore','alarm.AllSelectConditionItemStore'],
    views: ['alarm.ConditionWin'],
    models:['data.DataFormatModel','alarm.EntityModel','alarm.ConditionItemModel'],
    refs: [
        {
            ref:'conditionWin',
            selector:'conditionWin'
        },
        {
            ref:'policyView',
            selector:'policyView'
        }
    ],

    init: function () {
        this.control({
            'conditionWin >form>combo[name="data_format_id"]':{
                render:this.doFormatComLoad,
                change : this.doChange
            },
            'conditionWin >form>button[name="showItemBtn"]':{
                click:this.doShowItem
            },
            'conditionWin>form>toolbar>button[action="save"]':{
                click:this.doSave
            }
        })
    },

    doFormatComLoad:function(t){
        t.getStore().load({
            params:{
                'code':'analog'
            },
            async:false
        });

        //加载当前的对应的配置项
        var win=this.getConditionWin();
        var stationGrid=win.down('form grid[name="stationGrid"]');
        var itemGrid=win.down('form grid[name="itemGrid"]');
            if(t.getValue()!=null && t.getValue()!=0){
                stationGrid.getStore().load({
                    params:{
                        'data_format_id': t.getValue(),
                        'condition_id':win.getCondition_id()
                    },
                    callback: function (records, operation, success) {
                        var statStore=stationGrid.getStore();
                        var idStr = '';
                        for(var i=0;i<statStore.getCount();i++){
                            if(statStore.getAt(i).get("checked")==true){
                                idStr = idStr + statStore.getAt(i).get('entity_id') + ',';
                                //alert(statStore.getAt(i).get("entity_name"));
                            }
                        }

                        if(idStr!='' && null!=idStr){
                            itemGrid.getStore().load({
                                params:{
                                    'entityIdsStr':idStr,
                                    'condition_id':win.getCondition_id()
                                }
                            });
                            itemGrid.show();
                        }
                    }
                });
            //}
        }


    },

    doChange : function (t,newValue, oldValue) {
        var win=this.getConditionWin();
            var stationGrid = win.down('form grid[name="stationGrid"]');
            stationGrid.getStore().load({
                params: {
                    'data_format_id': t.getValue(),
                    'condition_id': win.getCondition_id()
                }
            });
    },

    doShowItem:function(t){
        var condFm=this.getConditionWin().down('form');
        var conditionId=condFm.getForm().findField('id').getValue();
        var stationGrid=condFm.down('grid[name="stationGrid"]');
        var statStore=stationGrid.getStore();
        var idStr = '';
        for(var i=0;i<statStore.getCount();i++){
            if(statStore.getAt(i).get("checked")==true){
                idStr = idStr + statStore.getAt(i).get('entity_id') + ',';
            }
        }

        var itemGrid=condFm.down('grid[name="itemGrid"]');

        if(null==conditionId || conditionId==0){
                Jm.MessageBox.info("请先保存基础信息后配置站点数据项！");
        }else
        {
             itemGrid.getStore().load({
                params:{
                    'entityIdsStr':idStr,
                    'condition_id':conditionId
                }
            });
            itemGrid.show();
        }

    },

    doSave:function(){
        var itemWin=this.getConditionWin();
        var itemFm=itemWin.down('form');
        var itemGrid=this.getConditionWin().down('form grid[name="itemGrid"]');
        var stationGrid=this.getConditionWin().down('form grid[name="stationGrid"]');
        var json = [];
        var idStr = '';
        var statStore=itemGrid.getStore();
        for(var i=0;i<statStore.getCount();i++){
            if(statStore.getAt(i).get("checked")==true){
                json.push(statStore.getAt(i).getData());
                idStr = idStr +statStore.getAt(i).get("entity_id");
            }
        }


        var formatId=this.getConditionWin().down('form combo[name="data_format_id"]').getValue();
        var jsonResult=Ext.JSON.encode(json);
        //alert(jsonResult);

        var num1=this.getConditionWin().down('form textfield[name="num1"]').getValue();

        var num2=this.getConditionWin().down('form textfield[name="num2"]').getValue();

        var time_length=this.getConditionWin().down('form textfield[name="time_length"]').getValue();

        var policyId=itemWin.getPolicy_id();
        var type=itemWin.getCondWinType();
        //alert(itemWin.getPolicy_id()+'==='+type);
        var conditionFmId=this.getConditionWin().down('hiddenfield[name="id"]');
        var  conditionGrid=this.getPolicyView().down('panel form[name=conditionForm]').down('grid');
        itemFm.getForm().submit({
            method: "POST",
            params: {
                'data_format_id':formatId,
                'jsonResult':jsonResult,
                'num1':num1,
                'num2':num2,
                'time_length':time_length,
                'policy_id':policyId,
                'type':type,
                'id':conditionFmId
            },
            url: projectGP('/conditionItem/saveConditionItemList'),
            success: function (form, action) {
                //console.info('1111111111=='+action.result.handle);
                //将返回的conditionId复制俄日form表单的id
                itemFm.getForm().findField('id').setValue(action.result.handle);
                itemWin.setCondition_id(action.result.handle);

                stationGrid.getStore().reload({
                    params: {
                        'data_format_id': formatId,
                        'condition_id': itemWin.getCondition_id()
                    }
                });

                //alert('condidWin='+itemWin.getCondition_id());

                itemGrid.getStore().load({
                    params:{
                        'entityIdsStr':idStr,
                        'condition_id':itemWin.getCondition_id()
                    }
                });

                Ext.Ajax.request({
                    method: 'POST',
                    url: projectGP('/condition/getConditionById'),
                    params:{
                        'id':itemWin.getCondition_id(),
                    },
                    success: function (response) {
                        var result = Ext.JSON.decode(response.responseText);
                        //alert('resultJson='+result.data[0]);
                        form.setValues(result.data[0]);
                    }
                });

                //grid刷新
                conditionGrid.getStore().reload({
                    params:{
                        'policy_id':policyId
                    }
                });
            }
            ,
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Jm.MessageBox.error('表单字段不得提交无效值!');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Jm.MessageBox.error('请求失败!');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Jm.MessageBox.error(action.result.handle);
                }
            }
        });

    }


});