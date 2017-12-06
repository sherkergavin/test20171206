Ext.define('inas.view.data.CurrentData', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.currentData',
    initComponent: function () {
        var me = this;
        this.bind_id='';
        this.type_id='';
        this.mytbar = Ext.create('Ext.toolbar.Toolbar', {
            style: 'background:#ADD2ED',
            height: 35
        });
        Ext.apply(this, {
            title: '实时数据',
            tbar: me.mytbar,
            autoScroll:true,
            items: []
        });
        this.callParent(arguments);
    }
})

