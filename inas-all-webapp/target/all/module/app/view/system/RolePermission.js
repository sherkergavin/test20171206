Ext.define('inas.view.system.RolePermission',{
    extend:'Ext.panel.Panel',
    layout:'card',
    alias:'widget.rolePermission',
    requires: [
        "Ext.ux.TreePicker",
        "Ext.form.Panel",
        "Ext.ux.form.ItemSelector",
        "Ext.ux.form.MultiSelect",
        "Ext.tip.QuickTipManager"
    ],
    initComponent: function () {
        var me = this;

        //分配角色
        this.permissionForm = Ext.create('Ext.panel.Panel',{
            //xtype:'panel',
            name:'assignRole',
            layout:'border',
            items:[{
                    xtype:'panel',
                    region:'west',
                    width:300,
                    border:true,
                    layout:{
                        type:'vbox',
                        padding:'5',
                        align:'stretch'
                    },
                    items:[{
                        xtype:'treepanel',
                        autoScroll:true,
                        forceFit:true,
                        title:'模块权限',
                        name: 'permission',
                        store:'system.PermTreeStore',
                        rootVisible:false,
                        flex:1
                    },{
                        xtype:'treepanel',
                        autoScroll:true,
                        forceFit:true,
                        title:'功能权限',
                        name: 'func_permission',
                        store:'system.PermFuncTreeStore',
                        rootVisible:false,
                        flex:1
                    }]
                },{
                    xtype:'form',
                    name:'permissionform',
                    region:'center',
                    margins: '0 0 0 20',
                    layout : 'fit',
                    method:'post',
                    //    frame:true,
                    border:true,
                    items:[{
                        xtype: 'itemselector',
                        name: 'permitemselector',
                        anchor: '100%',
                        buttons: ["top", "add", "remove", "bottom"],
                        buttonsText: {
                            top: "移除全部角色",
                            add: "移除选中角色",
                            remove: "添加选中角色",
                            bottom: "添加所有角色"
                        },
                        imagePath:extGP( '/examples/ux/css/images/'),
             //           store: 'user.UserCheckedStore',    该控件销毁后重新创建，无法用mvc加载到store
                        store:Ext.create('Ext.data.Store',{
                            model:'inas.model.system.SelectorModel',
                            //  autoLoad: true,
                            sortInfo: {
                                field: 'value',
                                direction: 'ASC'
                            },
                            proxy: {
                                type: 'ajax',
                                actionMethods:{
                                    create: "POST", read: "POST", update: "POST", destroy: "POST"
                                },
                                url:projectGP('/role/getRoleUser'),
                                reader:{
                                    type:'array',
                                    root:'data'
                                }
                            }
                        }),
                        displayField: 'text',
                        valueField: 'value',
                        value: [],
                        allowBlank: true,
                        //      msgTarget: 'under',
                        fromTitle: '已添加角色',
                        toTitle: '未添加角色'
                    }]
                }
            ],
            buttons:[
                //{
                //    xtype:'button',
                //    action:'addPermission',
                //    text:'新增工作流权限',
                //    iconCls:'add'
                //},{
                //    xtype:'button',
                //    action:'editPermission',
                //    text:'编辑工作流权限',
                //    iconCls:'edit'
                //}
                /*,{
                    xtype:'button',
                    action:'deletePermission',
                    text:'删除权限',
                    iconCls:'delete'
                }*/
                '->',
                {
                    xtype:'jbutton',
                    action:'save'
                },
                {
                    xtype:'jbutton',
                    action:'reset'
                }
            ]
        });

        //分配权限
        this.roleForm = Ext.create('Ext.panel.Panel',{
            xtype:'panel',
            name:'assignPerm',
            layout:'border',
            items:[
                {
                    xtype:'treepanel',
                    region:'west',
                    width:'30%',
                    //     margins: '5 5 5 0',
                    //frame:true,
                    title:'角色管理',
                    autoScroll:true,
                    forceFit:true,
                    border:true,
                    name: 'role',
                    store:'system.UserRoleStore',
                    rootVisible:false
                },{
                    xtype:'form',
                    name:'roleform',
                    region:'center',
                    margins: '0 0 0 20',
                    layout : 'fit',
                    method:'post',
                    //    frame:true,
                    border:true,
                    items:[{
                        xtype: 'itemselector',
                        name: 'roleitemselector',
                        anchor: '100%',
                        buttons: ["top", "add", "remove", "bottom"],
                        buttonsText: {
                            top: "移除全部权限",
                            add: "移除选中权限",
                            remove: "添加选中权限",
                            bottom: "添加所有权限"
                        },
                        imagePath:extGP( '/examples/ux/css/images/'),
              //          store: 'user.PermCheckedStore',
                        store:Ext.create('Ext.data.Store',{
                            model:'inas.model.system.SelectorModel',
                            //  autoLoad: true,
                            sortInfo: {
                                field: 'value',
                                direction: 'ASC'
                            },
                            proxy: {
                                type: 'ajax',
                                actionMethods:{
                                    create: "POST", read: "POST", update: "POST", destroy: "POST"
                                },
                                url:projectGP('/permission/getRolePerm'),
                                reader:{
                                    type:'array',
                                    root:'data'
                                }
                            }
                        }),
                        displayField: 'text',
                        valueField: 'value',
                        value: [],
                        allowBlank: true,
                        //      msgTarget: 'under',
                        fromTitle: '已添加权限',
                        toTitle: '未添加权限'
                    }]
                }
            ],
            buttons:[
                ,'->',
                {
                    xtype:'jbutton',
                    action:'save'
                },
                {
                    xtype:'jbutton',
                    action:'reset'
                }
            ]
        });


        Ext.apply(this, {
            closable:true,
            title:'权限管理',
            items: [me.permissionForm,me.roleForm],
            tbar:[{
                xtype:'jbutton',
                action:'move-prev',
                text: '分配角色',
                disabled: true
            },{
                xtype:'jbutton',
                action:'move-next',
                text: '分配权限'
            }]
        });
        this.callParent(arguments);
    }
});


//重写top和bottom事件，改为全部添加和全部移除
Ext.override(Ext.ux.form.ItemSelector, {
    onTopBtnClick: function () {
        var me = this,
        fromList = me.fromField.boundList,
        allRec = fromList.getStore().getRange();
        fromList.getStore().remove(allRec);
        me.toField.boundList.getStore().add(allRec);
    },
    onBottomBtnClick: function () {
        var me = this,
        toList = me.toField.boundList,
        allRec = toList.getStore().getRange();
        toList.getStore().remove(allRec);
        me.fromField.boundList.getStore().add(allRec);
    }
});