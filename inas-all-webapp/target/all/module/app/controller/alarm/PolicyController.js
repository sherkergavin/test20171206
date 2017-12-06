Ext.define('inas.controller.alarm.PolicyController',{
    extend:'Ext.app.Controller',
    stores:['alarm.PolicyTreeStore','system.DictionaryStore','alarm.AllConditionStore','data.DataFormatStore','alarm.AllPolicyMessageStore'],
    views:['alarm.PolicyView','alarm.ConditionWin'],
    models:['system.DictionaryModel','alarm.ConditionModel','alarm.PolicyMessageModel'],
    refs:[
        {
            ref:'policyView',
            selector:'policyView'
        }
    ],
    init:function(){
        this.control({
            'policyView':{
                afterrender:this.doLoad
                //,
                //beforedeactivate:this.doVisible
            },
            'policyView >treepanel':{
                render:this.initTree,
                itemclick:this.nodeClick
            },
            'policyView>panel>fieldset>form[name="conditionForm"]>grid':{
                itemdblclick:this.editCondition
            },
            'policyView>panel>form[name="policyForm"]>container>button[action="add"]':{
                click:this.addNewPolicy
            },
            'policyView>panel>form[name="policyForm"]>container>button[action="save"]':{
                click:this.save
            },
            'policyView>panel>fieldset>form[name="conditionForm"]>container>button[name="addBoundBtn"]':{
                click:this.addBound
            }
            ,
            'policyView>panel>fieldset>form[name="conditionForm"]>container>button[name="addaAbnormalBtn"]':{
                click:this.addaAbnormal
            }
            ,
            'policyView>panel>fieldset>form[name="conditionForm"]>container>button[name="addInterruptBtn"]':{
                click:this.addInterrupt
            }
            ,
            'policyView>panel>fieldset>form[name="conditionForm"]>container>button[action="delete"]':{
                click:this.deleteCondition
            }
            ,
            'policyView>panel>form[name="policyMessageForm"]>container>button[action="save"]':{
                click:this.SavePolicyMessageGroup
            }
            ,
            'policyView>panel>form[name="policyMessageForm"]>container>button[action="reset"]':{
                click:this.resetMessageGrid
            }

        });
    },

    /**
     * 初始化加载combo
     */
    doLoad:function (){
        this.getPolicyView().down('form').down('combo[name="severity"]').store.load({
            params:{
                type:Jm.DB.Constant.DICTIONARY_TYPE_POLICYLEVEL
            }
        });
    },

    //公用控件的启用与禁用
    doSetVisible:function(flag){
        var conForm=this.getPolicyView().down('panel form[name=conditionForm]');
        var conditionGrid=conForm.down('grid');
        var actionForm=this.getPolicyView().down('panel form[name=policyMessageForm]');
        var messageGrid=actionForm.down('grid');
        //conForm.down('container').setDisabled(false);
        if(flag==1){
            //禁用
            this.getPolicyView().down('panel form[name=policyForm]').getForm().reset();

            conForm.getForm().reset();
            conditionGrid.getStore().removeAll();
            conditionGrid.setDisabled(true);

            actionForm.getForm().reset();
            messageGrid.getStore().removeAll();
            messageGrid.setDisabled(true);
        }else{
            //启用
            conditionGrid.setDisabled(false);

            messageGrid.setDisabled(false);
        }
    },


    /**
     * 初始化加载树
     */
    initTree: function (t, e) {
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },

    /**
     * 树点击事件
     * 根据treeId分别加载form
     */
    nodeClick:function(tree, record, item, index, e, eOpts){
        this.doSetVisible(0);
        var policyFm=this.getPolicyView().down('panel form[name=policyForm]');
        policyFm.down('container button[action="add"]').show();
        var id=record.data.id;
        var policyForm=this.getPolicyView().down('panel form[name=policyForm]');
        policyForm.getForm().load({
            url:projectGP('/policy/getPolicyById'),
            params : {
                'id' : id
            },
            success:function(fm,action){
                fm.setValues();
            }
        });

        var conForm=this.getPolicyView().down('panel form[name=conditionForm]');
        var conditionGrid=conForm.down('grid');
        conditionGrid.getStore().load({
            params:{
                'policy_id':id
            }
        });

        var messageGrid=this.getPolicyView().down('panel form[name=policyMessageForm] grid');
        messageGrid.getStore().load({
            params:{
                'policy_id':id
            }
        });



    },

    /**
     * 新增第一个form（policy基础信息）
     */
    addNewPolicy:function(){
        var me=this;
        var tree=me.getPolicyView().down('treepanel');
        tree.getStore().reload();
        //将condition与模板模块禁用
        var policyFm=me.getPolicyView().down('panel form[name=policyForm]');
        //policyFm.down('container button[action="add"]').hide();
        //policyFm.getForm().reset();
        //this.doSetVisible(1);

        var id=policyFm.getForm().findField('id').getValue();
        if(null!=id && id!=0){
            Jm.Msg.confirm('取消保存修改过的数据？',function(btn){
                if(btn=='ok'){
                    //新增
                    policyFm.down('container button[action="add"]').hide();
                    policyFm.getForm().reset();
                    me.doSetVisible(1);
                }

            });
        }


        //form清空失效
        //var id=policyFm.getForm().findField('id').getValue();
        //alert('flg='+policyFm.getForm().isDirty());
        //if(null!=id && id!=0 && policyFm.getForm().isDirty()==true){
        //    //form有修改
        //    Jm.Msg.confirm('取消保存修改过的数据？',function(btn){
        //        if(btn=='ok'){
        //            //新增
        //            policyFm.down('container button[action="add"]').hide();
        //            me.doSetVisible(1);
        //        }
        //
        //    });
        //
        //}


    },


    /**
     * 保存第一个form（policyForm）
     */
    save:function(){
        var form=this.getPolicyView().down('panel form[name=policyForm]');
        var id=form.getForm().findField('id').getValue();
        var url=null;
        if(id==null || id==0){
            //新增
            url=projectGP('/policy/insertPolicy');
        }else {
            //修改
            url=projectGP('/policy/updatePolicy');
        }
        var enabled=form.down('checkbox[name="enabled"]').getValue();
        if(enabled==true ){
            form.down('checkbox[name="enabled"]').setValue(1);
        }else{
            form.down('checkbox[name="enabled"]').setValue(0);
        }
        var tree=this.getPolicyView().down('treepanel');
        form.getForm().submit({
            url: url,//upd
            success: function (fm, action) {
                if (action.result.success) {
                    tree.getStore().load({
                        callback: function (records, operation, success) {
                            tree.expandAll();
                        }
                    });
                    //form.getForm().reset();
                }
            }
            ,
            failure: function(fm, action) {
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
        })
    }
    ,

    //动态创建不同类型的ConditionWindow
    doNewConditionWin:function(addType){
        var form=this.getPolicyView().down('panel form[name=policyForm]');
        var id=form.getForm().findField('id').getValue();
        if(null!=id && id!=0 && id!='') {
            //判断该类型是否可添加在本策略中（类型不重复）
            var conForm=this.getPolicyView().down('panel form[name=conditionForm]');
            var conditionGrid=conForm.down('grid');
            var condStore=conditionGrid.getStore();
            var doFlag=0;
            var recd=null;
            for(var i=0;i<condStore.getCount();i++){
               //alert('type='+condStore.getAt(i).get("type"));
                if(condStore.getAt(i).get("type")==addType)
                {
                    //return Jm.MessageBox.warning('该类型在该策略中已存在！');
                    recd=condStore.getAt(i);
                    doFlag=-1;
                }
            }
            if(doFlag==-1){
                this.doCondEdit(recd);
            }else{
                var condWin=Ext.create('inas.view.alarm.ConditionWin');
                condWin.down('form grid[name=stationGrid]').getStore().removeAll();
                condWin.down('form grid[name=itemGrid]').getStore().removeAll();
                condWin.setPolicy_id(id);
                condWin.setCondition_id(null);
                var hForm=condWin.down('form form[name="numHbox"]');
                var lengthForm=condWin.down('form form[name="lengthBox"]');
                var num1Field=Ext.create('Ext.form.field.Number',{
                    name:'num1'
                });
                switch (addType) {
                    case Jm.DB.ALARMDATA_TYPE.DATABOUND:
                        //上下限
                        condWin.setTitle('新增上下限');
                        condWin.setCondWinType(Jm.DB.ALARMDATA_TYPE.DATABOUND);
                        num1Field.setFieldLabel('上限值');
                        var num2Field=Ext.create('Ext.form.field.Number',{
                            name:'num2'
                        });
                        num2Field.setFieldLabel('下限值');
                        var time_length=Ext.create('Ext.form.field.Number',{
                            name:'time_length'
                        });
                        time_length.setFieldLabel('时间长度');
                        hForm.add(num1Field);
                        hForm.add(num2Field);
                        lengthForm.add(time_length);
                        break;
                    case Jm.DB.ALARMDATA_TYPE.DATAABNORMAL:
                        //数据突变
                        condWin.setTitle('新增突变');
                        condWin.setCondWinType(Jm.DB.ALARMDATA_TYPE.DATAABNORMAL);
                        num1Field.setFieldLabel('现值' + '"(%)"');
                        var num2Field = Ext.create('Ext.form.field.Number', {
                            name: 'num2',
                            hidden: true
                        });
                        var time_length = Ext.create('Ext.form.field.Number', {
                            name: 'time_length',
                            hidden: true
                        });
                        lengthForm.add(time_length);
                        hForm.add(num1Field);
                        hForm.add(num2Field);
                        break;
                    case Jm.DB.ALARMDATA_TYPE.DATAINTERRUPT:
                        //数据中断
                        condWin.setTitle('新增数据中断');
                        condWin.setCondWinType(Jm.DB.ALARMDATA_TYPE.DATAINTERRUPT);
                        num1Field.setFieldLabel('中断时长'+'"(小时)"');
                        num1Field.setMinValue(0);
                        var num2Field = Ext.create('Ext.form.field.Number', {
                            name: 'num2',
                            hidden: true
                        });
                        var time_length = Ext.create('Ext.form.field.Number', {
                            name: 'time_length',
                            hidden: true
                        });
                        lengthForm.add(time_length);
                        hForm.add(num1Field);
                        hForm.add(num2Field);
                        break;
                }
                condWin.show();
            }
        }else{
            Jm.MessageBox.warning('请先添加策略基本信息');
        }
    },

    addBound:function(){
        this.doNewConditionWin(Jm.DB.ALARMDATA_TYPE.DATABOUND);
    },
    addaAbnormal:function(){
        this.doNewConditionWin(Jm.DB.ALARMDATA_TYPE.DATAABNORMAL);
    },
    addInterrupt:function(){
        this.doNewConditionWin(Jm.DB.ALARMDATA_TYPE.DATAINTERRUPT);
    },


    /**
     * 按钮编辑策略条件
     */
    editCondition:function( t, record, item, index, e, eOpts ){
        this.doCondEdit(record);
    },

    doCondEdit:function(record){
        if(record){
            var editWin=Ext.create('inas.view.alarm.ConditionWin');

            var form=this.getPolicyView().down('panel form[name=policyForm]');
            var id=form.getForm().findField('id').getValue();
            editWin.setPolicy_id(id);
            //alert('conditionId='+record.get('id'));
            editWin.setCondition_id(record.get('id'));
            var hForm=editWin.down('form form[name="numHbox"]');
            var lengthForm=editWin.down('form form[name="lengthBox"]');
            var num1Field=Ext.create('Ext.form.field.Number',{
                name:'num1'
            });
            //alert('type='+record.get('type'));
            switch (record.get('type'))
            {
                case Jm.DB.ALARMDATA_TYPE.DATABOUND:
                    //上下限
                    editWin.setTitle('编辑上下限');
                    num1Field.setFieldLabel('上限');
                    var num2Field=Ext.create('Ext.form.field.Number',{
                        name:'num2'
                    });
                    num2Field.setFieldLabel('下限');
                    var time_length=Ext.create('Ext.form.field.Number',{
                        name:'time_length'
                    });
                    time_length.setFieldLabel('时间长度');
                    hForm.add(num1Field);
                    hForm.add(num2Field);
                    lengthForm.add(time_length);
                    editWin.setCondWinType(Jm.DB.ALARMDATA_TYPE.DATABOUND);
                    break;
                case Jm.DB.ALARMDATA_TYPE.DATAABNORMAL:
                    //数据突变
                    editWin.setTitle('编辑数据突变');
                    num1Field.setFieldLabel('限值');
                    var num2Field=Ext.create('Ext.form.field.Number',{
                        name:'num2',
                        hidden:true
                    });
                    hForm.add(num1Field);
                    hForm.add(num2Field);
                    var time_length = Ext.create('Ext.form.field.Number', {
                        name: 'time_length',
                        hidden: true
                    });
                    lengthForm.add(time_length);
                    editWin.setCondWinType(Jm.DB.ALARMDATA_TYPE.DATAABNORMAL);
                    break;
                case Jm.DB.ALARMDATA_TYPE.DATAINTERRUPT:
                    //数据中断
                    editWin.setTitle('编辑数据中断');
                    num1Field.setFieldLabel('中断时长'+'"(小时)"');
                    var num2Field=Ext.create('Ext.form.field.Number',{
                        name:'num2',
                        hidden:true
                    });
                    hForm.add(num1Field);
                    hForm.add(num2Field);
                    var time_length = Ext.create('Ext.form.field.Number', {
                        name: 'time_length',
                        hidden: true
                    });
                    lengthForm.add(time_length);
                    editWin.setCondWinType(Jm.DB.ALARMDATA_TYPE.DATAINTERRUPT);
                    break;
            }
            //alert('timelength=='+record.get('time_length'));
            editWin.down('form').getForm().loadRecord(record);
            editWin.show();

        }else {
            Jm.Msg.warning('请选中所需要编辑的数据！');
        }
    },



    deleteCondition:function(){
        var conForm=this.getPolicyView().down('panel form[name=conditionForm]');
        var  conditionGrid=conForm.down('grid');
        var form=this.getPolicyView().down('panel form[name=policyForm]');
        var policyId=form.getForm().findField('id').getValue();
        var selRec=conditionGrid.getSelectionModel().getSelection()[0];
        if(selRec){
            var id=selRec.get('id');
            if(id!=null&&id!=''){
                Jm.Msg.confirm('确定删除该行数据吗？',function(btn){
                    if(btn=='ok'){

                        Ext.Ajax.request({
                            url:projectGP('/condition/delConditionById'),
                            params: {
                                id:id
                            },
                            success: function(response){
                                conditionGrid.getStore().load({
                                    params:{
                                        'policy_id':policyId
                                    }
                                });
                            }
                        });
                    }

                });

            }else{
                Jm.Msg.warning('请选中需要删除的数据列！');
            }
        }else{
            Jm.Msg.warning('请选中所需要删除的数据！');
        }

    }
    ,

    SavePolicyMessageGroup:function(){
        var form=this.getPolicyView().down('panel form[name=policyForm]');
        var id=form.getForm().findField('id').getValue();
        var grid=this.getPolicyView().down('panel form[name=policyMessageForm] grid');
        //获取grid改变后的数据
        var jsonArray=[];
        if(grid.store.getModifiedRecords().length>0){
            var meStore=grid.getStore();
            for(var i=0;i<meStore.getCount();i++){
                if(meStore.getAt(i).get("checked")==true){
                    jsonArray.push(meStore.getAt(i).getData());
                }
            }
            var jsonResult=Ext.JSON.encode(jsonArray);
            //alert('jsonArray='+jsonResult);
            Ext.Ajax.request({
                url:projectGP('/policyMessage/savePolicyMessage'),
                method:'post',
                params: {
                    'jsonArrayStr':jsonResult,
                    'policy_id':id
                },
                success: function(response){
                    grid.getStore().load({
                        params:{
                            'policy_id':id
                        }
                    });
                }
            });
        }
    }
    ,
    resetMessageGrid:function(){
        var form=this.getPolicyView().down('panel form[name=policyForm]');
        var id=form.getForm().findField('id').getValue();
        var messageGrid=this.getPolicyView().down('panel form[name=policyMessageForm] grid');
        if(null==id || id==0){
            messageGrid.getStore().removeAll();
            Jm.MessageBox.warning('请先添加策略基本信息');
        }else{
            messageGrid.getStore().load({
                params:{
                    'policy_id':id
                }
            });
        }
    }



});