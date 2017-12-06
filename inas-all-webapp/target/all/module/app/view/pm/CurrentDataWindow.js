Ext.define('inas.view.pm.CurrentDataWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.CurrentDataWindow',//别名
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            width: 700,
            height: 500,
            layout: 'fit',
            title: '站点实时数据',
            modal: true,
            items: [
                {

                    xtype: 'gridpanel',
                    store: 'pm.CurrentDataWindowStore',
                    stripeRows: true,//斑马线效果
                    forceFit: true,//填充页面
//                    selType: 'cellmodel',
                    columns: [
                        Ext.create('Ext.grid.RowNumberer'),
                        { text: '名称', dataIndex: 'NAME', align: 'center'},
                        { text: '数据', dataIndex: 'DATA_VALUE', align: 'center', renderer: function (value, cellmeta, record, rowIndex, colIndex) {
                            //var v = parseInt(value);
                            //var status = record.get('item_status');
                            //if (parseInt(status) == 2) {
                            //    if (v == 0) {
                            //        return "中断";
                            //    } else {
                            //        return "正常";
                            //    }
                            //
                            //}
                            return value;
                        }},
                        { text: '时间', dataIndex: 'RECORD_TIME', align: 'center'  ,
                            renderer: function (value) {
                               if(value!=null && value!='' && value!=0){
                                   return Ext.Date.format(new Date(value),'Y-m-d H:i:s');
                               }else{
                                  return null;
                               }
                                //return new Date(value);
                            }
                        }

                    ]

                }
            ]
        })
        this.callParent(arguments);
    }
})



