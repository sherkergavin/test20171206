/**
 * Created by WangJm on 2015/4/11.
 */
Ext.define('inas.view.layout.Center', {                            //定义tabpanel组件
    extend: 'Ext.tab.Panel',
    alias:'widget.maintab',
    requires: [
        'Ext.ux.IFrame',
        'Ext.ux.TabCloseMenu'
    ],
    //alias : 'widget.Center',//别名
    initComponent: function () {
        var me = this;
        var iframe = Ext.create('Ext.ux.IFrame', {
            src: ''
        });
        Ext.apply(this, {
            id: 'center-tabpanel',
            region: 'center',                              //渲染在border样式的中部
            bodyStyle:"background:url("+sxtGP('/newbg.jpg')+");background-repeat: no-repeat;",// GWJ 项目合并 添加背景图片
            defaults: {
                bodyPadding: 0
            },
            activeTab: 0,
            border: false,
            plugins: Ext.create('Ext.ux.TabCloseMenu', {                //右键关闭菜单组件
                closeTabText: '关闭当前页',
                closeOthersTabsText: '关闭其他页',
                closeAllTabsText: '关闭所有页'
            }),/* GWJ 项目合并(AM,SM,OAM,PM),不合适用某个单独系统的首页当首页,故首页省略
            items: [{
                id: 'HomePage',
                title: '首页',
                layout: 'fit',
                xtype: 'panel',
                items:[
                    Ext.create('inas.view.home.HomePage')
                ]
            }],*/
            listeners: {
                'remove': function (t, component, eOpts) {
                    t.remove(component);
                }
            }
        });
        this.callParent(arguments);
    }
});