/**
 * Created by ZS on 2015/7/31.
 */
Ext.define('inas.view.work.WorkHistory',{
    extend:'Ext.panel.Panel',
    alias:'widget.historyPanel',
    initComponent:function(){
        var m=this;
        var tbar = Ext.create("Ext.Toolbar", {
            align: 'center',
            region: 'north',
            height: '65',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel : '月份',
                    name: 'searchMonth',
                    format: 'Y-m'
                }
                ,
                {
                    xtype:'jbutton',
                    action:'search'
                }
            ]
        });
        var mineStore=Ext.create('inas.store.system.UserStore');
        Ext.apply(this,{
            title:'历史日志',
            layout:'border',
            modal:true,
            defaults: {
                anchor: '100%'
            },
            items:[
                tbar,
                {
                xtype:'grid',
                layout:'fit',
                    width: '88%',
                    region: 'center',
                    border:true,
                store:'work.WorkHistoryStore',
                stripeRows: true,//斑马线效果
                forceFit: true,//填充页面
                columns: [
                    { text:'',dataIndex:'id',hidden:true},
                    { text: '日期',editor:'textfield', dataIndex: 'daily_date',renderer : Ext.util.Format.dateRenderer('Y-m-d') },
                    {text: '', dataIndex: 'user_moperator_id',hidden:true},
                    { text: '', dataIndex: 'user_aoperator_id',hidden:true},
                    { text: '', dataIndex: 'user_eoperator_id',hidden:true},
                    {text: '早班', dataIndex: 'user_mopName'},
                    { text: '中班', dataIndex: 'user_aopName'},
                    { text: '晚班', dataIndex: 'user_eopName'}
                ]
            }
            ]
        })
        this.callParent(arguments);
    }
});