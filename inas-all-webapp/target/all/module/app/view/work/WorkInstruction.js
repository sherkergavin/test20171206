/**
 * Created by ZS on 2015/7/29.
 */
Ext.define('inas.view.work.WorkInstruction', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.instructionPanel',
    initComponent: function () {
        var m = this;
        var tbar = Ext.create("Ext.Toolbar", {
            align: 'center',
            region: 'north',
            height: '65',

            items: [{
                xtype: 'jbutton',
                action: 'add'
            }, {
                xtype: 'jbutton',
                action: 'edit'
            }, {

                xtype: 'datefield',
                name: 'searchMonth',
                editable: false,
                value : Ext.Date.clone(new Date()),
                format: 'Y-m'
            },
            {
                xtype: 'jbutton',
                action: 'search'
            },{
                xtype: 'jbutton',
                action: 'delete'
            }]
        });

        Ext.apply(this, {
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                tbar, {
                    xtype: 'grid',
                    width: '88%',
                    region: 'center',
                    border: true,
                    layout: 'fit',
                    store: 'work.WorkInstructStore',
                    columns: [{
                        text: '',
                        dataIndex: 'id',
                        hidden: true
                    },{
                        text: '时间',
                        dataIndex: 'daily_date',
                        editable: false,
                        flex: 2,
                        align: 'center',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d')
                    },{
                        text: '指示内容',
                        dataIndex: 'content',
                        editor: 'textfield',
                        flex: 8,
                        align: 'left'
                    }]
                }
            ]
        });
        this.callParent(arguments);
    }
});