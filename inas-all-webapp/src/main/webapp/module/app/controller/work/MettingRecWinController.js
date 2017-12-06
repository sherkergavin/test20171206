/**
 * Created by ZS on 2015/8/06.
 */
Ext.define('inas.controller.work.MettingRecWinController',{
    extend:'Ext.app.Controller',
    refs:[{
        ref:'mettingRecWin',
        selector:'mettingRecWin'
    },
        {
            ref:'metRecForm',
            selector:'mettingRecWin>form'
        },
        {
            ref:'mettingRecGrid',
            selector:'mettingRecPanel>grid'
        }
    ],
    init:function(){
        this.control({
            'mettingRecWin button[action="save"]':{
                click:this.doSave
            }
            ,
            'mettingRecWin button[action="reset"]':{
                click:this.doReset
            },
            //docBtn2,imgBtn3
            'mettingRecWin button[name="imgBtn1"]':{
                click:this.downloadByBtn
            },'mettingRecWin button[name="imgBtn2"]':{
                click:this.downloadByBtn
            },'mettingRecWin button[name="imgBtn3"]':{
                click:this.downloadByBtn
            },'mettingRecWin button[name="imgBtn4"]':{
                click:this.downloadByBtn
            },
            'mettingRecWin button[name="docBtn1"]':{
                click:this.downloadByBtn
            },
            'mettingRecWin button[name="docBtn2"]':{
                click:this.downloadByBtn
            },
            'mettingRecWin button[name="docBtn3"]':{
                click:this.downloadByBtn
            },
            'mettingRecWin button[name="docBtn4"]':{
                click:this.downloadByBtn
            }
        });
    },
    doSave:function(btn){
        var me=this;
        var wi=me.getMettingRecWin();
        var metForm=me.getMetRecForm().getForm();
        console.log("1");
        if (metForm.isValid()) {
            console.log("2");
            metForm.submit({
                method: "POST",
                url: projectGP('/mettingRec/saveMettingRec'),
                success: function (fm, action) {
                    wi.close();
                    me.getMettingRecGrid().getStore().load();
                },
                failure: function (fm, action) {
                    //Jm.Msg.error('加载错误！请联系管理员！'+action);
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                    }
                }

            });
        }
    },
    doReset:function(btn){
        var me=this;
        var form=me.getMetRecForm();
        var id=form.getForm().findField('id').getValue();
        form.getForm().reset();
        if(id!=null && id!=''){
            var mGrid=me.getMettingRecGrid();
            var recode=mGrid.getSelectionModel().getSelection()[0];
            recode=mGrid.getStore().findRecord('id',recode.get('id'));
            if(recode){
                form.getForm().loadRecord(recode);
                form.down('fileuploadfield[name="met_img1"]').emptyText=recode.get('img1');
                form.down('fileuploadfield[name="met_doc1"]').emptyText=recode.get('doc1');
                form.down('fileuploadfield[name="met_img2"]').emptyText=recode.get('img2');
                form.down('fileuploadfield[name="met_doc2"]').emptyText=recode.get('doc2');
                form.down('fileuploadfield[name="met_img3"]').emptyText=recode.get('img3');
                form.down('fileuploadfield[name="met_doc3"]').emptyText=recode.get('doc3');
                form.down('fileuploadfield[name="met_img4"]').emptyText=recode.get('img4');
                form.down('fileuploadfield[name="met_doc4"]').emptyText=recode.get('doc4');
                form.down('datefield[name="hyTime"]').setValue(recode.get('time'));
            }
        }
    }
    ,
    //下载的公用方法
    download:function(myrecode,myfileName){
            if (myrecode) {
                var myFileValue=myrecode.get(myfileName);
                if(myFileValue!=null && myFileValue!=''){

                    var lastIndext=myFileValue.lastIndexOf("/");//获取到最后一个‘/’的下标
                    var lastPath=myFileValue.substr(-0,lastIndext);
                    var lastName=myFileValue.substr(lastIndext+1,myFileValue.length-1);

                    var trrIndex=lastName.lastIndexOf(".");
                    var fielTrue=encodeURI(encodeURI(lastName.substr(0,trrIndex)));//文件名称
                    var trrTrue=lastName.substr(trrIndex,lastName.length);//文件后缀

                    var fielPath=Jm.DB.FTP_DOWN+myFileValue;
                    var loadPath=encodeURI(encodeURI(fielPath));
                    var url = projectGP('/module-jsp/app/download.jsp?fileName='+fielTrue+"&trrTrue="+trrTrue+'&filepath='+loadPath);
                    //alert(url);
                    window.open(url);

                }
            }else{
                Jm.MessageBox.error('没有可以下载的文件！');
            }
    }
    ,


    downloadByBtn:function(btn){
        var me=this;
        var btnId=btn.getId();
        //获取按钮对应的id值，用于获取对应的下载框的值
        var id = me.getMetRecForm().getForm().findField('id').getValue();
        var mGrid=me.getMettingRecGrid();
        var recode = mGrid.getSelectionModel().getSelection()[0];
        var myrecode = mGrid.getStore().findRecord('id', recode.get('id'));
        if(null!=id && id!=0 &&''!=id){
            this.download(myrecode,btnId);
        }

    }



});