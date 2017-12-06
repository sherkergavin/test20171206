Ext.define('inas.view.system.UserWin',{
    extend : 'Ext.window.Window',
    alias : 'widget.userWin',
    requires: [
        "Ext.ux.TreePicker"
    ],
    initComponent : function () {
        var me = this;
        Ext.apply(this,{
            width : 400,
            layout : 'fit',
            modal : true,
            items : [{
                xtype : 'form',
                bodyPadding : 10,
                layout : 'anchor',
                method:'post',
                defaults : {
                    anchor : '90%'
                },
                // The fields
                defaultType : 'textfield',
                items : [{
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: '<span style="color:red;">必填项</span>',
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items:[{
                        name : 'id',
                        hidden : true
                    }, {
                        fieldLabel: '用户名',
                        name: 'user_name',
                        allowBlank: false,
                        maxLength: 255
                    }, {
                        fieldLabel: '真实姓名',
                        name: 'staff_real_name',
                        allowBlank: false,
                        maxLength: 255
                    }, {
                        fieldLabel: '代码',
                        name: 'staff_code',
                        allowBlank: false,
                        maxLength: 255
                    },{
                        fieldLabel: '类型',
                        name: 'staff_class',
                        allowBlank: false,
                        maxLength: 255
                    },{
                        xtype: 'combo',
                        fieldLabel: '状态',
                        name: 'staff_state',
                        allowBlank: false,
                        store:Ext.create('inas.store.system.DictionaryStore'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
               //         hiddenName: 'name',
                        editable: false

                    },{
                        xtype: 'combo',
                        fieldLabel: '性别',
                        name: 'staff_gender',
                        allowBlank: false,
                        store:Ext.create('inas.store.system.DictionaryStore'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
                        hiddenName: 'staffenderValue',
                        editable: false
                    }
                     ,
                        {
                            xtype: 'treepicker',
                            name: 'organization_id',
                            valueField: 'id',
                            displayField: 'text',
                            allowBlank: false,
                            fieldLabel: '站点机构<span style="color:red;">*</span>',
                            value: 'id',
                            forceSelection: true,
                            rootVisible: false,//是否启用默认设置的root节点
                            store:  Ext.create('Ext.data.TreeStore', {
                                proxy : {
                                    type : 'ajax',
                                    actionMethods:{
                                        create: "POST", read: "POST", update: "POST", destroy: "POST"
                                    },
                                    url :      projectGP('/module/getOrganizationsTree')
                                }
                                ,
                                //设置根节点
                                root : {
                                    text : '全市',
                                    id : 'root'
                                }
                            })
                        }
                    ]
                },{
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: '选填项',
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items:[ {
                        fieldLabel: '昵称',
                        name: 'staff_emp_name',
                        maxLength: 255
                    },{
                        xtype:'datefield',
                        fieldLabel: '生日',
                        name: 'birthday',
                        editable: false,
                        format : 'Y-m-d',
                        maxValue:new Date
                    },{
                        fieldLabel: '电话',
                        name: 'staff_tel',
                        regex: /^[1]\d{10}$/,
                       // regex:/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/,
                        regexText:'请正确输入11位的手机号码',
                        maxLength: 13
                    },{
                        fieldLabel: '地址',
                        name: 'staff_address',
                        maxLength: 255
                    },{
                        fieldLabel: '邮编',
                        name: 'staff_zipcode',
                        regex:/^[1-9]\d{5}(?!\d)$/,
                        regexText:'请输入正确的邮政编码',
                        maxLength: 255
                    },{
                        fieldLabel: '邮箱',
                        name: 'staff_email',
                        vtype:'email',
                        maxLength: 255
                    },{
                        xtype: 'numberfield',
                        fieldLabel: '排列顺序',
                        name: 'lo',
                        maxLength: 9
                    },/*{
                     xtype: 'combo',
                     fieldLabel: '部门',
                     name: 'department_id',
                     store: 'user.DepartmentStore',
                     queryMode: 'local',
                     displayField: 'department_name',
                     valueField: 'department_id',
                     hiddenName: 'department_id',
                     allowBlank: false,
                     editable: false

                     },*/{
                        xtype: 'textareafield',
                        grow: true,
                        name: 'staff_desc',
                        fieldLabel: '备注信息',
                        maxLength: 2000
                    }]
                }]
            }],
            buttons : [{
                xtype:'jbutton',
                action:'save'
            },{
                xtype:'jbutton',
                action:'reset'
            }]
        })
        this.callParent(arguments);
    }
})