Ext.define('inas.controller.data.AreaController',{
    extend:'Ext.app.Controller',
    models:['data.AreaModel'],
    stores:['data.AreaStore','data.AllAreaStore'],
    views:['data.Area'],
    refs:[
        {  ref:'area',
            selector:'area'}

    ],
    init:function(){
        this.control({
            'area':{
                show:this.loadBefore
            },
            'area>treepanel[name="areaTree"]':{
                render: this.initTree,
                itemclick:this.nodeClick
            },
            //'area':{
            //    beforeRender:this.doSome
            //},
            'area>toolbar>button[action="addArea"]':{
                click:this.addRoot
            },
            'area>toolbar>button[action="addNode"]':{
                click:this.addNode
            },
            'area>toolbar>button[action="save"]':{
                click:this.doSave
            },
            'area>toolbar>button[action="reset"]':{
                click:this.resetForm
            }
        });
    },

    //加载
    loadBefore:function(view, record, item, index,  e, eOpts ){
        var panel=this.getArea().down('panel[name="areaInfo"]');
        var form = panel.layout.getActiveItem(0);
        var treepick=form.down('treepicker[name="parent_id"]');
        treepick.getStore().load();
    },
    //展开树
    initTree: function (t, e) {
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },
    nodeClick:function(tree, record, item, index, e, eOpts){
        var leaf=record.data.leaf;
        var panel=this.getArea().down('panel[name="areaInfo"]');
        var id=record.data.id;
        if(record.data.text=='全市'){
            panel.layout.setActiveItem(2);
        }
        else {
            if(leaf==true){
                panel.layout.setActiveItem(1);
            }else {
                panel.layout.setActiveItem(0);
            }
            var form = panel.layout.activeItem;
            form.down('treepicker[name="parent_id"]').getStore().load();
            form.getForm().load({
                url:projectGP('/area/queryArea'),
                params : {
                    'id' : id
                },
                success:function(fm,action){
                    fm.setValues();
                }
            });
        }
    },
    //增加地区
    addRoot:function(){
        var panel=this.getArea().down('panel[name="areaInfo"]');
        panel.layout.setActiveItem(0);
        panel.layout.getActiveItem(0).getForm().reset();
    },
    //增加站点
    addNode:function() {
        var panel=this.getArea().down('panel[name="areaInfo"]');
        panel.layout.setActiveItem(1);
        panel.layout.getActiveItem(1).getForm().reset();
    },
    //重置
    resetForm:function(){
        var form=this.getArea().down('panel[name="areaInfo"]').layout.getActiveItem();
        var mid=form.getForm().findField('id').getValue();
        if(mid!=null && mid!='' && mid!=0){
            //重新加载数据
            form.getForm().load({
                url:projectGP('/area/queryArea'),
                params : {
                    'id' : mid
                },
                success:function(fm,action){
                    fm.setValues(action.result);
                }
            })
        }else{
            Jm.MessageBox.info('请选择需重置的区域！');
        }
    },

    //保存
    doSave:function(){
        var form=this.getArea().down('panel[name="areaInfo"]').layout.getActiveItem();
        var tree=this.getArea().down('treepanel[name="areaTree"]');
        var id=form.getForm().findField('id').getValue();
        var parentId=form.getForm().findField('parent_id').getValue();
        var name=form.getForm().findField('name').getValue();
        var mlo=form.getForm().findField('name').getValue();
        var treepick=form.down('treepicker[name="parent_id"]');
        if(parentId=='全市' ||parentId==null || parentId=='请选择隶属地区' || parentId=='' || parentId=='root'){
            form.getForm().findField('parent_id').setValue('0')
        }
        if(id==0 || id==null){
            if(name!=null && name !='' && mlo!=null && mlo!=0){
                //添加
                form.getForm().submit({
                    url:projectGP('/area/saveArea'),//增加
                    success:function(fm,action){
                        if (action.result.success) {
                            tree.getStore().load({
                                callback: function (records, operation, success) {
                                    tree.expandAll();
                                }
                            });
                            treepick.getStore().load();
                            //fm.getForm().reset();
                            fm.reset();
                        }
                    }
                })
            }else{
                Jm.MessageBox.info('请正确填写必填项！');
            }

        }else{
            //更新
            if(parentId!=0){
                if(id==parentId){
                    Jm.MessageBox.error('不允许隶属自己！');
                }else{
                    form.getForm().submit({
                        url: projectGP('/area/updateArea'),//upd
                        success: function (fm, action) {
                            if (action.result.success) {
                                //修改
                                tree.getStore().load({
                                    callback: function (records, operation, success) {
                                        tree.expandAll();
                                    }
                                });
                                treepick.getStore().load();
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
            }
        }

    }

});