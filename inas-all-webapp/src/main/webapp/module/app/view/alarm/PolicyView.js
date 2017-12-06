Ext.define('inas.view.alarm.PolicyView', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.policyView',//别名
    initComponent : function () {

        Ext.apply(this,{
            title: '策略详细信息',
            layout: 'border',
            items:[
                {
                    xtype: 'treepanel',
                    region: 'west',
                    width: '15%',
                    name: 'policyTree',
                    store: 'alarm.PolicyTreeStore',
                    rootVisible: false
                }
                ,//左侧区域树
                {
                    xtype:'panel',
                    region: 'center',
                    //margin: '10 10 10 5',
                    border:true,
                    name:'cenP',
                    autoScroll:true,
                    width: '80%',
                    defaults: {
                        anchor: '90%',
                        margin: '10 0 0 25'
                    },
                    items:[
                        {
                            xtype: 'form',
                            name: 'policyForm',
                            layout: 'anchor',
                            method:'post',
                            //trackResetOnLoad : true,//记录值是否有更改，isDirty
                            labelWidth: 150,
                            bodyPadding: 5,
                            defaults: {
                                anchor: '90%',
                                margin: '10 0 0 10'
                            },
                            items: [

                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    layout: {
                                        type: 'table',
                                        columns: 5,
                                        tdAttrs: {style: 'padding: 5px 10px;'}
                                    },
                                    items:[
                                        {
                                            xtype:'jbutton',
                                            text:'新增策略配置信息',
                                            action:'add'
                                        }
                                    ]
                                }
                                ,
                                {xtype:'hiddenfield',name:'id'},//上右下左
                                {xtype:'form',
                                    layout:{
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    border:false,
                                    items:[
                                        {
                                            xtype:'textfield',
                                            name:'name',
                                            fieldLabel:'策略名字<span style="color:red;">*</span>',
                                            editable: false,allowBlank:false
                                        },

                                        {
                                            xtype: 'combo',
                                            fieldLabel: '级别',
                                            name: 'severity',
                                            allowBlank: false,
                                            store:Ext.create('inas.store.system.DictionaryStore'),
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'id',
                                            editable: false
                                        }
                                    ]
                                },
                                {
                                    xtype:'textarea',name:'description',fieldLabel:'描述信息',maxLength:255,maxLengthText:'最多可输入255个字符'
                                },
                                {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序', allowDecimals:false,
                                    nanText:'请输入有效整数', minValue: 0, name: 'lo'},
                                {
                                    xtype:'checkbox',name:'enabled',fieldLabel:'禁用本策略',
                                    inputValue:'1'
                                },
                                {
                                    xtype:'radiogroup',
                                    fieldLabel:'条件组合方式',
                                    name:'group',
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    items:[
                                        {boxLabel:'与',name:'cond_combine_type',inputValue:'0',flex:1},
                                        {boxLabel:'或',name:'cond_combine_type',inputValue:'1',checked: true,flex:15}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    layout: {
                                        type: 'table',
                                        columns: 5,
                                        tdAttrs: {style: 'padding: 5px 10px;'}
                                    },

                                    items: [
                                        //{
                                        //    xtype:'jbutton',
                                        //    flex:1,
                                        //    action:'add'
                                        //},
                                        {
                                            xtype: 'jbutton',
                                            text:'保存策略基本信息',
                                            action:'save'
                                        }
                                    ]
                                }
                            ]
                        },

                        {
                            xtype:'fieldset',
                            //style:'border-width: 1px; border-color: #990000;',
                            title: '条件设置',
                            naem:'fid',
                            width:'88%',
                            items :[
                                {
                                    xtype:'form',
                                    method:'post',
                                    name:'conditionForm',
                                    items:[
                                        {
                                            xtype: 'grid',
                                            width:'70%',
                                            border: true,
                                            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                                                clicksToEdit: 1,
                                                pluginId: 'cellplugin'
                                            })],
                                            store: 'alarm.AllConditionStore',
                                            columns: [
                                                {header: '', dataIndex: 'id', hidden: true},
                                                {header: '', dataIndex: 'type', hidden: true},
                                                {header: '', dataIndex: 'time_length', hidden: true},
                                                {header: '', dataIndex: 'data_format_id', hidden: true},
                                                {header: '', dataIndex: 'num1', hidden: true},
                                                {header: '', dataIndex: 'num2', hidden: true},
                                                {header: '条件类型', dataIndex: 'type_name', flex: 2},
                                                {header: '数据类型', flex: 2, dataIndex: 'format_name'},
                                                {header:'条件描述',flex:3,dataIndex:'description'}
                                            ]
                                        },



                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'table',
                                                columns: 5,
                                                tdAttrs: {style: 'padding: 5px 10px;'}
                                            },

                                            items: [
                                                {
                                                    xtype:'jbutton',
                                                    action:'add',
                                                    name:'addBoundBtn',
                                                    text:'配置上下限'
                                                },
                                                {
                                                    xtype:'jbutton',
                                                    action:'add',
                                                    name:'addaAbnormalBtn',
                                                    text:'配置突变'
                                                },
                                                {
                                                    xtype:'jbutton',
                                                    action:'add',
                                                    name:'addInterruptBtn',
                                                    text:'配置数据中断'
                                                },
                                                //{
                                                //    xtype: 'jbutton',
                                                //    action:'edit'
                                                //},
                                                {
                                                    xtype: 'jbutton',
                                                    action:'delete'
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }
                        ,
                        {
                            xtype:'form',
                            layout:'anchor',
                            name:'policyMessageForm',
                            width:'88%',
                            border:true,
                            defaults: {
                                anchor: '90%',
                                margin: '10 0 0 10'
                            },
                            items:[
                                {
                                    xtype:'text',text:'关联消息通知模板:'
                                },
                                {
                                    xtype: 'grid',
                                    border: true,
                                    width:'100%',
                                    stripeRows : true,
                                    manageHeight:true,
                                    //selModel:Ext.create('Ext.selection.CheckboxModel'),
                                    store: 'alarm.AllPolicyMessageStore',
                                    columns: [
                                        {header: '', dataIndex: 'id', hidden: true},
                                        {header: '', dataIndex: 'message_group_id', hidden: true},
                                        {header:'显示',xtype:'checkcolumn',dataIndex:'checked'},
                                        {header: '模板名字', dataIndex: 'message_group_name', flex: 2},
                                        {header:'模板描述信息',flex:3,dataIndex:'description'}
                                    ]
                                }
                                ,
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'table',
                                        columns: 2,
                                        tdAttrs: {style: 'padding: 5px 10px;'}
                                    },

                                    items: [
                                        {
                                            xtype:'jbutton',
                                            action:'save'
                                        },
                                        {
                                            xtype:'jbutton',
                                            action:'reset'
                                        }
                                    ]
                                }
                            ]
                        }
                        //messageGroupGrid
                    ]
                }
            ]
        })
        this.callParent(arguments);
    }
});