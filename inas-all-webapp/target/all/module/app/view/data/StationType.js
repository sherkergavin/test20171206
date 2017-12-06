Ext.define('inas.view.data.StationType', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.StationType',//别名
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            store: 'data.StationTypeStore',
            stripeRows: true,//斑马线效果
            forceFit: true,//填充页面
            features: [{
                ftype: 'grouping'
            }],
            //buttons: [{ xtype: 'jbutton',
            //    action:'add'
            //}, { xtype: 'jbutton',
            //    action:'edit'
            //}, {
            //    xtype: 'jbutton',
            //    action:'delete'
            //}],
            columns: [
                { text: '编码', dataIndex: 'code' },
                { text: '名称', dataIndex: 'name'},
                { text: '类型', dataIndex: 'category_name'} ,
                { text: '备注', dataIndex: 'category' }   ,
                { text: '排序', dataIndex: 'lo' }
            ]
        });
        this.callParent(arguments);
    }
});