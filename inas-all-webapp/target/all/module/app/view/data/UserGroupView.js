/**
 * Created by zs on 2015/8/13.
 */
Ext.define('inas.view.data.UserGroupView', {
    extend: 'Ext.panel.Panel',
    closable: true,
    alias: 'widget.ugroupPanel',
    requires: [
        "Ext.form.Panel",
        "Ext.ux.form.ItemSelector",
        "Ext.ux.form.MultiSelect",
        "Ext.tip.QuickTipManager"
    ],
    initComponent: function () {
        var me = this;
        var tbar = Ext.create("Ext.Toolbar", {
            align: 'center',
            region: 'north',
            height: '40',
            items: [
                {
                    xtype: 'jbutton',
                    action: 'add'
                },{
                    xtype:'jbutton',
                    action:'delete'
                },{
                    xtype:'jbutton',
                    action:'reset'
                }
            ]
        });
        Ext.apply(this, {
            title: '用户群组',
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'treepanel',
                    region: 'west',
                    width: '18%',
                    name: 'ugTree',
                    border: true,
                    store: 'data.MessageGroupStore',
                    rootVisible: false
                }
                ,//左侧树
                {
                    xtype:'panel',
                    region:'center',
                    width:'80%',
                    name:'cenP',
                    overflowY : 'auto',
                    layout:'anchor',
                    items:[
                        {
                            xtype: 'form',
                            method: 'post',
                            name: 'ugForm',
                            layout: 'anchor',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '5 10 10 10',
                                labelWidth: 120
                            },
                            items: [
                                {xtype: 'hiddenfield', name: 'id'},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '群组名<span style="color:red;">*</span>',
                                    maxLength: 255,
                                    maxLengthText: '最多可输入255个字符',
                                    name: 'name',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'numberfield', miniValue: 0, fieldLabel: '排列顺序', allowDecimals: false,
                                    nanText: '请输入有效整数', minValue: 0, name: 'lo'
                                }
                            ]
                        }
                        ,
                        {
                            xtype:'panel',
                            layout: 'hbox',
                            name:'uPanel',
                            defaults: {
                                margin: '5 10 10 10'
                            },
                            items:[
                                {
                                    xtype:'text',text:'群成员:',
                                    width:'8%'
                                },
                                {
                                    xtype: 'itemselector',
                                    margin: '5 10 10 10',
                                    width:'92%',
                                    name: 'userItemSelector',
                                    //buttons: ["top", "add", "remove", "bottom"],
                                    buttons: ["add", "remove"],
                                    buttonsText: {
                                        //top: "移除全部人员",
                                        add: "移除选中人员",
                                        remove: "添加选中人员"
                                        //,
                                        //bottom: "添加所有人员"
                                    },
                                    imagePath:extGP( '/examples/ux/css/images/'),
                                    //           store: 'user.UserCheckedStore',    该控件销毁后重新创建，无法用mvc加载到store
                                    store:Ext.create('Ext.data.Store',{
                                        model:'inas.model.system.SelectorModel',
                                        autoLoad: false,
                                        sortInfo: {
                                            field: 'value',
                                            direction: 'ASC.'
                                        },
                                        proxy: {
                                            type: 'ajax',
                                            actionMethods:{
                                                create: "POST", read: "POST", update: "POST", destroy: "POST"
                                            },
                                            url:projectGP('/messageGroup/getAllMessageGroupUser'),
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
                                    fromTitle: '已添加人员',
                                    toTitle: '未添加人员'
                                }
                            ]
                        }
                    ]
                }
            ], buttons: [
                {
                    xtype: 'jbutton',
                    action: 'add'
                },
                {
                    xtype: 'jbutton',
                    action: 'delete'
                }
                , '->',
                {
                    xtype: 'jbutton',
                    action: 'save'
                },//保存
                {
                    xtype: 'jbutton',
                    action: 'reset'
                },
                {
                    xtype:'jbutton',
                    action:'submit',
                    text:'短信测试'
                }
            ]
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