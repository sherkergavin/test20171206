Ext.define('inas.controller.data.CollectTaskController', {
    extend: 'Ext.app.Controller',
   // models: ['data.CollectTaskModel'],
    stores: ['pm.CollectTaskStore','pm.AllExternalStore','pm.AllCollectStore'],
    views: ['data.CollectTask'],
    refs: [
        {
            ref: 'collect',
            selector: 'collect'
        }
    ],
    init: function () {
        this.control({
           'collect>treepanel[name="db_TypeTree"]': {
                itemclick: this.dataNodeClick,
                beforeitemclick :this.combx,
                render:this.db_idCom
           },

           'collect>toolbar>button[action="add"]':{
                click:this.addSource
           },
           'collect>toolbar>button[action="save"]':{
                click:this.doSave
           },
           'collect>toolbar>button[action="reset"]':{
                click:this.doDataReset
           },
           'collect>toolbar>button[action="delete"]':{
                click:this.doDelSouce
           },
           'collect>toolbar>button[name="testSource"]':{
                click:this.testSource
            }
        });
    },
    db_idCom:function(){
        this.getCollect().down('combo[name="ext_db_id"]').store.load();
    },
    testSource:function(){
        var dbform=this.getCollect().down('form[name="db_external"]');
        dbform.getForm().submit({
            waitMsg : '正在测试表连接...',
            url:projectGP('/collect/testDsConnectivity'),
            success:function(fm,action){
                Jm.MessageBox.info('表链接测试成功！');
            },failure : function(fm,action){
                Jm.MessageBox.error(action.result.handle);
            }
        });
    },
    combx:function(view,record, item, index, e, eOpts){
          var combo = this.getCollect().down('form[name="db_external"]').down('combo[name="ext_db_id"]');
          var com = this.getCollect().down('form[name="db_external"]').down('combo[name="block_data"]').setValue(1);
          com.getStore().load();
          combo.getStore().load();
    },
    //详细信息
    dataNodeClick:function(tree, record, item, index, e, eOpts){
        var dbform=this.getCollect().down('form[name="db_external"]');
        var theCollect = this.getCollect();
       // var thisform = this.getCollect();
        dbform.getForm().load({
            url:projectGP('/collect/queryCollect'),
            params : {
                'id' : record.data.id
            },
            reader: {
                type: 'json',
                root: 'data'
            },

            success:function(fm,action){
                fm.setValues(action.result.data);
                theCollect.down('form[name="db_external"]').down('datetimefield[name="start"]').setValue(new Date(action.result.data.time_next_task_start));
            },
            failure: function(form, action) {

            }
        });

    },
    //新增采集任务
    addSource:function(){

        var dbform=this.getCollect().down('form[name="db_external"]');
        dbform.getForm().reset();
        this.getCollect().down('form[name="db_external"]').down('combo[name="block_data"]').setValue(1);
        //this.getCollect().down('combo[name="ext_db_id"]').store.load();
     //   com.getStore().load();
    },

    //保存
    doSave:function(){
        this.getCollect().down('form[name="db_external"]').down('datetimefield[name="start"]').getValue();
        var dbform=this.getCollect().down('form[name="db_external"]');
        var tree=this.getCollect().down('treepanel[name="db_TypeTree"]');
        var id=dbform.getForm().findField('id').getValue();
        var names = this.getCollect().down('form[name="db_external"]').getForm().findField('name')

        if(dbform.getForm().isValid()){
            dbform.getForm().submit({
                url:projectGP('/collect/repeatName'),
                success:function(){
                    if(id==0 || id==null){
                        //增加
                        dbform.getForm().submit({
                            waitMsg : '请稍等...',
                            url:projectGP('/collect/addcollect'),
                            success:function(fm,action){
                                if (action.result.success) {
                                    tree.getStore().load();
                                    fm.reset();
                                }
                            }

                        })
                    }else{
                        //修改
                        dbform.getForm().submit({
                            waitMsg : '请稍等...',
                            url:projectGP('/collect/updatacollect'),
                            success:function(fm,action){
                                if (action.result.success) {
                                    tree.getStore().load();
                                }
                            }
                        })
                    }
                },failure : function(){
                    Jm.MessageBox.error('任务名称重复！',function(e){
                        if(e=="ok"){
                            names.focus(false, 100);
                        }
                    });
                    /* Jm.MessageBox.error('任务名称重复！')
                     names.focus(false, 100);*/
                }

            });
        }

    },

    //重置
    doDataReset:function(){
        var dbform=this.getCollect().down('form[name="db_external"]');
        if(dbform.getForm().findField('id')!='' || dbform.getForm().findField('id')!=0){
            //重新加载数据
            dbform.getForm().load({
                url:projectGP('/collect/queryCollect'),
                params : {
                    'id' : dbform.getForm().findField('id').getValue()
                },
                success:function(fm,action){
                    fm.setValues(action.result);
                }
            })
        }
    },
    //删除
    doDelSouce: function () {
        var tree = this.getCollect().down('treepanel[name="db_TypeTree"]');
        var record = tree.getSelectionModel().getSelection()[0];
        if (record) {
            Ext.MessageBox.confirm('删除该采集任务？', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/collect/deteleCollect'),
                        method: 'post',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if (res.success) {
                                tree.getStore().load();
                            } else {
                                alert(res.handle);
                            }
                        }
                    });
                }
            })
        } else {
            Jm.MessageBox.error('未选中要删除的行');
        }
    }
});