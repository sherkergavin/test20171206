Ext.define('inas.controller.data.GroupController', {
    extend: 'Ext.app.Controller',
    models: ['data.GroupModel'],
    stores: ['data.GroupStore','data.AllGroupStore'],
    views: ['data.Group'],
    refs: [
        {
            ref: 'group',
            selector: 'group'
        }
    ],
    init: function () {
        this.control({
            group:{
                show:this.loadCombo
            },
            'group>treepanel[name="db_TypeTree"]': {
                itemclick: this.dataNodeClick,
                beforeitemclick :this.parentIdCombox,
                render:this.tree
            },
            'group>toolbar>button[action="add"]':{
                click:this.addSource
            },
            'group>toolbar>button[action="save"]':{
                click:this.doSave
            },
            'group>toolbar>button[action="reset"]':{
                click:this.doDataReset
            },
            'group>toolbar>button[action="delete"]':{
                click:this.doDelSouce
            }
        });
    },
    tree:function(t,e){
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },
    parentIdCombox:function(view,record, item, index, e, eOpts){
          var combo = this.getGroup().down('form[name="db_external"]').down('combo[name="parent_id"]');
          combo.getStore().load();

    },
    //加载combobox
    loadCombo:function(view, record, item, index,  e, eOpts ){
        var panel=this.getGroup().down('form[name="db_external"]');
        var comb=panel.down('combo[name="parent_id"]');
        comb.getStore().load();
    },
    //详细信息
    dataNodeClick:function(tree, record, item, index, e, eOpts){
        var dbform=this.getGroup().down('form[name="db_external"]');
        var thisform = this.getGroup();
        dbform.getForm().load({
            url:projectGP('/sgroup/queryGroup'),
            params : {
                'id' : record.data.id
            },
            reader: {
                type: 'json',
                root: 'data'
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
        var dbform=this.getGroup().down('form[name="db_external"]');
        dbform.getForm().reset();
    },

    //保存
    doSave:function(){
        var dbform=this.getGroup().down('form[name="db_external"]');
        var tree=this.getGroup().down('treepanel[name="db_TypeTree"]');
        var id=dbform.getForm().findField('id').getValue();
        if(id==0 || id==null){
            //增加
            dbform.getForm().submit({
                waitMsg : '请稍等...',
                url:projectGP('/sgroup/addGroup'),
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
                url:projectGP('/sgroup/updateGroup'),
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
        var dbform=this.getGroup().down('form[name="db_external"]');
        if(dbform.getForm().findField('id')!='' || dbform.getForm().findField('id')!=0){
            //重新加载数据
            dbform.getForm().load({
                url:projectGP('/sgroup/queryGroup'),
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
        var tree = this.getGroup().down('treepanel[name="db_TypeTree"]');
        var record = tree.getSelectionModel().getSelection()[0];
        if (record) {
            Ext.MessageBox.confirm('删除该群组？', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/sgroup/deleteGroup'),
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