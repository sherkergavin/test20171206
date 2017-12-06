/**
 * Created by luyufei on 2016/2/22.
 */

Ext.define('inas.view.report.BorderPipelineFlowDailyReportPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.borderPipelineFlowDailyReportPanel',
    title:'边界管网流量日报表',
    initComponent: function () {
        var me = this;
        var iframe = Ext.create('Ext.ux.IFrame', {
            align:'center',
            frameName: 'Iframe',
            src: reportIp('/WaterDailyTraffic.cpt')
        });
        Ext.apply(this, {
            layout: 'fit',
            items:iframe
        });
        this.callParent(arguments);
    }
});
