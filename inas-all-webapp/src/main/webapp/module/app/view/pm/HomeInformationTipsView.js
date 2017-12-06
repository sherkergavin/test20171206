//Ext.define('',{
//    extend:'Ext.Panel',
//        title:'测试',
//        xtype: 'panel',
//    //floating:true,
//        shadow:true,
//        //draggable:true,
//        collapsible:true,
//        html:'测试',
//        //pageX:100,
//        //pageY:50,
//        width:200,
//        height:50
//});
Ext.require([
    'Ext.window.Window',
    'Ext.tab.*',
    'Ext.toolbar.Spacer',
    'Ext.layout.container.Card',
    'Ext.layout.container.Border'
]);


Ext.define('inas.view.pm.HomeInformationTipsView', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        this.store=Ext.create('inas.store.pm.HomeInformationTipsStore');
        this.grid={
            //extend: 'Ext.grid.Panel',
            xtype: 'grid',
            store: me.store,
            columns: [
                /* new Ext.grid.RowNumberer(),
                 {text:'编号',dataIndex:'id'},*/
                {text: '名称', dataIndex: 'names', width: 200},
                {text: '数量', dataIndex: 'text', flex: 1}
                //{text:'Sex',dataIndex:'sex',renderer:renderSex}
            ]
        };
        Ext.apply(this, {
            width: 500,
            title:'待处理信息',
            id:'HomeInformationTipsWindow',
            items: [
               me.grid
            ]
        })
        this.callParent(arguments);
    }
});
