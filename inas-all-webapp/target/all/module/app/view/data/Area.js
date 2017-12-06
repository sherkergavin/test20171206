Ext.define('inas.view.data.Area', {
    extend: 'Ext.panel.Panel',
    closable: true,
    title: '区域配置',
    alias: 'widget.area',
    layout: 'border',
    requires: [
        "Ext.ux.TreePicker"
    ],
    items: [
        {
            xtype: 'treepanel',
            region: 'west',
            width: '20%',
            name: 'areaTree',
            store: 'data.AreaStore',
            rootVisible: true
        },//左侧区域树
        {
            xtype: 'panel',
            region: 'center',
            width: '80%',
            name: 'areaInfo',
            layout: 'card',
            border: true,
            items: [
                {
                    xtype: 'form',
                    method: 'post',
                    layout: 'anchor',
                    name: 'rootForm',
                    defaults: {
                        anchor: '100%',
                        margin: '5 10 0 10',
                        labelWidth: 120
                    },
                    items: [
                        {xtype: 'hiddenfield', name: 'id'},
                        {xtype: 'textfield', fieldLabel: '地区<span style="color:red;">*</span>', maxLength:255,maxLengthText:'最多可输入255个字符',name: 'name', allowBlank: false}
                        ,
                        //{
                        //    xtype: 'combo',
                        //    name: 'parent_id',
                        //    fieldLabel: '隶属',
                        //    store: 'data.AllAreaStore',
                        //    queryMode: 'local',
                        //    value:'全市',
                        //    displayField: 'name',
                        //    valueField: 'id',
                        //    emptyText: '请选择隶属地区',
                        //    editable: false,
                        //    triggerAction: 'all'
                        //},
                        {
                            xtype:'treepicker',fieldLabel:'隶属<span style="color:red;">*</span>',
                            name:'parent_id',
                            //store:'data.AllBindStore',
                            queryMode:'local',
                            displayField:'text',
                            valueField:'id',
                            fieldLabel:'请选择隶属地区',
                            rootVisible: true,
                            minPickerHeight: 300,
                            defaults: {autoScroll: true},
                            //triggerAction:'all'
                            store:Ext.create('Ext.data.TreeStore',{
                                proxy : {
                                    type : 'ajax',
                                    url :      projectGP('/area/getArea'),
                                    reader:{
                                        type:'json'
                                    }
                                },
                                autoLoad: false,
                                // 设置根节点
                                root : {
                                    text : '全市',
                                    expanded: true,
                                    id : 'root'
                                }

                            })},
                        {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序',allowDecimals:false,
                            nanText:'请输入有效整数',minValue: 0, name: 'lo'},
                        {xtype: 'textarea', fieldLabel: '备注',maxLength:2000,maxLengthText:'最多可输入2000个字符', name: 'description'}
                    ]
                }, {
                    xtype: 'form',
                    layout: 'anchor',
                    method: 'post',
                    name: 'nodeForm',
                    defaults: {
                        anchor: '100%',
                        margin: '5 10 0 10',
                        labelWidth: 120
                    },
                    items: [

                        {xtype: 'hiddenfield', name: 'id'},
                        {xtype: 'textfield', fieldLabel: '站点<span style="color:red;">*</span>', name: 'name', maxLength:255,maxLengthText:'最多可输入255个字符', allowBlank: false}
                        ,
                        //{
                        //    xtype: 'combo',
                        //    name: 'parent_id',
                        //    fieldLabel: '隶属',
                        //    store: 'data.AllAreaStore',
                        //    queryMode: 'local',
                        //    displayField: 'name',
                        //    valueField: 'id',
                        //    emptyText: '请选择隶属地区',
                        //    editable: false,
                        //    triggerAction: 'all'
                        //},
                        {
                            xtype:'treepicker',fieldLabel:'隶属<span style="color:red;">*</span>',
                            name:'parent_id',
                            //store:'data.AllBindStore',
                            queryMode:'local',
                            displayField:'text',
                            valueField:'id',
                            fieldLabel:'请选隶属用户',
                            rootVisible: true,
                            minPickerHeight: 300,
                            defaults: {autoScroll: true},
                            //triggerAction:'all'
                            store:Ext.create('Ext.data.TreeStore',{
                                proxy : {
                                    type : 'ajax',
                                    url :      projectGP('/area/getArea'),
                                    reader:{
                                        type:'json'
                                    }
                                },
                                autoLoad: false,
                                // 设置根节点
                                root : {
                                    text : '全市',
                                    expanded: true,
                                    id : 'root'
                                }

                            })},
                        {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序', allowDecimals:false,
                            nanText:'请输入有效整数', minValue: 0, name: 'lo'},
                        {xtype: 'textarea', fieldLabel: '备注',maxLength:2000,maxLengthText:'最多可输入2000个字符', name: 'description'}
                    ]
                }, {
                    xtype: 'panel'
                }
            ]

        }
    ],
    buttons: [
        {
            xtype: 'jbutton',
            action:'addArea',
            text: '新增区域',
            iconCls:'add'
        }
        //,//增加地区
        //{
        //    xtype: 'jbutton',
        //    action: 'addNode',
        //    text: '新增站点',
        //    iconCls:'add'
        //}
        , '->',
        {
            xtype: 'jbutton',
            action: 'save'
        },//保存
        {
            xtype: 'jbutton',
            action: 'reset',
            text: '重置'
        }
    ]
});