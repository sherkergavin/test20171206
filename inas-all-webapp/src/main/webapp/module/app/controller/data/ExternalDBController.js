Ext.define('inas.controller.data.ExternalDBController', {
    extend: 'Ext.app.Controller',
    models: ['pm.ExternalDBModel'],
    stores: ['pm.ExternalDBStore','pm.AllDBTypeStore'],
    views: ['data.ExternalDB'],
    refs: [
        {
            ref: 'external',
            selector: 'external'
        }
    ],
    init: function () {
        this.control({
            'external>treepanel[name="db_TypeTree"]': {
                itemclick: this.dataNodeClick,
                beforeitemclick :this.combo,
                render:this.typeCbo
            },
            'external>toolbar>button[action="add"]':{
                click:this.addSource
            },
            'external>toolbar>button[action="save"]':{
                click:this.doSave
            },
            'external>toolbar>button[action="reset"]':{
                click:this.doDataReset
            },
            'external>toolbar>button[action="delete"]':{
                click:this.doDelSouce
            },
            'external>toolbar>button[action="testSource"]':{
                click:this.testSource
            }
        });
    },
    typeCbo:function(){
        this.getExternal().down('combo[name="db_type_id"]').store.load();
    },
    combo:function(view,record, item, index, e, eOpts){
          var combo = this.getExternal().down('form[name="db_external"]').down('combo[name="db_type_id"]');
          combo.getStore().load();
    },
    //详细信息
    dataNodeClick:function(tree, record, item, index, e, eOpts){
        var dbform=this.getExternal().down('form[name="db_external"]');
        var thisform = this.getExternal();
        dbform.getForm().load({
            url:projectGP('/external/queryExternal'),
            params : {
                'id' : record.data.id
            },

            success:function(fm,action){
                fm.setValues(action.result.data);
            },
            failure: function(form, action) {
                alert('fail');
            }
        });

    },
    //新增采集任务
    addSource:function(){
        var dbform=this.getExternal().down('form[name="db_external"]');
        dbform.getForm().reset();
    },
    testSource:function(){
        var dbform=this.getExternal().down('form[name="db_external"]');
        dbform.getForm().submit({
            waitMsg : '正在测试数据库连接...',
            url:projectGP('/external/testDsConnectivity'),
            success:function(){
                    Jm.MessageBox.info('数据库连接测试成功！');
            },failure : function(fm,action){
                Jm.MessageBox.error(action.result.handle);
            }
        });
    },
    //保存
    doSave:function(){
        var dbform=this.getExternal().down('form[name="db_external"]');
        var tree=this.getExternal().down('treepanel[name="db_TypeTree"]');
        var id=dbform.getForm().findField('id').getValue();
        if(id==0 || id==null){
            //增加
            dbform.getForm().submit({
                waitMsg : '请稍等...',
                url:projectGP('/external/addExternal'),
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
                url:projectGP('/external/updataExternal'),
                success:function(fm,action){
                    if (action.result.success) {
                        tree.getStore().load();
                    }
                }
            })
        }
    },

    //重置
    doDataReset:function(){
        var dbform = this.getExternal().down('form[name="db_external"]');
        var fid=dbform.getForm().findField('id').getValue();
        if ( fid != null && fid!= '' && fid != 0) {
            //重新加载数据
            dbform.getForm().load({
                url: projectGP('/external/queryExternal'),
                params: {
                    'id': dbform.getForm().findField('id').getValue()
                },
                success: function (fm, action) {
                    fm.setValues(action.result);
                }
            })
        }else{
            Jm.MessageBox.info('请选择需重置的数据源');
        }
    },
    //删除
    doDelSouce: function () {

        var tree = this.getExternal().down('treepanel[name="db_TypeTree"]');
        var record = tree.getSelectionModel().getSelection()[0];
        if (record) {
            Ext.MessageBox.confirm('删除该采集任务？', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/external/deleteExternal'),
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