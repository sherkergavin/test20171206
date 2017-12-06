Ext.define('inas.view.system.User',{
    extend:'Ext.grid.Panel',
    alias:'widget.user',
    requires: [
        "Ext.ux.TreePicker"
    ],
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            closable:true,
            title:'人员管理',
            layout:'fit',
            store:'system.UserStore',
            columns:[
                {header:'',dataIndex:'id',hidden:true},
                {header:'',dataIndex:'organization_id',hidden:true},
                {header:'用户名',dataIndex:'user_name',flex:1,align:'center'},
                {header:'所属机构',dataIndex:'organization_name',flex:1,align:'center'},
                {header:'昵称',dataIndex:'staff_emp_name',flex:1,align:'center'},
                {header:'真实姓名',dataIndex:'staff_real_name',flex:1,align:'center'},
                {header:'代码',dataIndex:'staff_code',flex:1,align:'center'},
                {header:'类型',dataIndex:'staff_class',flex:1,align:'center'},
                {header:'状态',dataIndex:'staff_state',flex:1,align:'center'},
                {header:'性别',dataIndex:'staff_gender',flex:1,align:'center'},
                {header:'生日',dataIndex:'staff_birth',flex:1,align:'center',hidden:true/*,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')*/},
                {header:'电话',dataIndex:'staff_tel',flex:1,align:'center'},
                {header:'地址',dataIndex:'staff_address',flex:1,align:'center',hidden:true},
                {header:'邮编',dataIndex:'staff_zipcode',flex:1,align:'center',hidden:true},
                {header:'邮箱',dataIndex:'staff_email',flex:1,align:'center',hidden:true},
                {header:'备注信息',dataIndex:'staff_desc',align:'center',hidden:true},
                {header:'排列顺序',dataIndex:'lo',flex:1,align:'center'}
            ],
            buttons:[{
                xtype:'jbutton',
                action:'add'
            },{
                xtype:'jbutton',
                action:'edit'
            },{
                xtype:'jbutton',
                action:'delete'
            }]
        });
        this.callParent(arguments);
    }
});