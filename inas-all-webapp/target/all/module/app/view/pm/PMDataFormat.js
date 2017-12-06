Ext.define('inas.view.pm.DataFormat',{
    extend:'Ext.panel.Panel',
    title:'数据类型',
    alias:'widget.dataFormat',
    requires: [
        'Ext.grid.feature.Grouping',
        'Jm.button.Button'
    ],
    initComponent: function () {
        var me = this;
        this.dictStore = Ext.create('inas.store.system.DictionaryStore');
        this.dictComb = Ext.create('Ext.form.ComboBox', {
            name: 'dataTypeItemAllCombo',
            store: me.dictStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
            editable: false
        });
        Ext.apply(me, {
            layout:'border',
            items:[
                //tree
                {
                    xtype:'treepanel',
                    name:'dataFormatTreePanel',
                    region:'west',
                    width:'18%',
                    border: true,
                    store: 'pm.DataFormatTreeStore',
                    rootVisible: false
                }
                ,
                {
                    xtype:'panel',
                    region:'center',
                    width:'80%',
                    name:'formatPanel',
                    border:'true',
                    layout:'card',
                    items:[
                        {
                            xtype:'grid',
                            layout:'fit',
                            store:'pm.DataFormatStore',
                            columns:[
                                {text:'',dataIndex:'id',hidden:true},
                                {text:'数据类型名称',dataIndex:'name',flex:1,editor:'textfield',align:'center'},
                                {text:'数据精度（小数位数）',align:'center',dataIndex:'data_spec',flex:1,editor: {
                                    xtype: 'combo',
                                    name:'data_spec',
                                    width:'44%',
                                    mode: 'local',
                                    editable: false,
                                    hiddenName:'id',
                                    displayField: 'name',
                                    valueField: 'id',
                                    triggerAction: 'all',
                                    allowBlank:false
                                },
                                    renderer:function(value){
                                        if(value!=null){
                                            return value+"位";
                                        }
                                    }
                                },
                                {text:'数据单位',dataIndex:'data_unit',flex:1,editor:'textfield',align:'center'},
                                {text:'备注',dataIndex:'description',flex:1,editor:'textfield',align:'center'},
                                {text:'排序',dataIndex:'lo',flex:1,editor:'numberfield',align:'center'}
                            ]
                        },
                        {
                            xtype:'grid',
                            autoHeight:true,
                            columnLines: true, // 加上表格线
                            store:'pm.FormatGroupStore',
                            columns:[
                                {text:'',dataIndex:'id',hidden:true},
                                //{text:'开关量状态',dataIndex:'dictionaryId',flex:1,editor:'textfield',align:'center'},
                                {
                                    text:'开关量状态',
                                    dataIndex:'dictionaryId',
                                    flex:1,
                                    editor: me.dictComb,
                                    listeners: {
                                        beforerender:{
                                            fn:function(){
                                                me.dictStore.load({
                                                    params:{
                                                        'type':Jm.DB.Constant.DICTIONARY_TYPE_SWITCHINGVALUE
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    renderer:function(value){
                                        var index = me.dictStore.find('id', value);
                                        var name=me.dictStore.getAt(index).get('name');
                                        return name;
                                    },
                                    align:'center'
                                },
                                {header:'状态对应值',dataIndex:'value',flex:1,editor:'numberfield',align:'center'}
                                ,
                                //{header:'异常值',dataIndex:'dti_unusual',flex:1,editor:'numberfield',hidden:true},
                                //{header:'关闭值',dataIndex:'dti_close',flex:1,editor:'numberfield'},
                                {header:'',dataIndex:'name',hidden:true}
                            ],
                            //,
                            features:[{ftype:'grouping'}]
                        },
                        {
                            xtype: 'grid',
                            columns:[]
                        }
                    ]
                }
            ],
            buttons:[
                {xtype:'jbutton', action:'add'}
                ,
                '->',
                {xtype:'jbutton', action:'edit'}
                //,
                //{xtype:'jbutton', action:'delete'}
            ]
        });
        this.callParent(arguments);
    }
});