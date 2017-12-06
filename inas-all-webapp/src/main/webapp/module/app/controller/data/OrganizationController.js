/**
 * Created by ZS on 2015/8/5.
 */
Ext.define('inas.controller.data.OrganizationController',{
    extend:'Ext.app.Controller',
    stores:['data.OrganiztionTreeStore'],
    //models:['data.AreaModel'],
    views:['data.OrganizationView'],
    refs:[{
        ref:'orgPanel',
        selector:'orgPanel'
    }
        ,
        {
            ref:'orgInfoForm',
            selector:'orgPanel>form'
        }
        ,
        {
            ref:'orgInfoTree',
            selector:'orgPanel>treepanel'
        }
    ],
    init:function(){
        this.control({
            'orgPanel>treepanel':{
                render: this.initTree,
                itemclick:this.nodeClick
            },
            'orgPanel>toolbar>button[action="add"]':{
                click:this.doAdd
            },
            'orgPanel>toolbar>button[action="delete"]':{
                click:this.doDelete
            },
            'orgPanel>toolbar>button[action="save"]':{
                click:this.doSave
            },
            'orgPanel>toolbar>button[action="reset"]':{
                click:this.doReset
            }
        });
    },

        //展开树
    initTree: function (t, e) {
            t.store.load({
                callback: function (records, operation, success) {
                    t.expandAll();
                }
            });

        this.getOrgInfoForm().down('treepicker[name="parent_id"]').store.load();
    },

    nodeClick: function (t, record, item, index, e, eOpts) {
        var infoForm=this.getOrgPanel().down('form[name="orgInform"]');
        if (record.raw.leaf != null) {
               infoForm.getForm().load({
                   url: projectGP('/organization/getOrgsByEn'),
                   params: {
                       id: record.raw.id
                   },
                   success: function (fm, action) {
                       fm.setValues();
                   },
                   failure: function (fm, action) {
                       Jm.Msg.error('加载错误！请联系管理员！');
                   }
               });
           }
    },
    doAdd:function(){
        var me=this;
        var infoForm=me.getOrgInfoForm().getForm();
        infoForm.reset();
    },
    doDelete:function(){
        var me=this;
        var orgTree=me.getOrgInfoTree();
        var infoForm=me.getOrgInfoForm().getForm();
        var selRec=orgTree.getSelectionModel().getSelection()[0]
        if(selRec){
            Jm.Msg.confirm('确定删除该行数据吗？',function(btn){
                if(btn=='ok'){

                    Ext.Ajax.request({
                        url:projectGP('/organization/delOrgById'),
                        params: {
                            id:selRec.get('id')
                        },
                        success: function(response){
                            var text = response.responseText;
                            orgTree.getStore().load();
                            //me.getOrgInfoForm().down('treepicker[name="parent_id"]').store.load();
                            infoForm.reset();
                        }
                    });
                }

            });
        }else{
            Jm.Msg.warning('请选中需要删除的数据！');
        }
    },
    doSave:function(){
        var me=this;
        var infoForm=me.getOrgInfoForm().getForm();
        var orgTree=me.getOrgInfoTree();
        var id=infoForm.findField('id').getValue();
        //var treePic=;
        var parentId=infoForm.findField('parent_id').getValue();
        if(parentId=='全市' ||parentId==null || parentId=='请选择隶属地区' || parentId=='' || parentId=='root' ||parentId=='id'){
            infoForm.findField('parent_id').setValue('0');
        }
        //alert(id+'==='+parentId)
        if(id==parentId ){
                //alert(111);
           Jm.MessageBox.error('不允许隶属自己！');
        }else{
        if(infoForm.isValid()){
            infoForm.submit({
                waitMsg: '请稍等...',
                url: projectGP('/organization/saveOrgEn'),
                success: function (fm, action) {
                    if (action.result.success) {
                        orgTree.getStore().load({
                            callback: function (records, operation, success) {
                                orgTree.expandAll();
                            }
                        });
                        me.getOrgInfoForm().down('treepicker[name="parent_id"]').store.load();
                        fm.reset();
                    }
                },
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
        }
    },
    doReset:function(){
        var me=this;
        var infoForm=me.getOrgInfoForm().getForm();
        var orgTree=me.getOrgInfoTree();
        var id=infoForm.findField('id').getValue();
        var recode=orgTree.getSelectionModel().getSelection()[0];
        infoForm.reset();
        if(id!=null && id!=0 && id!='' && id!='0'){
            infoForm.load({
                url: projectGP('/organization/getOrgsByEn'),
                params: {
                    id: id
                },
                success: function (fm, action) {
                    fm.setValues();
                },
                failure: function (fm, action) {
                    Jm.Msg.error('加载错误！请联系管理员！');
                }
            });
        }
    }
});
