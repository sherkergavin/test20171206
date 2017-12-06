/**
 * Created by zs on 2015/8/5.
 */
Ext.define('inas.view.data.OrganizationView', {
    extend: 'Ext.panel.Panel',
    closable: true,
    alias: 'widget.orgPanel',
    requires: [
        "Ext.ux.TreePicker"
    ],
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            title: '机构管理',
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                xtype: 'treepanel',
                region: 'west',
                width: '20%',
                name: 'orgTree',
                store: 'data.OrganiztionTreeStore',
                rootVisible: false
            }
                ,//左侧树
                {
                    xtype: 'form',
                    method: 'post',
                    region: 'center',
                    width: '80%',
                    name: 'orgInform',
                    layout: 'anchor',
                    border: true,
                    defaults: {
                        anchor: '100%',
                        margin: '5 10 0 10',
                        labelWidth: 120
                    },
                    items: [
                        {xtype: 'hiddenfield', name: 'id'},
                        {
                            xtype: 'textfield',
                            fieldLabel: '机构<span style="color:red;">*</span>',
                            maxLength: 255,
                            maxLengthText: '最多可输入255个字符',
                            name: 'name',
                            allowBlank: false
                        },
                        {
                            xtype: 'treepicker',
                            name: 'parent_id',
                            valueField: 'id',
                            displayField: 'text',
                            //allowBlank: false,
                            fieldLabel: '上级机构',
                            value: 'id',
                            forceSelection: true,
                            rootVisible: false,//启用默认设置的root节点
                            store:  Ext.create('Ext.data.TreeStore', {
                                proxy : {
                                    type : 'ajax',
                                    actionMethods:{
                                        create: "POST", read: "POST", update: "POST", destroy: "POST"
                                    },
                                    url :      projectGP('/organization/getOrgsTree')
                                }
                                ,
                                //设置根节点
                                root : {
                                    text : '全市',
                                    id : 'root'
                                }
                            })
                        },
                                    //url: projectGP('/organization/getOrgsTree'),

                        {
                            xtype: 'numberfield', miniValue: 0, fieldLabel: '排列顺序', allowDecimals: false,
                            nanText: '请输入有效整数', minValue: 0, name: 'lo'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: '备注',
                            maxLength: 2000,
                            maxLengthText: '最多可输入2000个字符',
                            name: 'description'
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
                }
            ]
        });
        this.callParent(arguments);
    }
});