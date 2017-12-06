/**
 * Created by luyufei on 2016/3/3.
 */
Ext.define('inas.view.report.OutFlowYangShuPuDailyReportCompanyPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.outFlowYangShuPuDailyReportCompanyPanel',
    title:'杨树浦水厂供水量日报表',
    initComponent: function () {
        var me = this;
        var iframe = Ext.create('Ext.ux.IFrame', {
            align:'center',
            frameName: 'Iframe',
            src: reportIp('/water_out_flow_yangshupu_day_report_company.cpt&op=write&user_name=' + Jm.USER.LOGIN_NAME + '&real_name=' + Jm.USER.REAL_NAME)
        });
        Ext.apply(this, {
            layout: 'fit',
            items:iframe
        });
        this.callParent(arguments);
    }
});