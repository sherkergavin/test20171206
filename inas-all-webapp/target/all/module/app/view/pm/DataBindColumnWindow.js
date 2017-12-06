Ext.define('inas.view.pm.DataBindColumnWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Jm.button.Button'
    ],
    alias: 'widget.dataBindColumnWindow',
    initComponent: function () {
        var me = this;
        this.bind_id = '';
        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
        this.dataTypeItemAllStore = Ext.create('inas.store.pm.DataTypeItemAllStore');
        this.combo = Ext.create('Ext.form.ComboBox', {
            name: 'dataTypeItemAllCombo',
            store: me.dataTypeItemAllStore,
            queryMode: 'local',
            displayField: 'NAME',
            valueField: 'ID',
            allowBlank: false,

            editable: false
        });

          Ext.apply(this, {
            width: 600,
            height: 800,
            //layout: 'anchor',
            //autoScroll:true,
              overflowY:'auto',
            modal: true,
              defaults: {
                  anchor: '90%',
                  margin: '15 20 30 15'
              },
            items: [
                {
                    xtype:'fieldset',
                    width:'95%',
                    title:'<span style="color:green;">选择要绑定的数据列',
                    items:[
                        {

                            xtype: 'gridpanel',
                            name:'columGrid',
                            store: 'pm.DataBindColumnStore',
                            plugins: [
                                me.cellEditing
                            ],
                            stripeRows: true,//斑马线效果
                            forceFit: true,//填充页面
                            selType: 'cellmodel',
                            columns: [
                                { text: '绑定列名', dataIndex: 'name', editor: {
                                    allowBlank: false
                                }},
                                { text: '数据类型', dataIndex: 'data_format_id', editor: me.combo
                                    , renderer: function (value, metaData, record) {
                                    //var index = me.dataTypeItemAllStore.find(me.combo.valueField, value);
                                    //var rec = me.dataTypeItemAllStore.getAt(index);
                                    //if (rec == null) {
                                    if ('' == value || null == value || 0 == value) {
                                        return null;
                                    } else {
                                        var store = me.dataTypeItemAllStore;
                                        var index = store.findExact('ID', value);
                                        return store.getAt(index).get('NAME');
                                    }
                                }
                                },
                                { text: '列宽', dataIndex: 'width', editor: {
                                    xtype: 'numberfield'
                                }} ,
                                { text: '排序', dataIndex: 'lo', editor: {
                                    xtype: 'numberfield'
                                    //allowBlank: false

                                }},
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    menuDisabled: true,
                                    items: [
                                        {
                                            iconCls: 'delete',
                                            tooltip: '删除站点',
                                            scope: this,
                                            handler: function (grid, rowIndex) {
                                                var record = grid.getStore().getAt(rowIndex);
                                                if (record.get('id') == null || record.get('id') == '') {
                                                    grid.getStore().remove(record);
                                                } else {
                                                    Ext.Msg.confirm('提示', '您确定要删除吗?', function (btn) {
                                                        if (btn == 'yes') {
                                                            Ext.Ajax.request({
                                                                url:projectGP( '/data/deleteDataBindColumnById'),
                                                                method:"POST",
                                                                params: {
                                                                    id: record.get('id')
                                                                },
                                                                success: function (response) {
                                                                    if (Ext.decode(response.responseText).success) {
                                                                        grid.getStore().remove(record);

                                                                    }
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                }

                            ]

                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    width: '95%',
                    title: '<span style="color:red;">选择要绑定的站点',
                    items:[
                        {
                            xtype: 'checkboxgroup',
                            name :'checkedGp',
                            columns: 3,
                            anchor:"95%",
                            msgTarget:"side",
                            listeners:{
                                change:function(gp,nv,ov,eOpts){
                                    // 全选
                                    if(nv.all && !ov.all)
                                        return gp.eachBox(function(box,idx){
                                            box.setRawValue(true);
                                        });

                                    // 反选
                                    if(ov.all && !nv.all)
                                        return gp.eachBox(function(box,idx){
                                            box.setRawValue(false);
                                        });

                                }

                            },
                            items:[
                                //{boxLabel: '全选', name: 'all'},
                            ]
                        }
                    ]
                }

            ],
              buttons: [
                  { xtype: 'jbutton',
                      action:'add'
                  },
                  ,
                  { xtype: 'jbutton',
                      action:'save'

                  },
                  { xtype: 'jbutton',
                      action:'reset'
                  }
              ]
        })
        this.callParent(arguments);
    }
})



