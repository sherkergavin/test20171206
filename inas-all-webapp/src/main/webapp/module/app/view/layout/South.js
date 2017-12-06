/**
 * Created by WangJm on 2015/4/11.
 */
Ext.define('inas.view.layout.South',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.southBar',//别名
    region: 'south',
    initComponent : function(){
        var me=this;
        Ext.apply(this, {
            height : 40,
            border:true,
            items :[],
            listeners:{
                render:function(t){
                    t.add(Jm.Constant.VERSION);
                    Ext.Ajax.request({
                        url: projectGP('/module/getCurrentUserName'),
                        success: function(response){
                            var text = Ext.JSON.decode(response.responseText);
                            Jm.USER.LOGIN_NAME=text.data.user_name;
                            Jm.USER.REAL_NAME=text.data.staff_real_name;
                            Jm.USER.ORGNIZATION_ID=text.data.organization_id;//机构Id
                            t.add(['->','欢迎您，'+text.data.user_name+' ['+text.data.staff_real_name+']','-']);
                        }
                    });
                }
            }

        });
        this.callParent(arguments);
    }
});