/**
 * Created by luyufei on 2016/1/26.
 */
Ext.define('inas.view.report.DataDayReportWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.dataDayReportWin',
    title:'日报表',

    config:{
        dataItemId : 0,
        startTime : new Date(),
        endTime: new Date()
    },

    initComponent: function () {
        var me = this;
        //var iframe = Ext.create('Ext.ux.IFrame', {
        //    align:'center',
        //    frameName: 'Iframe',
        //    //src : 'https://www.baidu.com/',
        //    listeners:{
        //        'afterrender':function(t){
        //            alert('/data_item_day_report.cpt&op=write&data_item_id=' + me.getDataItemId() + '&startTime=' +  Ext.util.Format.date(me.getStartTime(),'Y-m-d H:i:s') + '&endTime=' + Ext.util.Format.date(me.getEndTime(),'Y-m-d H:i:s'));
        //            //t.src = 'http://192.168.3.5:8075/WebReport/ReportServer?reportlet=data_item_day_report.cpt&op=write&data_item_id=' + me.getDataItemId() + '&startTime=' +  Ext.util.Format.date(me.getStartTime(),'Y-m-d H:i:s') + '&endTime=' + Ext.util.Format.date(me.getEndTime(),'Y-m-d H:i:s');
        //            t.update("https://www.baidu.com");
        //        }
        //    }
        //});
        Ext.apply(this, {
            layout: 'fit',
            resizable : false,
            width : 1000,
            height : 700,
            modal : true,
            listeners : {
                'afterrender':function(t){
                    t.html = '<iframe id="iframe" src="https://www.baidu.com/" width=100% height=100%>'
                }
            }
            //items:iframe
        });
        this.callParent(arguments);
    }
});