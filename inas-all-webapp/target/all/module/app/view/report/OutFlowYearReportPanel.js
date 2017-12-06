/**
 * Created by luyufei on 2016/4/22.
 */
Ext.define('inas.view.report.OutFlowYearReportPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.outFlowYearReportPanel',
    title:'供水量年报表',
    initComponent: function () {
        var me = this;
        var iframe = Ext.create('Ext.ux.IFrame', {
            align:'center',
            frameName: 'Iframe',
            src: reportIp('/water_out_flow_year_report.cpt&op=write&user_name=' + Jm.USER.LOGIN_NAME + '&real_name=' + Jm.USER.REAL_NAME)
        });
        Ext.apply(this, {
            layout: 'fit',
            items:iframe
        });
        this.callParent(arguments);
    }
});