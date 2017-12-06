/**
 * Created by ZS on 2015/7/30.
 */
Ext.define('inas.view.work.WorkInsWindown',{
    extend:'Ext.window.Window',
    alias:'widget.instructWin',
    initComponent:function(){
        var me=this;
        Ext.apply(this,{
            title:'工作指示',
            width:500,
            height:250,
            buttonAlign:'center',
            modal:true,
            items:[{
                xtype:'form',
                layout: 'anchor',
                bodyPadding : 5,
                defaults: {
                    anchor: '95%',
                    margin: '5 0 0 5'
                },
                items:[{
                    xtype: 'hiddenfield',
                    name: 'id'
                },{
                    xtype:'datefield',
                    fieldLabel:'时间',
                    name:'mon',
                    allowBlank: false,
                    editable: false,
                    value : Ext.Date.clone(new Date()),
                    format:'Y-m-d'
                },{
                    xtype:'textareafield',
                    fieldLabel: '工作指示',
                    allowBlank: false,
                    name: 'content'
                }]
            }],
            buttons: [{
                xtype: 'jbutton',
                action:'save'
            }, {
                xtype:'jbutton',
                action:'reset'
            }]
        });
        this.callParent(arguments);
    }
});
