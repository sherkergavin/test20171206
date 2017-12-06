/**
 * Created by WangJm on 2015/4/11.
 */
Ext.define('inas.view.Viewport',{
    extend: 'Ext.container.Viewport',
    //不添加报Waring，不影响运行
    requires:[
        'inas.view.layout.North',
        'inas.view.layout.South',
        'inas.view.layout.West',
        'inas.view.layout.Center'
    ],

    initComponent: function () {

        var me = this;

        Ext.apply(me, {
        layout:'border',
            items:[
                Ext.create('inas.view.layout.North'),
                Ext.create('inas.view.layout.South'),
                Ext.create('inas.view.layout.West'),
                Ext.create('inas.view.layout.Center')
            ]
        });
        this.callParent(arguments);
    }
});