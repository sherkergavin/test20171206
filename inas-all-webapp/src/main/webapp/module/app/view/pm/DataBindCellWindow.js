Ext.define('inas.view.pm.DataBindCellWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Jm.button.Button'
    ],
    alias: 'widget.dataBindCellWindow',//别名
    initComponent: function () {
        var me = this;
        this.bind_id = '';
        this.entity_id = '';

        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
        Ext.apply(this, {
            width: 600,
            height: 500,
            layout: 'fit',
            title: '数据绑定',
            modal: true,
            items: [
                {

                    xtype: 'gridpanel',
                    store: '',
                    plugins: [
                        me.cellEditing
                    ],
                    trackMouseOver:false,
                    stripeRows: true,//斑马线效果
                    forceFit: true,//填充页面
                    selType: 'cellmodel',//单元格
                    columns: []

                }

            ],
            buttons: [

                {
                    xtype:'jbutton',
                    action:'save'
                },
                {
                    xtype:'jbutton',
                    action:'reset'
                }
            ]
        })
        this.callParent(arguments);
    }
})



