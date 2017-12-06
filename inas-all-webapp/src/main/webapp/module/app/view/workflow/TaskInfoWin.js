/**
 * Created by ZS on 2015/7/30.
 */
Ext.define('inas.view.workflow.TaskInfoWin',{
    extend:'Ext.window.Window',
    alias: 'widget.TaskInfoWin',
    initComponent:function(){
        var me=this;
        Ext.apply(this,{
            title:'测试表单',
            width:'95%',
            height:'90%',
            buttonAlign:'center',
            modal:true,
            html :''
        })
        this.callParent(arguments);
    }
});
