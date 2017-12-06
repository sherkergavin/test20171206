Ext.define('inas.view.system.UserRole',{
    extend:'Ext.panel.Panel',
    layout:'card',
    alias:'widget.userRole',
    requires: [
        "Ext.ux.TreePicker",
        "Ext.form.Panel",
        "Ext.ux.form.ItemSelector",
        "Ext.ux.form.MultiSelect",
        "Ext.tip.QuickTipManager"
    ],
    initComponent: function () {
        var me = this;

        //分配用户
        this.roleForm = Ext.create('Ext.panel.Panel',{
            xtype:'panel',
            name:'assignUser',
            layout:'border',
            items:[
                {
                    xtype:'treepanel',
                    region:'west',
                    width:'30%',
                    //     margins: '5 5 5 0',
                    //frame:true,
                    autoScroll:true,
                    forceFit:true,
                    title:'角色管理',
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
                            top: "移除全部用户",
                            add: "移除选中用户",
                            remove: "添加选中用户",
                            bottom: "添加所有用户"
                        },
                        imagePath:extGP( '/examples/ux/css/images/'),
                        //       store:'user.RoleCheckedStore',
                        store: Ext.create('Ext.data.Store',{
                            model:'inas.model.system.SelectorModel',
                            sortInfo: {
                                field: 'value',
                                direction: 'ASC'
                            },
                            proxy: {
                                type: 'ajax',
                                actionMethods:{
                                    create: "POST", read: "POST", update: "POST", destroy: "POST"
                                },
                                url:projectGP('/role/getUserRole'),
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
                        fromTitle: '已添加用户',
                        toTitle: '未添加用户'
                    }]
                }
            ],
            buttons:[
                {
                    xtype:'jbutton',
                    action:'addRole',
                    text:'新增角色',
                    iconCls:'add'
                },{
                    xtype:'button',
                    action:'editRole',
                    text:'编辑角色',
                    iconCls:'edit'
                }/*,{
                    xtype:'button',
                    action:'deleteRole',
                    text:'删除角色',
                    iconCls:'delete'
                }*/
                //删除功能释放按钮后可以直接使用
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

        //分配角色
        this.userForm = Ext.create('Ext.panel.Panel',{
            xtype:'panel',
            name:'assignRole',
            layout:'border',
            items:[
                {
                    xtype:'treepanel',
                    region:'west',
                    width:'30%',
                    //     margins: '5 5 5 0',
                    //frame:true,
                    autoScroll:true,
                    forceFit:true,
                    title:'用户管理',
                    border:true,
                    name: 'user',
                    store:'system.RoleUserStore',
                    rootVisible:false
                },{
                    xtype:'form',
                    name:'userform',
                    region:'center',
                    margins: '0 0 0 20',
                    layout : 'fit',
                    method:'post',
                    //    frame:true,
                    border:true,
                    items:[{
                        xtype: 'itemselector',
                        name: 'useritemselector',
                        anchor: '100%',
                        buttons: ["top", "add", "remove", "bottom"],
                        buttonsText: {
                            top: "移除全部角色",
                            add: "移除选中角色",
                            remove: "添加选中角色",
                            bottom: "添加所有角色"
                        },
                        imagePath:extGP( '/examples/ux/css/images/'),
                 //       store: 'user.UserCheckedStore',
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
            title:'角色管理',
            items: [me.roleForm,me.userForm
            ],
            tbar:[{
                xtype:'jbutton',
                action:'move-prev',
                text: '分配用户',
                disabled: true
            },{
                xtype:'jbutton',
                text: '分配角色',
                action:'move-next'
            }]
        })
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