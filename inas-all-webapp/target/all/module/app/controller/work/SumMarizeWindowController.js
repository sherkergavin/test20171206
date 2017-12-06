/**
 * Created by JM-SD09 on 2015/8/28.
 */
Ext.define('inas.controller.work.SumMarizeWindowController', {
    extend: 'Ext.app.Controller',
    //models:[],
    stores: ['work.SumMarizeStore'],
    views: ['work.SumMarizeWindow'],
    refs: [{
        ref: 'sumMarizeWindow',
        selector: 'sumMarizeWindow'
    }, {
        ref: 'sumMarizeForm',
        selector: 'sumMarizeWindow>form'
    }, {
        ref: 'sumMarizeGrid',
        selector: 'sumMarizePanel>grid'
    }],
    init: function () {
        this.control({
            'sumMarizeWindow form button[action=submit]': {
                click: this.onSubmit
            }, 'sumMarizeWindow form button[action=reset]': {
                click: this.onReset
            }, 'sumMarizeWindow form button[action=cancel]': {
                click: this.onCancel
            },
            'sumMarizeWindow button[name="imgBtn1"]':{
                click:this.downloadByBtn
            },'sumMarizeWindow button[name="imgBtn2"]':{
                click:this.downloadByBtn
            },'sumMarizeWindow button[name="imgBtn3"]':{
                click:this.downloadByBtn
            },'sumMarizeWindow button[name="imgBtn4"]':{
                click:this.downloadByBtn
            },
            'sumMarizeWindow button[name="docBtn1"]':{
                click:this.downloadByBtn
            },
            'sumMarizeWindow button[name="docBtn2"]':{
                click:this.downloadByBtn
            },
            'sumMarizeWindow button[name="docBtn3"]':{
                click:this.downloadByBtn
            },
            'sumMarizeWindow button[name="docBtn4"]':{
                click:this.downloadByBtn
            }
        })
    },
    onSubmit: function () {

        var grid = this.getSumMarizeGrid();
        var win = this.getSumMarizeWindow();
        var form = win.down('form[name="sumMarizeForm"]');
        var dateTime = form.down('datefield[name=dateTime]').getValue();
        if ( form.getForm().isValid()) {
            form.getForm().submit({
                method: 'POST',
                success: function (fm, action) {
                    grid.getStore().load();
                    form.getForm().reset();
                    win.close();
                }, failure: function (fm, action) {
                    Jm.Msg.error(action.result.handle);
                }
            });
        }else{
            Jm.Msg.msg('表单信息不合法！');
        }
    },
    onReset: function () {
        /**
         * 重置表单信息
         * @type {inas.controller.work.SumMarizeWindowController}
         */
        var me=this;
        var form=me.getSumMarizeForm();
        var id=form.getForm().findField('id').getValue();
        form.getForm().reset();
        if(id!=null && id!=''){
            var mGrid=me.getSumMarizeGrid();
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
    },

onCancel: function () {
        var win = this.getSumMarizeWindow();
        var form = this.getSumMarizeForm();
        form.getForm().reset();
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
        var id = me.getSumMarizeForm().getForm().findField('id').getValue();
        var mGrid=me.getSumMarizeGrid();
        var recode = mGrid.getSelectionModel().getSelection()[0];
        //var myrecode = mGrid.getStore().findRecord('id', recode.get('id'));
        //alert(recode.get('id'),btnId);
        if(null!=id && id!=0 &&''!=id){
            this.download(recode,btnId);
        }

    }

});