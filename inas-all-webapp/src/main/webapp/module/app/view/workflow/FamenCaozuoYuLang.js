/**
 * Created by Administrator on 2016/4/14.
 */

Ext.define('inas.view.workflow.FamenCaozuoYuLang',{
    extend:'Ext.window.Window',
    alias:'widget.FamenCaozuoYuLang',

     config:{
         attachmentFile1:null,
         attachmentFile2:null,
         attachmentFile3:null,
         attachmentFile4:null
     },

    initComponent:function(){
        var me = this;
        var i = 0;
        var total=0;
        var a = [];//此处定义一个要加载的数据数组

        if (me.attachmentFile1 != null && me.attachmentFile1 != ""){
            total++;
            a.push(me.attachmentFile1);
        }

        if (me.attachmentFile2 != null && me.attachmentFile2 != ""){
            total++;
            a.push(me.attachmentFile2);

            //alert(total);

        }
        if (me.attachmentFile3 != null && me.attachmentFile3 != ""){
            a.push( me.attachmentFile3);
            total++;
        }

        if (me.attachmentFile4 != null && me.attachmentFile4 !=""){
            a.push(me.attachmentFile4);
            total++;
        }
        if(total==0){
            Ext.Msg.alert("提示", "没有上传文件");
            this.close();

        }
        //var imagelist = Ext.create('inas.store.workflow.FamenCaozuoStore')
        Ext.apply(me,{
            title:'图片预览',
            width:'65%',
            height:'65%',
            layout:'fit',
            modal: true,
            region : 'center',

            buttonAlign:'center',
            items:[
                {
                region:'center',
                id:'test2',
                title:'',
                html : '<iframe src="'+ftpHttpUrl() +a[0]+ '" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>'
                //html: "<iframe scrolling='yes' id = 'main' width='100%' height='100%'  frameborder='0' src='http://www.sina.com.cn/'></iframe>"

                   }

               ],

            buttons:[{
                //xtype: 'jbutton',
                //action:'confirm'
                text:'上一张',
                onClick:function(){
                    //alert(i);
                    if(--i>=0) {
                        //alert(a[i % total]);
                        var str = a[i];
                        str = ftpHttpUrl() + str;
                        //alert(str);
                        //Ext.get("test2").update("<iframe scrolling='yes' id = 'main' width='100%' height='100%'  frameborder='0' src=+""   ></iframe>");
                        Ext.get("test2").update('<iframe src="' + ftpHttpUrl() + me.attachmentFile1 + '" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>');

                    }else{
                        i=0;
                        Ext.Msg.alert("提示", "这是第一份文件");
                    }
                }


            }, {
                //xtype:'jbutton',
                //action:'close'
                id:'next',
                text:'下一张',
                onClick:function() {
                    //alert(i);

                    if (++i < total){
                     var str1 = a[i];
                    str1 = ftpHttpUrl() + str1;
                    //alert(str1);
                    //Ext.get("test2").update("<iframe scrolling='yes' id = 'main' width='100%' height='100%'  frameborder='0' src=+""   ></iframe>");
                    Ext.get("test2").update('<iframe src="'+str1+ '" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>');
                        //alert(i);
                    //this.items.last();
                    //////Ext.get("main").load({url: "http://www.baidu.com/"});
                }else{
                        i=total-1;
                        Ext.Msg.alert("提示", "这是最后一份文件");
                    }
                    }

            }]
        })


        this.callParent(arguments);
    }
});