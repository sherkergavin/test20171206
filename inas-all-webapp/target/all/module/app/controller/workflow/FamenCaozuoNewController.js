/**
 * Created by Administrator on 2016/4/14.
 */
Ext.define('inas.controller.workflow.FamenCaozuoNewController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.FamenCaozuoNewView','workflow.FamenCaozuoEditView','workflow.FamenCaozuoCreateView','workflow.FamenCaozuoSearchView','workflow.FamenCaozuoDEditView'],
    stores:['workflow.FamenCaozuoStore'],
    models:['workflow.FamenCaozuoModel'],

    refs:[
        {
            ref: 'famenNewView',
            selector: 'famenNewView'
        },{
            ref: 'taskInfoGrid',
            selector: 'famenNewView>grid[name="taskInfoGrid"]'
        },{
            ref:'famenCaozuoCreateView',
            selector: 'famenCaozuoCreateView'
        },{
            ref:'famenCaozuoEditView',
            selector:'famenCaozuoEditView'
        },{
            ref:'famenCaozuoSearchView',
            selector:'famenCaozuoSearchView'
        },{
            ref:'famenCaozuoDEditView',
            selector:'famenCaozuoDEditView'
        }
    ],
    init:function(){

        this.control({
            'famenNewView':{
                render:this.doload
            },
            'famenNewView>toolbar>panel>panel>button[action="add"]':{
                click:this.doAdd
            },
            'famenNewView>grid[name="taskInfoGrid"]':{
                itemdblclick:this.getTaskInfo
            },
            'famenNewView>toolbar>panel>panel>button[action="search"]':{
                click:this.doSearch
            },
            'famenNewView>grid':{
                itemselectbuttonclick:this.searchClick,
                itemeditbuttonclick:this.editClick,
                itemdeletebuttonclick:this.deleteClick
            },
            'famenCaozuoCreateView button[action=save]':{
                click: this.createFamenCaozuo
            },
            'famenCaozuoCreateView button[action=reset]':{
                click: this.resetFanmenCaozuoCreate
            },
            'famenCaozuoCreateView button[action=close]':{
                click: this.closeFanmenCaozuoCreate
            },
            'famenCaozuoEditView button[action=save]':{
                click: this.doSaveFanmenCaozuoEdit
            },
            'famenCaozuoEditView button[action=reset]':{
                click: this.resetFanmenCaozuoEdit
            },
            'famenCaozuoEditView button[action=close]':{
                click: this.closeFanmenCaozuoEdit
            },
            'famenCaozuoSearchView button[action=close]':{
                click: this.closeFanmenCaozuoSearch
            },
            'famenCaozuoDEditView button[action=save]':{
                click: this.doSaveFanmenCaozuoDEdit
            },
            'famenCaozuoDEditView button[action=reset]':{
                click: this.resetFanmenCaozuoDEdit
            },
            'famenCaozuoDEditView button[action=close]':{
                click: this.closeFanmenCaozuoDEdit
            },
            'famenCaozuoEditView button[name="imgBtn1"]':{
                click:this.downManagerloadByBtn
            },'famenCaozuoEditView button[name="imgBtn2"]':{
                click:this.downManagerloadByBtn
            },'famenCaozuoEditView button[name="imgBtn3"]':{
                click:this.downManagerloadByBtn
            },'famenCaozuoEditView button[name="imgBtn4"]':{
                click:this.downManagerloadByBtn
            },
            'famenCaozuoDEditView button[name="imgBtn1"]':{
                click:this.downloadByBtn
            },'famenCaozuoDEditView button[name="imgBtn2"]':{
                click:this.downloadByBtn
            },'famenCaozuoDEditView button[name="imgBtn3"]':{
                click:this.downloadByBtn
            },'famenCaozuoDEditView button[name="imgBtn4"]':{
                click:this.downloadByBtn
            },
            'famenCaozuoSearchView button[name="imgBtn1"]':{
                click:this.downSearchloadByBtn
            },'famenCaozuoSearchView button[name="imgBtn2"]':{
                click:this.downSearchloadByBtn
            },'famenCaozuoSearchView button[name="imgBtn3"]':{
                click:this.downSearchloadByBtn
            },'famenCaozuoSearchView button[name="imgBtn4"]':{
                click:this.downSearchloadByBtn
            }
        })
    },

    doload:function(){
        var me=this;
        var wfView=this.getFamenNewView();
        var grid = wfView.down('grid');
        var search_startTime=  wfView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datefield[name="search_endTime"]').getValue();
        var search_state=wfView.down('combobox[name="search_state"]').getValue();

        var search_Context=wfView.down('textfield[name="search_Context"]').getValue();
        var search_unit=wfView.down('textfield[name="search_unit"]').getValue();
        var search_place=wfView.down('textfield[name="search_place"]').getValue();

        var search_type=wfView.down('combobox[name="search_type"]').getValue();
        var search_actual_start_date=  wfView.down('datefield[name="search_actual_start_date"]').getValue();
        var search_actual_end_date=wfView.down('datefield[name="search_actual_end_date"]').getValue();

        var search_phone=wfView.down('combobox[name="search_phone"]').getValue();
        var search_dn=wfView.down('textfield[name="search_dn"]').getValue();
        var search_mc=wfView.down('combobox[name="search_mc"]').getValue();

        var search_code=wfView.down('textfield[name="search_code"]').getValue();


        grid.getStore().getProxy().extraParams['search_state']= search_state;
        grid.getStore().getProxy().extraParams['search_start_time']= search_startTime;
        grid.getStore().getProxy().extraParams['search_end_time']= search_endTime;

        grid.getStore().getProxy().extraParams['search_Context']= search_Context;
        grid.getStore().getProxy().extraParams['search_unit']= search_unit;
        grid.getStore().getProxy().extraParams['search_place']= search_place;

        grid.getStore().getProxy().extraParams['search_type']= search_type;
        grid.getStore().getProxy().extraParams['search_actual_start_date']= search_actual_start_date;
        grid.getStore().getProxy().extraParams['search_actual_end_date']= search_actual_end_date;

        grid.getStore().getProxy().extraParams['search_phone']= search_phone;
        grid.getStore().getProxy().extraParams['search_dn']= search_dn;
        grid.getStore().getProxy().extraParams['search_mc']= search_mc;

        grid.getStore().getProxy().extraParams['search_code']= search_code;

        grid.getStore().load({
            method:'POST',
            callback: function(records, operation, success) {
                var myRead = this.getProxy().getReader( );
                if(myRead.rawData.data.role['fm_add']=='false'){
                    //隐藏按钮
                    Ext.getCmp('fmAdd').setVisible(false);
                }
                if(myRead.rawData.data.role['fm_remove']=='false'){
                    if(myRead.rawData.data.list.length!=0){
                        Ext.getCmp('fmOperation').items[4].disable();
                    }
                }
            }
        });

    },

    /**
     * 弹出新增界面
     */
    doAdd:function(){
        var win=Ext.create('inas.view.workflow.FamenCaozuoCreateView');
        var form = win.down('form[name=famenCaozuoCreateFrom]');
        form.getForm().url = projectGP("/workflow/createFamenCaozuoForm");
        win.setTitle('阀门操作单-新建');
        win.show();
    },

    /**
     * 新增阀门操作单
     */
    createFamenCaozuo:function(){
        var grid = this.getFamenNewView().down('grid[name=taskInfoGrid]');
        var win = this.getFamenCaozuoCreateView();
        win.down('form[name=famenCaozuoCreateFrom]').getForm().submit({
            method: 'POST',
            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (f, a) {
                Jm.MessageBox.error(a.result.handle);
            }
        });
    },


    /**
     * 新建阀门操作单--重置
     */
    resetFanmenCaozuoCreate:function(){
        var win = this.getFamenCaozuoCreateView();
        var form = win.down('form[name=famenCaozuoCreateFrom]');
        form.getForm().reset();
    },

    //关闭新建阀门操作单
    closeFanmenCaozuoCreate:function(){
        var win = this.getFamenCaozuoCreateView();
        win.close();
    },

    /**
     * 关闭查看阀门操作单Widow
     */
    closeFanmenCaozuoSearch:function(){
        var win = this.getFamenCaozuoSearchView();
        win.close();
    },

    //查看附件
    searchClick:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var file1 = selRec.get('attachment_file_1');
        var file2 = selRec.get('attachment_file_2');
        var file3 = selRec.get('attachment_file_3');
        var file4 = selRec.get('attachment_file_4');
        //alert(file1);
        var config = {
            attachmentFile1: file1,
            attachmentFile2: file2,
            attachmentFile3: file3,
            attachmentFile4: file4
        };
        if(!((file1 == null||file1 == "")&&(file2 == null||file2 == "")&&(file3 == null||file3 == "")&&(file4 == null||file4 == ""))){
            var win = Ext.create('inas.view.workflow.FamenCaozuoYuLang',config);
            //
            //win.setAttachmentFile1(file1);
            //win.setAttachmentFile2(file2);
            //win.setAttachmentFile3(file3);
            //win.setAttachmentFile4(file4);
            win.show();
        }else{
            Ext.Msg.alert("提示", "没有上传文件文件");
        }
    },

    /**
     * 弹出阀门操作单的逻辑判断方法
     * @param grid
     * @param row
     * @param col
     */
    editClick:function(grid, row, col){
        var me = this;
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        Ext.Ajax.request({
            url: projectGP('/workflow/getIsHasAccess'),
            method: 'post',
            success: function (response, options) {
                //将返回的JSON数据转成对象
                var tmpObj  = Ext.decode(response.responseText);
                //判断是否拥有某个具体权限，根据权限做不同的事
                if(tmpObj['data']['role']['fm_officer_approve']=='true'||tmpObj['data']['role']['fm_manager_approve']=='true'){ //拥有审批权限的
                    if(selRec.get('status')=='待我审批'){
                        alert("待我审批对话框");
                    }else if(selRec.get('status')=='审批中'){
                        alert("审批中对话框");
                    }else if(selRec.get('status')=='准备中'||selRec.get('status')=='进行中'){
                        me.showManagerDialog(grid, row, col);
                    }else{
                        me.showSearchDialog(grid, row, col);
                    }
                }else if(tmpObj['data']['role']['fm_dispatcher']=='true'){//有调度管理权限的
                    if(selRec.get('status')=='准备中'||selRec.get('status')=='进行中'){
                        me.showDispatcherDialog(grid, row, col);
                    }else{
                        me.showSearchDialog(grid, row, col);
                    }
                }else{//没有任何关于编辑的权限的
                    me.showSearchDialog(grid, row, col);
                }
            }
        });
    },

    /**
     * 调度管理员权限的，状态为准备中和进行中的弹编辑框
     * @param grid
     * @param row
     * @param col
     */
    showManagerDialog:function(grid,row,col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.FamenCaozuoEditView');
        win.setTitle('阀门操作单-编辑');
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));
        win.down('textareafield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));
        win.down('textfield[name="place"]').setValue(selRec.get('place'));
        win.down('datetimefield[name="planing_start_time"]').setValue(selRec.get('planing_start_date'));
        win.down('datetimefield[name="planing_end_time"]').setValue(selRec.get('planing_end_date'));
        win.down('datetimefield[name="actual_start_time"]').setValue(selRec.get('actual_start_date'));
        win.down('datetimefield[name="actual_end_time"]').setValue(selRec.get('actual_end_date'));
        win.down('fileuploadfield[name="attachment_file_a"]').emptyText=selRec.get('attachment_file_1');
        win.down('fileuploadfield[name="attachment_file_b"]').emptyText=selRec.get('attachment_file_2');
        win.down('fileuploadfield[name="attachment_file_c"]').emptyText=selRec.get('attachment_file_3');
        win.down('fileuploadfield[name="attachment_file_d"]').emptyText=selRec.get('attachment_file_4');

        if(selRec.get('dn')!=0){
            win.down('textfield[name="dn"]').setValue(selRec.get('dn'));
        }
        //单选按钮值判断
        if(selRec.get('type')==1){
            win.down('radio[id="type1"]').setValue('1');
        }else if(selRec.get('type')==2){
            win.down('radio[id="type2"]').setValue('2');
        }
        if(selRec.get('is_monitoring_center')==1){
            win.down('radio[id="is_monitoring_center1"]').setValue("1");
        }else if(selRec.get('is_monitoring_center')==2){
            win.down('radio[id="is_monitoring_center2"]').setValue("2");
        }
        //多选框判断
        var phone = Ext.getCmp('phone').items;

        if(selRec.get('before_job')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='before_job'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('after_job')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='after_job'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('before_finish')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='before_finish'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('after_finish')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='after_finish'){
                    phone.get(i).setValue(true);
                }
            }
        }
        win.show();
    },

    /**
     * 调度员权限的，弹编辑框
     * @param grid
     * @param row
     * @param col
     */
    showDispatcherDialog:function(grid,row,col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.FamenCaozuoDEditView');
        win.setTitle('阀门操作单-编辑');
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));
        win.down('textareafield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));
        win.down('textfield[name="place"]').setValue(selRec.get('place'));
        win.down('datetimefield[name="planing_start_time"]').setValue(selRec.get('planing_start_date'));
        win.down('datetimefield[name="planing_end_time"]').setValue(selRec.get('planing_end_date'));
        win.down('datetimefield[name="actual_start_time"]').setValue(selRec.get('actual_start_date'));
        win.down('datetimefield[name="actual_end_time"]').setValue(selRec.get('actual_end_date'));
        win.down('textfield[name="attachment_file_a"]').setValue(selRec.get('attachment_file_1'));
        win.down('textfield[name="attachment_file_b"]').setValue(selRec.get('attachment_file_2'));
        win.down('textfield[name="attachment_file_c"]').setValue(selRec.get('attachment_file_3'));
        win.down('textfield[name="attachment_file_d"]').setValue(selRec.get('attachment_file_4'));

        if(selRec.get('dn')!=0){
            win.down('textfield[name="dn"]').setValue(selRec.get('dn'));
        }
        //单选按钮值判断
        if(selRec.get('type')==1){
            win.down('radio[id="type1"]').setValue('1');
        }else if(selRec.get('type')==2){
            win.down('radio[id="type2"]').setValue('2');
        }
        if(selRec.get('is_monitoring_center')==1){
            win.down('radio[id="is_monitoring_center1"]').setValue("1");
        }else if(selRec.get('is_monitoring_center')==2){
            win.down('radio[id="is_monitoring_center2"]').setValue("2");
        }
        //多选框判断
        var phone = Ext.getCmp('phone').items;

        if(selRec.get('before_job')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='before_job'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('after_job')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='after_job'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('before_finish')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='before_finish'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('after_finish')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='after_finish'){
                    phone.get(i).setValue(true);
                }
            }
        }
        win.show();
    },

    /**
     * 没有任何关于编辑的权限的弹查看框
     * @param grid
     * @param row
     * @param col
     */
    showSearchDialog:function(grid,row,col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.FamenCaozuoSearchView');
        win.setTitle('阀门操作单-查看');
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));
        win.down('textareafield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));
        win.down('textfield[name="place"]').setValue(selRec.get('place'));
        win.down('datetimefield[name="planing_start_time"]').setValue(selRec.get('planing_start_date'));
        win.down('datetimefield[name="planing_end_time"]').setValue(selRec.get('planing_end_date'));
        win.down('datetimefield[name="actual_start_time"]').setValue(selRec.get('actual_start_date'));
        win.down('datetimefield[name="actual_end_time"]').setValue(selRec.get('actual_end_date'));
        win.down('textfield[name="attachment_file_1"]').setValue(selRec.get('attachment_file_1'));
        win.down('textfield[name="attachment_file_2"]').setValue(selRec.get('attachment_file_2'));
        win.down('textfield[name="attachment_file_3"]').setValue(selRec.get('attachment_file_3'));
        win.down('textfield[name="attachment_file_4"]').setValue(selRec.get('attachment_file_4'));

        if(selRec.get('dn')!=0){
            win.down('textfield[name="dn"]').setValue(selRec.get('dn'));
        }

        //单选按钮值判断
        if(selRec.get('type')==1){
            win.down('radio[id="type1"]').setValue('1');
        }else if(selRec.get('type')==2){
            win.down('radio[id="type2"]').setValue('2');
        }
        if(selRec.get('is_monitoring_center')==1){
            win.down('radio[id="is_monitoring_center1"]').setValue("1");
        }else if(selRec.get('is_monitoring_center')==2){
            win.down('radio[id="is_monitoring_center2"]').setValue("2");
        }
        //多选框判断
        var phone = Ext.getCmp('phone').items;

        if(selRec.get('before_job')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='before_job'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('after_job')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='after_job'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('before_finish')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='before_finish'){
                    phone.get(i).setValue(true);
                }
            }
        }

        if(selRec.get('after_finish')==1){
            for(var i=0;i<phone.length;i++) {
                if(phone.get(i).name=='after_finish'){
                    phone.get(i).setValue(true);
                }
            }
        }
        win.show();
    },

    /**
     * 修改阀门操作单,调度管理员权限的
     */
    doSaveFanmenCaozuoEdit:function(){
        var grid = this.getFamenNewView().down('grid[name=taskInfoGrid]');
        var win = this.getFamenCaozuoEditView();
        win.down('form[name=famenCaozuoEditFrom]').getForm().submit({
            method: 'POST',
            url : projectGP("/workflow/updateFamenCaozuoForm"),
            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (f, a) {
                Jm.MessageBox.error(a.result.handle);
            }
        });
    },

    /**
     * 修改阀门操作单,调度员权限的
     */
    doSaveFanmenCaozuoDEdit:function(){
        var grid = this.getFamenNewView().down('grid[name=taskInfoGrid]');
        var win = this.getFamenCaozuoDEditView();
        win.down('form[name=famenCaozuoDEditFrom]').getForm().submit({
            method: 'POST',
            url : projectGP("/workflow/updateDFamenCaozuoForm"),
            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (f, a) {
                Jm.MessageBox.error(a.result.handle);
            }
        });
    },



    /**
     * 重置-编辑阀门操作单,调度管理员权限的
     */
    resetFanmenCaozuoEdit:function(){

        var win = this.getFamenCaozuoEditView();
        var grid = this.getTaskInfoGrid();
        var form = win.down('form[name=famenCaozuoEditFrom]');
        var id=form.getForm().findField('id').getValue();
        form.getForm().reset();
        if(id!=null && id!=''){
            var recode=grid.getSelectionModel().getSelection()[0];
            recode=grid.getStore().findRecord('id',recode.get('id'));
            if(recode){
                form.getForm().loadRecord(recode);

                form.down('datetimefield[name="planing_start_time"]').setValue(recode.get('planing_start_date'));
                form.down('datetimefield[name="planing_end_time"]').setValue(recode.get('planing_end_date'));
                form.down('datetimefield[name="actual_start_time"]').setValue(recode.get('actual_start_date'));
                form.down('datetimefield[name="actual_end_time"]').setValue(recode.get('actual_end_date'));

                form.down('fileuploadfield[name="attachment_file_a"]').emptyText=recode.get('attachment_file_1');
                form.down('fileuploadfield[name="attachment_file_b"]').emptyText=recode.get('attachment_file_2');
                form.down('fileuploadfield[name="attachment_file_c"]').emptyText=recode.get('attachment_file_3');
                form.down('fileuploadfield[name="attachment_file_d"]').emptyText=recode.get('attachment_file_4');
            }
        }
    },

    /**
     * 重置-编辑阀门操作单，调度员权限的
     */
    resetFanmenCaozuoDEdit:function(){

        var win = this.getFamenCaozuoDEditView();
        var grid = this.getTaskInfoGrid();
        var form = win.down('form[name=famenCaozuoDEditFrom]');
        var id=form.getForm().findField('id').getValue();
        form.getForm().reset();
        if(id!=null && id!=''){
            var recode=grid.getSelectionModel().getSelection()[0];
            recode=grid.getStore().findRecord('id',recode.get('id'));
            if(recode){
                form.getForm().loadRecord(recode);
                form.down('datetimefield[name="planing_start_time"]').setValue(recode.get('planing_start_date'));
                form.down('datetimefield[name="planing_end_time"]').setValue(recode.get('planing_end_date'));
                form.down('datetimefield[name="actual_start_time"]').setValue(recode.get('actual_start_date'));
                form.down('datetimefield[name="actual_end_time"]').setValue(recode.get('actual_end_date'));
            }
        }
    },

    /**
     * 关闭-编辑阀门操作单,调度管理员权限的
     */
    closeFanmenCaozuoEdit:function(){
        var win = this.getFamenCaozuoEditView();
        win.close();
    },

    /**
     * 关闭-编辑阀门操作单,调度员去权限的
     */
    closeFanmenCaozuoDEdit:function(){
        var win = this.getFamenCaozuoDEditView();
        win.close();
    },

    //删除一行
    deleteClick:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        // alert(selRec.get('id'));
        Jm.Msg.confirm('确定删除该行数据吗?', function (btn) {
            if (btn == 'ok') {
                Ext.Ajax.request({
                    url: projectGP('/workflow/getDelValveOperateForm'),
                    params: {
                        id:selRec.get('id')
                    },
                    success: function () {
                        grid.store.reload();
                    }
                });
            }else{
                Jm.Msg.confirm('确定删除该行数据吗?') ;
            }
        });
    },

    /**
     * 双击选中时
     * @param t
     * @param record
     * @param item
     * @param index
     * @param e
     * @param eOpts
     */
    getTaskInfo:function(t, record, item, index, e, eOpts){
        var me = this;
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = grid.getSelectionModel().getSelection()[0];
        if(selRec) {
            Ext.Ajax.request({
                url: projectGP('/workflow/getIsHasAccess'),
                method: 'post',
                success: function (response, options) {
                    //将返回的JSON数据转成对象
                    var tmpObj  = Ext.decode(response.responseText);
                    //判断是否拥有某个具体权限，根据权限做不同的事
                    if(tmpObj['data']['role']['fm_officer_approve']=='true'||tmpObj['data']['role']['fm_manager_approve']=='true'){ //拥有审批权限的
                        if(selRec.get('status')=='待我审批'){
                            alert("待我审批对话框");
                        }else if(selRec.get('status')=='审批中'){
                            alert("审批中对话框");
                        }else if(selRec.get('status')=='准备中'||selRec.get('status')=='进行中'){
                            me.showManagerDialog(grid, row, col);
                        }else{
                            me.showSearchDialog(grid, row, col);
                        }
                    }else if(tmpObj['data']['role']['fm_dispatcher']=='true'){//有调度管理权限的
                        if(selRec.get('status')=='准备中'||selRec.get('status')=='进行中'){
                            me.showDispatcherDialog(grid, row, col);
                        }else{
                            me.showSearchDialog(grid, row, col);
                        }
                    }else{//没有任何关于编辑的权限的
                        me.showSearchDialog(grid, row, col);
                    }
                }
            });
        }else{
            Jm.Msg.warning('请选中所需要编辑的数据！');
        }
    },

    /**
     * 查询
     */
    doSearch:function(){
        var wfView=this.getFamenNewView();
        var grid = wfView.down('grid');
        var search_startTime=  wfView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datefield[name="search_endTime"]').getValue();
        var search_state=wfView.down('combobox[name="search_state"]').getValue();

        var search_Context=wfView.down('textfield[name="search_Context"]').getValue();
        var search_unit=wfView.down('textfield[name="search_unit"]').getValue();
        var search_place=wfView.down('textfield[name="search_place"]').getValue();

        var search_type=wfView.down('combobox[name="search_type"]').getValue();
        var search_actual_start_date=  wfView.down('datefield[name="search_actual_start_date"]').getValue();
        var search_actual_end_date=wfView.down('datefield[name="search_actual_end_date"]').getValue();

        var search_phone=wfView.down('combobox[name="search_phone"]').getValue();
        var search_dn=wfView.down('textfield[name="search_dn"]').getValue();
        var search_mc=wfView.down('combobox[name="search_mc"]').getValue();

        var search_code=wfView.down('textfield[name="search_code"]').getValue();

        grid.getStore().getProxy().extraParams['search_state']= search_state;
        grid.getStore().getProxy().extraParams['search_start_time']= search_startTime;
        grid.getStore().getProxy().extraParams['search_end_time']= search_endTime;

        grid.getStore().getProxy().extraParams['search_Context']= search_Context;
        grid.getStore().getProxy().extraParams['search_unit']= search_unit;
        grid.getStore().getProxy().extraParams['search_place']= search_place;

        grid.getStore().getProxy().extraParams['search_type']= search_type;
        grid.getStore().getProxy().extraParams['search_actual_start_date']= search_actual_start_date;
        grid.getStore().getProxy().extraParams['search_actual_end_date']= search_actual_end_date;

        grid.getStore().getProxy().extraParams['search_phone']= search_phone;
        grid.getStore().getProxy().extraParams['search_dn']= search_dn;
        grid.getStore().getProxy().extraParams['search_mc']= search_mc;

        grid.getStore().getProxy().extraParams['search_code']= search_code;

        grid.getStore().load({
            method:'POST',
            callback: function(records, operation, success) {
                var myRead = this.getProxy().getReader( );
                if(myRead.rawData.data.role['fm_remove']=='false'){
                    if(myRead.rawData.data.list.length!=0){
                        Ext.getCmp('fmOperation').items[4].disable();
                    }
                }
            }
        });
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
            }else{
                Jm.MessageBox.error('没有可以下载的文件！');
            }
        }else{
            Jm.MessageBox.error('没有可以下载的文件！');
        }
    },

    /**
     * 文件上传下载时使用,调度管理员权限
     * @param btn
     */
    downManagerloadByBtn:function(btn){
        var btnId=btn.getId();
        //获取按钮对应的id值，用于获取对应的下载框的值
        var id = this.getFamenCaozuoEditView().down('form[name=famenCaozuoEditFrom]').getForm().findField('id').getValue();
        var mGrid =  this.getFamenNewView().down('grid[name=taskInfoGrid]');
        var recode = mGrid.getSelectionModel().getSelection()[0];
        var myRecode = mGrid.getStore().findRecord('id', recode.get('id'));
        if(null!=id && id!=0 &&''!=id){
            this.download(myRecode,btnId);
        }
    },

    /**
     * 文件上传下载时使用,调度员权限
     * @param btn
     */
    downloadByBtn:function(btn){
        var btnId=btn.getId();
        //获取按钮对应的id值，用于获取对应的下载框的值
        var id = this.getFamenCaozuoDEditView().down('form[name=famenCaozuoDEditFrom]').getForm().findField('id').getValue();
        var mGrid =  this.getFamenNewView().down('grid[name=taskInfoGrid]');
        var recode = mGrid.getSelectionModel().getSelection()[0];
        var myRecode = mGrid.getStore().findRecord('id', recode.get('id'));
        if(null!=id && id!=0 &&''!=id){
            this.download(myRecode,btnId);
        }
    },

    /**
     *  没有关于编辑权限的
      * @param btn
     */
    downSearchloadByBtn:function(btn) {
        var btnId=btn.getId();
        //获取按钮对应的id值，用于获取对应的下载框的值
        var id = this.getFamenCaozuoSearchView().down('form[name=famenCaozuoSearchFrom]').getForm().findField('id').getValue();
        var mGrid =  this.getFamenNewView().down('grid[name=taskInfoGrid]');
        var recode = mGrid.getSelectionModel().getSelection()[0];
        var myRecode = mGrid.getStore().findRecord('id', recode.get('id'));
        if(null!=id && id!=0 &&''!=id){
            this.download(myRecode,btnId);
        }
    }
});