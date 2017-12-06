/**
 * Created by luyufei on 2016/1/18.
 */

Ext.define('inas.view.report.OutFlowChangQiaoDailyReportPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.outFlowChangQiaoDailyReportPanel',
    title:'长桥水厂供水量日报表',
    initComponent: function () {
        var me = this;
        var iframe = Ext.create('Ext.ux.IFrame', {
            align:'center',
            frameName: 'Iframe',
            src: reportIp('/water_out_flow_changeqiao_day_report.cpt&op=write&user_name=' + Jm.USER.LOGIN_NAME + '&real_name=' + Jm.USER.REAL_NAME)
        });
        Ext.apply(this, {
            layout: 'fit',
            items:iframe
        });
        this.callParent(arguments);
    }
});