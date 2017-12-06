Ext.define('inas.view.data.BindView',{
    extend:'Ext.panel.Panel',
    alias:'widget.bind',
    title:'数据绑定',
    layout:'border',
    requires: ["Ext.ux.TreePicker",'Jm.button.Button'],
    closable:true,
    items:[
        {
            xtype:'treepanel',
            name:'d_bindTree',
            region:'west',
            width:'18%',
            forceFit:true,
            border: true,
            store: 'pm.BindStore',
            rootVisible:false
        },//treepanel
        //form
        {
            xtype:'form',
            method:'post',
            region:'center',
            border:true,
            name:'d_bind',
            layout: 'anchor',
            defaults: {
                anchor: '98%',
                margin:'5 10 0 10',
                labelWidth:120
            },
            items:[
                {xtype:'hiddenfield',name:'id'},//上右下左
                {
                    xtype:'radiogroup',
                    fieldLabel:'绑定类型',
                    columns:2,
                    style:'',
                    name:'group',
                    vertical:false,
                    items:[
                        {boxLabel:'视图',name:'type',inputValue:'0'},
                        {boxLabel:'数据表',name:'type',inputValue:'1',checked: true}
                    ]
                },
                {
                    xtype:'treepicker',fieldLabel:'隶属于<span style="color:red;">*</span>',
                    name:'parent_id',
                    //store:'data.AllBindStore',
                    queryMode:'local',
                    displayField:'text',
                    valueField:'id',
                    fieldLabel:'请选隶属用户',
                    rootVisible: false,
                    minPickerHeight: 300,
                    defaults: {autoScroll: true},
                    //triggerAction:'all'
                    store:Ext.create('Ext.data.TreeStore',{
                        fields: ['id','text'],
                        proxy : {
                            type : 'ajax',
                            url :      projectGP('/bind/getBindTree'),
                            reader:{
                                type:'json'
                            }
                        },
                        autoLoad:false,
                        // 设置根节点
                        root : {
                            text : '全市',
                            expanded: true
                        }

                    })
                },
                {xtype:'textfield',fieldLabel:'名称<span style="color:red;">*</span>',name:'name',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {
                    xtype:'combo',fieldLabel:'站点类型<span style="color:red;">*</span>',
                    name:'entity_type_id',
                    store:'pm.StationTypeStore',
                    queryMode:'local',
                    displayField:'name',
                    valueField:'id',
                    editable:false,
                    triggerAction:'all',
                    allowBlank:false
                },
                {fieldLabel: '重复列数<span style="color:red;">*</span>', xtype: 'numberfield', name: 'col_cnt',minValue:1,maxText : '最小值为1',allowBlank:false},
                {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序',minValue: 0, name: 'lo',maxLength:9,maxLengthText:'最多可输入9个字符'},
                {xtype:'textarea',fieldLabel:'备注',name:'description',maxLength:2000,maxLengthText:'最多可输入2000个字符'}
            ]
        }
    ],
    buttons:[
        {
            xtype:'jbutton',
            action:'dataRootAdd',
            text:'添加根目录',
            iconCls:'add'
        },


        {
            xtype:'jbutton',
            action:'dataChildAdd',
            text:'添加子节点',
            iconCls:'add'
        },

        //增加
        {
            xtype:'jbutton',
            action:'delete'
        },//删除
        '->',

        {
            xtype:'button',
            text:'绑定数据项与站点',
            iconCls:'add',
            action:'bindColumnRow'
        },
        {
            xtype:'jbutton',
            action:'bindData',
            text:'绑定数据',
            iconCls:'add'
        }
        ,
        {
            xtype:'jbutton',
            action:'save'
        },//保存
        {
            xtype:'jbutton',
            action:'reset'
        }
    ]
});