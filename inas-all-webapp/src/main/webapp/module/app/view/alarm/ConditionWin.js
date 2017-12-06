Ext.define('inas.view.alarm.ConditionWin',{
    extend:'Ext.window.Window',
    alias:'widget.conditionWin',
    config:{
        condWinType : 0,
        Policy_id:null,
        condition_id:null
    },
    requires: [
        'Jm.button.Button'
    ],
    initComponent : function(){
        var me = this;

        Ext.apply(me,{
            width: 650,
            autoScroll:true,
            height:850,
            layout: 'fit',
            modal : true,
            title: '',
            items: [
                {
                    xtype:'form',
                    layout:'anchor',
                    overflowY : 'auto',
                    defaults: {
                        anchor: '90%',
                        margin: '10 0 15 10'
                    },
                    items:[
                        {
                            xtype:'hiddenfield',name:'id'
                        },
                        //第一行num1、num2
                        {
                            xtype:'form',layout:{type:'hbox',align: 'stretch'},border:false,name:'numHbox',
                            items:[
                            ]
                        },
                        {
                            xtype:'form',layout:{type:'hbox',align: 'stretch'},border:false,name:'lengthBox',
                            items:[
                            ]
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '数据类型',
                            name: 'data_format_id',
                            allowBlank: false,
                            store:'data.DataFormatStore',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            anchor: '50%',
                            editable: false
                        },
                        {
                            xtype: 'grid',
                            border: true,
                            name:'stationGrid',
                            anchor: '100%',
                            height : 250,
                            store: 'alarm.AllSelectEntityStore',
                            columns: [
                                {header: '显示', dataIndex: 'checked', xtype:'checkcolumn'},
                                {header: '', dataIndex: 'entity_id', hidden: true},
                                {header: '站点', dataIndex: 'entity_name', flex: 1,align:'center'}
                            ]
                        },
                        {xtype:'button',text:'显示选择站点下的数据项目',name:'showItemBtn', anchor: '40%'},
                        {
                            xtype: 'grid',
                            border: true,
                            stripeRows : true,
                            manageHeight:true,
                            loadMask:true,
                            anchor: '100%',
                            height : 300,
                            name:'itemGrid',
                            hidden:true,
                            multiSelect: true,
                            store: 'alarm.AllSelectConditionItemStore',
                            columns: [
                                {header: '', dataIndex: 'id', hidden: true},
                                {header: '', dataIndex: 'condition_id', hidden: true},
                                {header: '', dataIndex: 'entity_id', hidden: true},
                                {header: '', dataIndex: 'data_item_id', hidden: true},
                                {header: '显示', dataIndex: 'checked', xtype:'checkcolumn'},
                                {header: '站点', dataIndex: 'entity_name', flex: 2,align:'center'},
                                {header: '数据项', dataIndex: 'data_item_name', flex: 2,align:'center'}
                            ],
                            listeners:{
                                change:function( t, newValue, oldValue, eOpts ){
                                    t.getSelectionModel().getSelection()[0].set('checked',true);
                                }
                            }
                        }
                    ],
                    buttons:[
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

                }
            ]
        });
        this.callParent(arguments);
    }
});