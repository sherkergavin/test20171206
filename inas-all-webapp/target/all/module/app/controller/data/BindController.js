Ext.define('inas.controller.data.BindController', {
    extend: 'Ext.app.Controller',
    models: ['pm.BindModel'],
    stores: ['pm.BindStore','pm.AllBindStore','pm.StationTypeStore'],
    views: ['data.BindView'],

    refs: [
        {
            ref: 'bind',
            selector: 'bind'
        },
        {
            ref:'bindFormRadio',
            selector:'bind>form>radiogroup'
        }
    ],
    init: function () {
        this.control({
            bind:{
                render:this.loadCombo
            },
            'bind>form>radiogroup': {
                change:this.rad
                //click:this.rad
            },

            'bind>treepanel[name="d_bindTree"]': {
                itemclick: this.dataNodeClick,
                beforeitemclick :this.typecombo,
                render:this.tree
                //click:this.group
                //itemclick:this.datatype
            },
            'bind>toolbar>button[action="dataRootAdd"]':{
                click:this.dataRootAdd
            },
            'bind>toolbar>button[action="dataChildAdd"]':{
                click:this.dataChildAdd
            },
            'bind>toolbar>button[action="save"]':{
                click:this.doSave
            },

            'bind>toolbar>button[action="reset"]':{
                click:this.doDataReset
            },
            'bind>toolbar>button[action="delete"]':{
                click:this.doDelSouce
            },
            'bind>toolbar>button[action="bindColumnRow"]': {
                 click: this.columnEdit
            },
            'bind>toolbar>button[action="bindData"]':{
                click:this.doBindData
            }
        });
    },

    //添加根节点
    dataRootAdd:function(btn){
        var grid=this.getBind();
        var tree=this.getBind().down('treepanel[name="d_bindTree"]');
        var window=Ext.create('inas.view.data.DataRootWindow');
        window.down('form').getForm().url = projectGP('/bind/insertBind');
        window.show();
    },
    //添加子节点
    dataChildAdd:function(btn){
        var dbform = this.getBind().down('form[name="d_bind"]');
        var fid=dbform.getForm().findField('id').getValue();
        if(!fid==false){
            var tree=this.getBind().down('treepanel[name="d_bindTree"]');
            var id =tree.getSelectionModel().getSelection()[0].data.id;
            var window=Ext.create('inas.view.data.DataChildBindWin');
            window.setParent_id(id);
            var form= window.down('form');
            form.getForm().url = projectGP('/bind/insertBind');
            window.show();
            var combo = this.getBind().down('form[name="d_bind"]').down('combo[name="entity_type_id"]');
            combo.getStore().load();
        }else{
            Jm.MessageBox.error('未指定父节点！');
        }
    },

    rad:function(t,newValue,oldValue,eOpts){
        var entity_type_id = this.getBind().down('form[name="d_bind"]').down('combo[name="entity_type_id"]');
        var col_cnt = this.getBind().down('form[name="d_bind"]').down('numberfield[name="col_cnt"]');
        var description = this.getBind().down('form[name="d_bind"]').down('textarea[name="description"]');
        var combx = this.getBind().down('form[name="d_bind"]').down('combo[name=entity_type_id]');
        var but = this.getBind().down('button[action="dataChildAdd"]');
        var ivalue =newValue.type;//获取radiogroup单选控件值
        if(ivalue==0){
            combx.disable();
            entity_type_id.hide();//隐藏
            entity_type_id.clearValue();
            entity_type_id.disable();
            col_cnt.disable();
            col_cnt.hide();
            col_cnt.reset();
            description.hide();
            description.reset();
            but.setDisabled(false);
        }
        if(ivalue==1){
            combx.enable();
            col_cnt.enable();
            entity_type_id.enable();
            entity_type_id.show();//显示
            col_cnt.show();
            but.setDisabled(true);//只读
            description.show();
        }
    },
    //展开左侧树菜单
    tree:function(t,e){
        var treepicker = this.getBind().down('treepicker[name="parent_id"]');
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
        this.getBind().down('treepicker[name="parent_id"]').getStore().load();
        var Tree = this.getBind().down('treepanel[name="d_bindTree"]');
        Tree.getSelectionModel();
    },

    typecombo:function(view,record, item, index, e, eOpts){
        var combo = this.getBind().down('form[name="d_bind"]').down('combo[name="entity_type_id"]');
        combo.getStore().load();
    },
    //加载combox
    loadCombo:function(view, record, item, index,  e, eOpts ){
        var panelx=this.getBind().down('form[name="d_bind"]');
        var combx=panelx.down('combo[name="entity_type_id"]');
        combx.getStore().load();
    },
    //详细信息
    dataNodeClick:function(tree, record, item, index, e, eOpts){
        var dbform=this.getBind().down('form[name="d_bind"]');
        var treepicker=this.getBind().down('treepicker[name="parent_id"]');
        var entity_type_id = this.getBind().down('form[name="d_bind"]').down('combo[name="entity_type_id"]');
        var col_cnt = this.getBind().down('form[name="d_bind"]').down('numberfield[name="col_cnt"]');
        var description = this.getBind().down('form[name="d_bind"]').down('textarea[name="description"]');
        var combx = this.getBind().down('form[name="d_bind"]').down('combo[name=entity_type_id]');
        var groupType = dbform.down('radiogroup[name="group"]');
        var but = this.getBind().down('button[action="dataChildAdd"]');
        dbform.getForm().load({
                url:projectGP('/bind/getBindById'),
                params : {
                    'id' : record.data.id
                },
                reader: {
                    type: 'json',
                    root: 'data'
                },
                success:function(fm,action){
                    var parentId=dbform.getForm().findField('parent_id').getValue();
                    var typeValue=action.result.data.type;
                    if(typeValue==1){
                        but.setDisabled(true);
                    }else{
                        but.setDisabled(false);
                    }
                    var belong = dbform.down('treepicker[name="parent_id"]');
                    if(parentId==null || parentId==''){
                        treepicker.setDisabled(true);
                        groupType.setReadOnly(true);
                        combx.disable();
                        entity_type_id.hide();
                        entity_type_id.clearValue();
                        col_cnt.hide();
                        col_cnt.reset();
                        description.hide();
                        description.reset();
                    }else{
                        groupType.setReadOnly(false);
                        treepicker.setDisabled(false);
                        //combx.enable();
                        //entity_type_id.show();
                        //col_cnt.show();
                        //description.show();
                    }
                    fm.setValues(action.result.data);
                },
                failure: function(form, action) {
                    Jm.MessageBox.error('fail');
                }
            }
        );
    },
    //新增
    addSource:function(){
        var dbform=this.getBind().down('form[name="d_bind"]');
        dbform.getForm().reset();
    },
    //修改
    doSave:function(){
        var dbform=this.getBind().down('form[name="d_bind"]');
        var tree=this.getBind().down('treepanel[name="d_bindTree"]');
        var treepicker=this.getBind().down('treepicker[name="parent_id"]');
        var id=dbform.getForm().findField('id').getValue();
        var parentId=dbform.getForm().findField('parent_id').getValue();

        //var radiogroup = dbform.getForm().findField('type').getValue();
        //if(radiogroup== true){
        //    dbform.getForm().findField('type').setValue(0);
        //}
        if(parentId=='root'){
            dbform.getForm().findField('parent_id').setValue(null)
        }
        //修改
        if(parentId!=id){
            if (dbform.isValid()) {
                dbform.getForm().submit({
                    url: projectGP('/bind/updateBind'),
                    success: function (fm, action) {
                        if (action.result.success) {
                            tree.getStore().load();
                            tree.expandAll();
                            treepicker.getStore().load();
                        }
                    },
                    failure: function (fm, action) {
                        Jm.MessageBox.error(action.result.handle);
                    }
                })
            }
        }else{
            Jm.MessageBox.error('隶属用户不可为自己！');
        }

    },
    //重置
    doDataReset:function(){
        var dbform = this.getBind().down('form[name="d_bind"]');
        var fid=dbform.getForm().findField('id').getValue();
        if ( fid != null && fid!= '' && fid != 0) {
            //重新加载数据
            dbform.getForm().load({
                url: projectGP('/bind/getBindById'),
                params: {
                    'id': dbform.getForm().findField('id').getValue()
                },
                success: function (fm, action) {
                    fm.setValues(action.result);
                }
            })

        }else {
            Jm.MessageBox.info('请选择需重置的数据源 ');
        }
    },

    //删除
    doDelSouce: function () {
        var tree = this.getBind().down('treepanel[name="d_bindTree"]');
        var record = tree.getSelectionModel().getSelection()[0];
        var treepicker=this.getBind().down('treepicker[name="parent_id"]');
        if (record) {
            Ext.MessageBox.confirm('删除该采集任务？', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/bind/deleteBind'),
                        method: 'post',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if (res.success) {
                                tree.getStore().load();
                                tree.expandAll();
                                treepicker.getStore().load();
                            } else {
                                Jm.MessageBox.error(res.handle);
                            }
                        }
                    });
                }
            })
        } else {
            Jm.MessageBox.error('未选中要删除的行');
        }
    },
    columnEdit:function(){
        var dbp = this.getBind();
        var tp = dbp.down('treepanel');
        var record = tp.getSelectionModel().selected.items[0];
        var radio = this.getBindFormRadio();
        var viewType = radio.getValue().type;
        if(record){
            if ( record.data.leaf && viewType==1) {
                var window=Ext.create('inas.view.data.DataBindColumnWindow');
                window.bind_id=record.data.id
                window.dataTypeItemAllStore.load({
                        callback: function (records, operation, success) {
                            window.down('gridpanel').store.load({
                                params: {
                                    bind_id: record.data.id
                                }
                            });
                            window.show();
                        }
                    }
                );
            }
        }
    },

    doBindData:function(){
        var dbp = this.getBind();
        var tp = dbp.down('treepanel');
        var record = tp.getSelectionModel().selected.items[0];
        var bindId=record.data.id;
        var radio = this.getBindFormRadio();
        var viewType = radio.getValue().type;

        if(record){
            if ( record.data.leaf && viewType==1) {
                if(bindId!='' && bindId!=null){
                    var win=Ext.create('inas.view.data.DataBindCellWindow');
                    win.bind_id=bindId;
                    var grid=win.down('gridpanel');
                    Ext.Ajax.request({
                        url:projectGP('/data/dataBindColumnGridList'),
                        method:'get',
                        params:{
                            bind_id:bindId
                        },
                        success:function(response){
                            var respObj=Ext.JSON.decode(response.responseText);
                            if(respObj.success){
                                var columns=respObj.data.list;//查询对应的列
                                var gridModels=respObj.data.models;
                                var comboStore=Ext.create('Ext.data.Store', {
                                    fields: [
                                        {'name': 'id'},
                                        { 'name': 'data_item_name' }
                                    ],
                                    proxy: {
                                        type: 'ajax',
                                        actionMethods: {
                                            create: "POST", read: "POST", update: "POST", destroy: "POST"
                                        },
                                        url: projectGP('/data/getDataItemByEntity'),
                                        reader: {
                                            type: 'json',
                                            root: 'data'
                                        }
                                    }
                                });
                                comboStore.load({
                                    params:{
                                        bindId:bindId
                                    },
                                    callback: function (records, operation, success) {
                                        //创建combo
                                        for (var i = 1; i < columns.length; i++) {
                                            var storeTemp = Ext.create('Ext.data.Store', {
                                                fields: [
                                                    {'name': 'id'},
                                                    { 'name': 'data_item_name' }
                                                ],
                                                proxy: {
                                                    type: 'ajax',
                                                    actionMethods: {
                                                        create: "POST", read: "POST", update: "POST", destroy: "POST"
                                                    },
                                                    url: projectGP('/data/getDataItemByEntity'),
                                                    params: {
                                                    },
                                                    reader: {
                                                        type: 'json',
                                                        root: 'data'
                                                    }
                                                }
                                            });
                                            columns[i].editor =  Ext.create('Ext.form.ComboBox', {
                                                store:storeTemp,
                                                queryMode: 'local',
                                                name:'column_id_'+columns[i].dataIndex,
                                                displayField: 'data_item_name',
                                                valueField: 'id',
                                                hiddenName: 'id',
                                                editable: false,
                                                listeners: {
                                                    focus: function (c, The, eOpts) {
                                                        c.store.load({
                                                            url:projectGP('/data/getDataItemByEntity'),
                                                            params: {
                                                                entity_id: grid.getSelectionModel().getSelection()[0].data.station_id
                                                            },
                                                            callback: function (records, operation, success) {
                                                                var nullValue={
                                                                    id:null,
                                                                    data_item_name:'空'
                                                                };
                                                                c.store.insert(0,nullValue);//给下拉框加入空值
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            columns[i].renderer = function (value, metaData, reocrd) {
                                                //find('id',value)//会模糊匹配，值不适用
                                                var index = comboStore.findExact('id', value);
                                                //alert(index)
                                                var rec = comboStore.getAt(index);
                                                //alert(rec.get('data_item_name')+rec.get("id"))
                                                if (value == null||value=='' || value==0) {
                                                    return null;
                                                } else {
                                                    return rec.get('data_item_name');
                                                }

                                            };
                                        }

                                        var gridStore= Ext.create('Ext.data.Store', {
                                            fields:gridModels,
                                            proxy: {
                                                type: 'ajax',
                                                actionMethods: {
                                                    create: "POST", read: "POST", update: "POST", destroy: "POST"
                                                },
                                                url: projectGP('/bindRowCell/bindCellList'),
                                                reader: {
                                                    type: 'json',
                                                    root: 'data'
                                                }
                                            }
                                        });
                                        gridStore.load({
                                            params:{
                                                bindId:bindId
                                            },
                                            callback: function (records, operation, success) {
                                                grid.reconfigure(gridStore, columns);
                                                win.show();
                                            }
                                        });

                                    }
                                });


                            }
                        }
                    });
                }
            }
        }
    }
});