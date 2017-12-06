Ext.define('inas.view.data.StationView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.StationView',//别名
    requires: ["Ext.ux.TreePicker"],
    initComponent: function () {
        var me = this;
        this.curNode = '';
        //新增文件
        this.addfilefield = function (count) {

            return Ext.create('Ext.form.field.File', {
                name: 'files_temp',
                fieldLabel: '文件路径',
                //labelWidth: 50,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择文件'
            })
        }
        this.fieldSet = Ext.create('Ext.form.FieldSet', {

            name: 'fieldSetField',
            title: '文件上传',
            width: '80%',
            layout: 'anchor',
            items: [
                {
                    text: '添加文件',
                    name: 'addFileField',
                    xtype: 'button',
                    handler: function () {

                        me.fieldSet.add(me.addfilefield(me.fieldSet.items.getCount()));
                    }


                }
                , {
                    xtype: 'filefield',
                    name: 'files_temp',
                    fieldLabel: '文件路径',
                    //labelWidth: 50,
                    msgTarget: 'side',
                    allowBlank: false,
                    anchor: '100%',
                    buttonText: '选择文件'
                }]
        })
        Ext.apply(this, {
            layout: 'border',
            title: '站点维护',
            items: [
                {
                    title: '站点',
                    width: '20%',
                    xtype: 'treepanel',
                    name: 'stationTypeTree',
                    region: 'west',
                    store: 'data.StationTypeTreeStore',
                    forceFit: true,
                    rootVisible: false,
                    border: true
                },
                {
                    xtype: 'form',
                    title: '配置',
                    region: 'center',
                    autoScroll: true,
                    //reader: new Ext.data.JsonReader({
                    //    successProperty: 'success',
                    //    root: 'data'
                    //},["address","area_id","contact","create_date","creator","deleted","description","edit_date","editor","entity_model_id","entity_type_id","id","lo","name","parent_id"
                    //    ,"version","working_status","x_position","y_position"
                    //]),

                    name: 'StationConfigForm',
                    defaults: {
                        anchor: '90%',
                        margin: '15 20 30 15'
                    },
                    items: [

                        {xtype: 'hiddenfield', name: 'id'},
                        {xtype: 'hiddenfield', name: 'version'},
                        {
                            xtype: 'fieldset',

                            width: '80%',
                            title: '<span style="color:red;">必填项',
                            layout: "column",
                            items: [
                                {
                                    columnWidth: .5,//第一列
                                    layout: "form",
                                    defaultType: 'textfield',
                                    margin: '5 5 5 5',
                                    items: [{
                                        xtype: 'combo',
                                        fieldLabel: '站点类型<span style="color:red;">*</span>',
                                        name: 'entity_type_id',
                                        store: 'data.StationTypeStore',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'id',
                                        hiddenName: 'entity_type_id',
                                        allowBlank: false,
                                        editable: false

                                    },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: '工作状态<span style="color:red;">*</span>',
                                            name: 'working_status',
                                            store: Ext.create('inas.store.system.DictionaryStore'),
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'id',
                                            //hiddenName: 'id',
                                            allowBlank: false,
                                            editable: false

                                        },
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
                                            store: Ext.create('Ext.data.TreeStore', {
                                                proxy: {
                                                    type: 'ajax',
                                                    actionMethods: {
                                                        create: "POST", read: "POST", update: "POST", destroy: "POST"
                                                    },
                                                    url: projectGP('/organization/getOrgsTree')
                                                }
                                                ,
                                                //设置根节点
                                                root: {
                                                    text: '全市',
                                                    id: 'root'
                                                }
                                            })
                                        }
                                    ]
                                }, {
                                    columnWidth: .5,//第二列
                                    layout: "form",
                                    defaultType: 'textfield',
                                    margin: '5 5 5 5',
                                    items: [{
                                        xtype: 'textfield',
                                        fieldLabel: '站点名称<span style="color:red;">*</span>',
                                        name: 'name',
                                        allowBlank: false,
                                        maxLength: 255
                                    },


                                        {
                                            xtype: 'treepicker',
                                            name: 'area_id',
                                            valueField: 'tid',
                                            displayField: 'text',
                                            allowBlank: false,
                                            fieldLabel: '站点区域<span style="color:red;">*</span>',
                                            value: 'tid',

                                            forceSelection: true,
                                            rootVisible: false,
                                            store: Ext.create('Ext.data.TreeStore', {
                                                proxy: {
                                                    type: 'ajax',
                                                    url: projectGP('/data/areaTree')
                                                },
                                                // 设置根节点
                                                root: {
                                                    text: '全市',
                                                    id: 'root'
                                                }
                                            })
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            //margin:'0 300 0 10',
                            width: '80%',
                            title: '选填项',
                            layout: "column",
                            items: [{
                                columnWidth: .5,//第一列
                                layout: "form",
                                defaultType: 'textfield',
                                margin: '5 5 5 5',
                                items: [{
                                    fieldLabel: '站点地址',
                                    name: 'address',
                                    maxLength: 255
                                }, {
                                    fieldLabel: '坐标位X',
                                    xtype: 'numberfield',
                                    name: 'x_position'
                                }, {
                                    fieldLabel: '排列顺序',
                                    xtype: 'numberfield',
                                    allowDecimals: false,
                                    decimalPrecision: 0,
                                    maxValue: 99999,
                                    minValue: 0,
                                    name: 'lo'
                                }]
                            }, {
                                columnWidth: .5,//第二列
                                layout: "form",
                                defaultType: 'textfield',
                                margin: '5 5 5 5',
                                items: [


                                    {
                                        fieldLabel: '联系方式',
                                        name: 'contact',
                                        maxLength: 255
                                    }, {
                                        fieldLabel: '坐标位Y',
                                        xtype: 'numberfield',
                                        name: 'y_position'
                                    }]
                            },
                                {
                                    columnWidth: 1,//第一列
                                    layout: "form",
                                    defaultType: 'textfield',

                                    items: [{
                                        fieldLabel: '站点描述',
                                        name: 'description',
                                        xtype: 'textarea',
                                        maxLength: 2000
                                    }
                                    ]
                                }


                            ]
                        }
                    ],
                    buttons: [
                        {
                            xtype: 'jbutton',
                            action: 'add'
                        },'->',
                        {
                            xtype: 'jbutton',
                            action: 'save'

                        },
                        {
                            xtype: 'jbutton',
                            action: 'reset'
                        },
                        {
                            xtype: 'jbutton',
                            action: 'delete'
                        }
                    ]

                }
            ]
        })
        this.callParent(arguments);
    }

})



