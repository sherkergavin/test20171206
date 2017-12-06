/**
 * Created by JM-SD09 on 2015/10/26.
 */
Ext.define('inas.view.report.PressurePanel', {
    extend: 'Ext.panel.Panel',
    initComponent: function () {
        var me = this;
        var iframe = Ext.create('Ext.ux.IFrame', {
            align:'center',
            frameName: 'Iframe',
            src: reportIp('Pressure.cpt&op=write')
        });
        Ext.apply(this, {
            layout: 'fit',
            items:iframe
        });
        this.callParent(arguments);
    }
});