/**
 * Created by JM-SD09 on 2015/8/26.
 */
Ext.define('inas.controller.work.MakePlanWindowController', {
    extend: 'Ext.app.Controller',
    views: ['work.MakePlanWindow', 'work.MakePlanPanel'],
    refs: [
        {
            ref: 'makePlanWindow',
            selector: 'makePlanWindow'
        }, {
            ref: 'makePlanPanel',
            selector: 'makePlanPanel'
        }
    ],
    init: function () {
        this.control({
            'makePlanWindow form button[action=submit]': {
                click: this.onSubmit
            }, 'makePlanWindow form button[action=reset]': {
                click: this.onReset
            }, 'makePlanWindow form button[action=blank]': {
                click: this.onBlank
            } ,
            //'makePlanWindow button[name="imgBtn"]':{
            //    click:this.downloadImg
            //},
            //'makePlanWindow button[name="docBtn"]':{
            //    click:this.downloadDoc
            //}


            'makePlanWindow button[name="imgBtn1"]':{
                click:this.downloadByBtn
            },'makePlanWindow button[name="imgBtn2"]':{
                click:this.downloadByBtn
            },'makePlanWindow button[name="imgBtn3"]':{
                click:this.downloadByBtn
            },'makePlanWindow button[name="imgBtn4"]':{
                click:this.downloadByBtn
            },
            'makePlanWindow button[name="docBtn1"]':{
                click:this.downloadByBtn
            },
            'makePlanWindow button[name="docBtn2"]':{
                click:this.downloadByBtn
            },
            'makePlanWindow button[name="docBtn3"]':{
                click:this.downloadByBtn
            },
            'makePlanWindow button[name="docBtn4"]':{
                click:this.downloadByBtn
            }


        });
    }, onSubmit: function () {
        var grid = this.getMakePlanPanel().down('grid[name=makePlanGrid]');
        var win = this.getMakePlanWindow();
        win.down('form[name=makePlanForm]').getForm().submit({
            method: 'POST',
            success: function (forms, action) {
                grid.getStore().load();
                win.close();
            }, failure: function (forms, action) {
                Jm.MessageBox.error(action.result.handle);
            }
        });
    }, onReset: function () {
        var me=this;
        var mGrid = me.getMakePlanPanel().down('grid[name=makePlanGrid]');
        var form=me.getMakePlanWindow().down('form[name=makePlanForm]');
        var id=form.getForm().findField('id').getValue();
        form.getForm().reset();
        if(id!=null && id!=''){
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
            }
        }
    }, onBlank: function () {
        var win = this.getMakePlanWindow();
        win.close();
    },

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
        },

    downloadByBtn:function(btn){
        var me=this;
        var btnId=btn.getId();
        //获取按钮对应的id值，用于获取对应的下载框的值
        var id = me.getMakePlanWindow().down('form[name=makePlanForm]').getForm().findField('id').getValue();
        var mGrid = this.getMakePlanPanel().down('grid[name=makePlanGrid]');
        var recode = mGrid.getSelectionModel().getSelection()[0];
        var myrecode = mGrid.getStore().findRecord('id', recode.get('id'));
        if(null!=id && id!=0 &&''!=id){
            this.download(myrecode,btnId);
        }

    }
});