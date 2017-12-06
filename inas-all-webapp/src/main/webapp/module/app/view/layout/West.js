/**
 * Created by WangJm on 2015/4/11.
 */
Ext.define('inas.view.layout.West', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.navigation',
    initComponent: function () {
        Ext.apply(this, {
            region: 'west',
            id: 'west-panel', // see Ext.getCmp() below
//            title: 'West',
            split: true,
            width: 230,
            collapsible: true,
            animCollapse: true,
            layout: 'accordion',
            listeners: {
                'afterrender': function (p) {
                    var task = {
                        run: function () {
                            p.setTitle(Ext.Date.format(new Date(), 'Y年m月d日 G:i:s'));
                        },
                        interval: 1000
                    }
                    Ext.TaskManager.start(task);
                }
            }
        })
        this.callParent(arguments);
    }
})