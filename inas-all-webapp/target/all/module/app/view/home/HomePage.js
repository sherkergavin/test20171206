/**
 * Created by luyufei on 2016/2/1.
 */

Ext.define('inas.view.home.HomePage', {                            //定义tabpanel组件
    extend: 'Ext.app.PortalPanel',
    alias:'widget.homepage',

    margin: '5 20 20 20',
    layout:'column',
    items: [
        {
           id: 'col-1',
           items: [
               //Ext.create('inas.view.home.FormStartByMeView'),
               Ext.create('inas.view.home.ExecutingScheduleFormView'),
               Ext.create('inas.view.home.PlanningScheduleFormView')
          ]
        }
     //   {
     //   id: 'col-2',
     //   items: [
     //          Ext.create('inas.view.home.FormPassView'),
     //          Ext.create('inas.view.home.FormCompleteView')
     //   ]
     //}
    ]
});
