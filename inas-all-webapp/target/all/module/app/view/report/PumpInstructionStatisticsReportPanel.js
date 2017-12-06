/**
 * Created by JM-SD09 on 2015/10/26.
 */
Ext.define('inas.view.report.PumpInstructionStatisticsReportPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.yearReportPanel',
    title:'年报表',
    initComponent: function () {
        var me = this;
        var iframe = Ext.create('Ext.ux.IFrame', {
            align:'center',
            frameName: 'Iframe',
            src: reportIp('/PumpInstructionStatistics.cpt&op=write')
        });
        Ext.apply(this, {
            layout: 'fit',
            items:iframe
        });
        this.callParent(arguments);
    }
});