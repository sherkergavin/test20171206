/**
 * Created by luyufei on 2016/4/15.
 */
Ext.define('inas.controller.workflow.ChongxiNewController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.ChongxiNewView','workflow.ChongxiWin','workflow.ChongxiSearchView','workflow.ChongxiDWin'],
    stores:['workflow.ChongxiStore'],
    models:['workflow.ChongxiModel'],
    refs:[
        {
            ref: 'chongxiNewView',
            selector: 'chongxiNewView'
        },
        {
            ref:'chongxiWin',
            selector: 'chongxiWin'
        },
        {
            ref: 'taskInfoGrid',
            selector: 'chongxiNewView>grid[name="taskInfoGrid"]'
        },
        {
            ref: 'chongxiSearchView',
            selector: 'chongxiSearchView'
        },
        {
            ref: 'chongxiDWin',
            selector: 'chongxiDWin'
        }
    ],
    init:function(){
        this.control({
            'chongxiNewView':{
                render:this.doload
            },
            'chongxiNewView>toolbar>panel>panel>button[action="add"]':{
                click:this.doAdd
            },
            'chongxiNewView>grid[name="taskInfoGrid"]':{
                itemdblclick:this.getTaskInfo
            },
            'chongxiNewView>toolbar>panel>panel>button[action="search"]':{
                click:this.doSearch
            },
            'chongxiNewView>grid':{
                itemselectbuttonclick:this.searchClick,
                itemeditbuttonclick: this.editClick,
                itemdeletebuttonclick:this.deleteClick
            },
            'chongxiWin button[action=save]':{
                click: this.createChongxiForm
            },
            'chongxiWin button[action=reset]':{
                click: this.resetChongxiForm
            },
            'chongxiWin button[action=close]':{
                click: this.closeChongxiForm
            },
            'chongxiSearchView button[action=close]':{
                click: this.closeChongxiSearch
            },
            'chongxiSearchView button[name="imgBtn1"]':{
                click:this.downSearchloadByBtn
            },'chongxiSearchView button[name="imgBtn2"]':{
                click:this.downSearchloadByBtn
            },'chongxiSearchView button[name="imgBtn3"]':{
                click:this.downSearchloadByBtn
            },'chongxiSearchView button[name="imgBtn4"]':{
                click:this.downSearchloadByBtn
            },
            'chongxiDWin button[action=save]':{
                click: this.saveDChongxiForm
            },
            'chongxiDWin button[action=reset]':{
                click: this.resetDChongxiForm
            },
            'chongxiDWin button[action=close]':{
                click: this.closeDChongxiForm
            },
            'chongxiDWin button[name="imgBtn1"]':{
                click:this.downDloadByBtn
            },'chongxiDWin button[name="imgBtn2"]':{
                click:this.downDloadByBtn
            },'chongxiDWin button[name="imgBtn3"]':{
                click:this.downDloadByBtn
            },'chongxiDWin button[name="imgBtn4"]':{
                click:this.downDloadByBtn
            },
            'chongxiWin button[name="imgBtn1"]':{
                click:this.downloadByBtn
            },'chongxiWin button[name="imgBtn2"]':{
                click:this.downloadByBtn
            },'chongxiWin button[name="imgBtn3"]':{
                click:this.downloadByBtn
            },'chongxiWin button[name="imgBtn4"]':{
                click:this.downloadByBtn
            }
        })
    },

    /**
     * 加载方法
     */
    doload:function(){
        var me=this;
        var wfView=this.getChongxiNewView();
        var grid = wfView.down('grid');
        var search_startTime=  wfView.down('datetimefield[name="search_startTime"]').getRawValue();
        var search_endTime=wfView.down('datetimefield[name="search_endTime"]').getRawValue();
        var search_state=wfView.down('combobox[name="search_state"]').getValue();

        var search_Context=wfView.down('textfield[name="search_Context"]').getValue();
        var search_unit=wfView.down('textfield[name="search_unit"]').getValue();
        var search_place=wfView.down('textfield[name="search_place"]').getValue();

        var search_actual_start_date=  wfView.down('datefield[name="search_actual_start_date"]').getValue();
        var search_actual_end_date=wfView.down('datefield[name="search_actual_end_date"]').getValue();
        var search_dn=wfView.down('textfield[name="search_dn"]').getValue();

        var search_mc=wfView.down('combobox[name="search_mc"]').getValue();
        var search_code=wfView.down('textfield[name="search_code"]').getValue();

        grid.getStore().getProxy().extraParams['search_state']= search_state;
        grid.getStore().getProxy().extraParams['search_start_time']= search_startTime;
        grid.getStore().getProxy().extraParams['search_end_time']= search_endTime;

        grid.getStore().getProxy().extraParams['search_Context']= search_Context;
        grid.getStore().getProxy().extraParams['search_unit']= search_unit;
        grid.getStore().getProxy().extraParams['search_place']= search_place;

        grid.getStore().getProxy().extraParams['search_actual_start_date']= search_actual_start_date;
        grid.getStore().getProxy().extraParams['search_actual_end_date']= search_actual_end_date;
        grid.getStore().getProxy().extraParams['search_dn']= search_dn;

        grid.getStore().getProxy().extraParams['search_mc']= search_mc;
        grid.getStore().getProxy().extraParams['search_code']= search_code;

        grid.getStore().load({
            method:'post',
            callback: function(records, operation, success) {
                var myRead = this.getProxy().getReader( );
                if(myRead.rawData.data.role['cx_add']=='false'){
                    //隐藏按钮
                    Ext.getCmp('chongxiAdd').setVisible(false);
                }
                if(myRead.rawData.data.role['cx_remove']=='false'){
                    if(myRead.rawData.data.list.length!=0){
                        Ext.getCmp('cxOperation').items[4].disable();
                    }
                }
            }
        });
    },

    /**
     * 弹出新增界面
     */
    doAdd:function(){
        var win=Ext.create('inas.view.workflow.ChongxiWin');
        var form=win.down('form[name=chongxiWin]');
        win.setTitle('新增-冲洗消毒申请单');
        win.down('datetimefield[name=actual_start_blunt_turb_time]').setVisible(false);
        win.down('datetimefield[name=actual_end_blunt_turb_time]').setVisible(false);
        win.down('datetimefield[name=actual_start_ch_injection_time]').setVisible(false);
        win.down('datetimefield[name=actual_end_ch_injection_time]').setVisible(false);
        win.down('datetimefield[name=actual_start_rush_ch_time]').setVisible(false);
        win.down('datetimefield[name=actual_end_rush_ch_time]').setVisible(false);
        win.down('button[name=imgBtn1]').setVisible(false);
        win.down('button[name=imgBtn2]').setVisible(false);
        win.down('button[name=imgBtn3]').setVisible(false);
        win.down('button[name=imgBtn4]').setVisible(false);
        form.getForm().url = projectGP("/workflow/createChongxiForm");
        win.show();
    },

    /**
     * 新增冲洗、消毒申请单
     * 编辑冲洗、消毒申请单
     * 共有提交方法
     */
    createChongxiForm:function(){
        var grid=this.getChongxiNewView().down('grid[name=taskInfoGrid]');
        var win = this.getChongxiWin();
        win.down('form[name=chongxiWin]').getForm().submit({
            method : 'POST',
            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (forms, action) {
                Jm.MessageBox.error(action.result.handle);
            }
        });
    },

    /**
     * 调度员权限，编辑保存方法
     */
    saveDChongxiForm:function(){
        var grid=this.getChongxiNewView().down('grid[name=taskInfoGrid]');
        var win = this.getChongxiDWin();
        win.down('form[name=chongxiDWin]').getForm().submit({
            method : 'POST',
            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (forms, action) {
                Jm.MessageBox.error(action.result.handle);
            }
        });
    },

    /**
     * 调度员权限，编辑框重置
     */
    resetDChongxiForm:function(){
        var win = this.getChongxiDWin();
        var form = win.down('form[name=chongxiDWin]');
        var mGrid=this.getTaskInfoGrid();
        var recode=mGrid.getSelectionModel().getSelection()[0];
        recode=mGrid.getStore().findRecord('id',recode.get('id'));
        if(recode){
            form.getForm().loadRecord(recode);

            form.down('datetimefield[name="plan_start_blunt_turb_time"]').setValue(recode.get('plan_start_blunt_turb_date'));

            form.down('datetimefield[name="plan_end_blunt_turb_time"]').setValue(recode.get('plan_end_blunt_turb_date'));
            form.down('datetimefield[name="plan_start_ch_injection_time"]').setValue(recode.get('plan_start_ch_injection_date'));
            form.down('datetimefield[name="plan_end_ch_injection_time"]').setValue(recode.get('plan_end_ch_injection_date'));

            form.down('datetimefield[name="plan_start_rush_ch_time"]').setValue(recode.get('plan_start_rush_ch_date'));
            form.down('datetimefield[name="plan_end_rush_ch_time"]').setValue(recode.get('plan_end_rush_ch_date'));
            form.down('datetimefield[name="actual_start_blunt_turb_time"]').setValue(recode.get('actual_start_blunt_turb_date'));

            form.down('datetimefield[name="actual_end_blunt_turb_time"]').setValue(recode.get('actual_end_blunt_turb_date'));
            form.down('datetimefield[name="actual_start_ch_injection_time"]').setValue(recode.get('actual_start_ch_injection_date'));
            form.down('datetimefield[name="actual_end_ch_injection_time"]').setValue(recode.get('actual_end_ch_injection_date'));

            form.down('datetimefield[name="actual_start_rush_ch_time"]').setValue(recode.get('actual_start_rush_ch_date'));
            form.down('datetimefield[name="actual_end_rush_ch_time"]').setValue(recode.get('actual_end_rush_ch_date'));
        }
    },

    /**
     * 关闭新增、编辑共有界面界面
     */
    closeChongxiForm:function(){
        var win = this.getChongxiWin();
        win.close();
    },

    /**
     *调度员权限，关闭编辑框
     */
    closeDChongxiForm:function(){
        var win = this.getChongxiDWin();
        win.close();
    },

    /**
     * 重置冲洗、消毒申请单新增数据
     */
    resetChongxiForm:function(){
        var win = this.getChongxiWin();
        var form = win.down('form[name=chongxiWin]');
        var id=form.getForm().findField('id').getValue();
        form.getForm().reset();
        if(id!=null && id!=''){
            var mGrid=this.getTaskInfoGrid();
            var recode=mGrid.getSelectionModel().getSelection()[0];
            recode=mGrid.getStore().findRecord('id',recode.get('id'));
            if(recode){
                form.getForm().loadRecord(recode);
                form.down('datetimefield[name="filing_time"]').setValue(recode.get('filing_date'));
                form.down('datetimefield[name="plan_start_blunt_turb_time"]').setValue(recode.get('plan_start_blunt_turb_date'));

                form.down('datetimefield[name="plan_end_blunt_turb_time"]').setValue(recode.get('plan_end_blunt_turb_date'));
                form.down('datetimefield[name="plan_start_ch_injection_time"]').setValue(recode.get('plan_start_ch_injection_date'));
                form.down('datetimefield[name="plan_end_ch_injection_time"]').setValue(recode.get('plan_end_ch_injection_date'));

                form.down('datetimefield[name="plan_start_rush_ch_time"]').setValue(recode.get('plan_start_rush_ch_date'));
                form.down('datetimefield[name="plan_end_rush_ch_time"]').setValue(recode.get('plan_end_rush_ch_date'));
                form.down('datetimefield[name="actual_start_blunt_turb_time"]').setValue(recode.get('actual_start_blunt_turb_date'));

                form.down('datetimefield[name="actual_end_blunt_turb_time"]').setValue(recode.get('actual_end_blunt_turb_date'));
                form.down('datetimefield[name="actual_start_ch_injection_time"]').setValue(recode.get('actual_start_ch_injection_date'));
                form.down('datetimefield[name="actual_end_ch_injection_time"]').setValue(recode.get('actual_end_ch_injection_date'));

                form.down('datetimefield[name="actual_start_rush_ch_time"]').setValue(recode.get('actual_start_rush_ch_date'));
                form.down('datetimefield[name="actual_end_rush_ch_time"]').setValue(recode.get('actual_end_rush_ch_date'));
                form.down('fileuploadfield[name="attachment_file_a"]').emptyText=recode.get('attachment_file_1');

                form.down('fileuploadfield[name="attachment_file_b"]').emptyText=recode.get('attachment_file_2');
                form.down('fileuploadfield[name="attachment_file_c"]').emptyText=recode.get('attachment_file_3');
                form.down('fileuploadfield[name="attachment_file_d"]').emptyText=recode.get('attachment_file_4');
            }
        }
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
     * 编辑冲洗、消毒申请单单
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
            url: projectGP('/workflow/getCxIsHasAccess'),
            method: 'post',
            success: function (response, options) {
                //将返回的JSON数据转成对象
                var tmpObj  = Ext.decode(response.responseText);
                //判断是否拥有某个具体权限，根据权限做不同的事
                if(tmpObj['data']['role']['cx_officer_approve']=='true'||tmpObj['data']['role']['cx_manager_approve']=='true'){ //拥有审批权限的
                    if(selRec.get('status')=='待我审批'){
                        alert("待我审批对话框");
                    }else if(selRec.get('status')=='审批中'){
                        alert("审批中对话框");
                    }else if(selRec.get('status')=='准备中'||selRec.get('status')=='进行中'){
                        me.showManagerDialog(grid, row, col);
                    }else{
                        me.showSearchDialog(grid, row, col);
                    }
                }else if(tmpObj['data']['role']['cx_dispatcher']=='true'){//有调度管理权限的
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
     * 删除数据
     * @param grid
     * @param row
     * @param col
     */
    deleteClick:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        Jm.Msg.confirm('确定删除该行数据吗?', function (btn) {
            if (btn == 'ok') {
                Ext.Ajax.request({
                    url: projectGP('/workflow/deleteChongxiForm'),
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
     * 双击选中行弹出
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
        if(selRec){
            Ext.Ajax.request({
                url: projectGP('/workflow/getCxIsHasAccess'),
                method: 'post',
                success: function (response, options) {
                    //将返回的JSON数据转成对象
                    var tmpObj  = Ext.decode(response.responseText);
                    //判断是否拥有某个具体权限，根据权限做不同的事
                    if(tmpObj['data']['role']['cx_officer_approve']=='true'||tmpObj['data']['role']['cx_manager_approve']=='true'){ //拥有审批权限的
                        if(selRec.get('status')=='待我审批'){
                            //todo
                            alert("待我审批对话框");
                        }else if(selRec.get('status')=='审批中'){
                            //todo
                            alert("审批中对话框");
                        }else if(selRec.get('status')=='准备中'||selRec.get('status')=='进行中'){
                            me.showManagerDialog(grid, row, col);
                        }else{
                            me.showSearchDialog(grid, row, col);
                        }
                    }else if(tmpObj['data']['role']['cx_dispatcher']=='true'){//有调度管理权限的
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
     * 关闭查看窗口
     */
    closeChongxiSearch:function(){
        var win = this.getChongxiSearchView();
        win.close();
    },


    /**
     * 没有任何关于编辑的权限的
     * @param grid
     * @param row
     * @param col
     */
    showSearchDialog:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.ChongxiSearchView');
        win.setTitle('冲洗、消毒申请单-查看');
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));

        win.down('textfield[name="caliber_of_pipeline"]').setValue(selRec.get('caliber_of_pipeline'));
        win.down('textareafield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));

        win.down('datetimefield[name="filing_time"]').setValue(selRec.get('filing_date'));
        win.down('textfield[name="place"]').setValue(selRec.get('place'));
        win.down('datetimefield[name="plan_start_blunt_turb_time"]').setValue(selRec.get('plan_start_blunt_turb_date'));

        win.down('datetimefield[name="plan_end_blunt_turb_time"]').setValue(selRec.get('plan_end_blunt_turb_date'));
        win.down('datetimefield[name="plan_start_ch_injection_time"]').setValue(selRec.get('plan_start_ch_injection_date'));
        win.down('datetimefield[name="plan_end_ch_injection_time"]').setValue(selRec.get('plan_end_ch_injection_date'));

        win.down('datetimefield[name="plan_start_rush_ch_time"]').setValue(selRec.get('plan_start_rush_ch_date'));
        win.down('datetimefield[name="plan_end_rush_ch_time"]').setValue(selRec.get('plan_end_rush_ch_date'));
        win.down('datetimefield[name="actual_start_blunt_turb_time"]').setValue(selRec.get('actual_start_blunt_turb_date'));

        win.down('datetimefield[name="actual_end_blunt_turb_time"]').setValue(selRec.get('actual_end_blunt_turb_date'));
        win.down('datetimefield[name="actual_start_ch_injection_time"]').setValue(selRec.get('actual_start_ch_injection_date'));
        win.down('datetimefield[name="actual_end_ch_injection_time"]').setValue(selRec.get('actual_end_ch_injection_date'));

        win.down('datetimefield[name="actual_start_rush_ch_time"]').setValue(selRec.get('actual_start_rush_ch_date'));
        win.down('datetimefield[name="actual_end_rush_ch_time"]').setValue(selRec.get('actual_end_rush_ch_date'));
        win.down('textfield[name="attachment_file_1"]').setValue(selRec.get('attachment_file_1'));

        win.down('textfield[name="attachment_file_2"]').setValue(selRec.get('attachment_file_2'));
        win.down('textfield[name="attachment_file_3"]').setValue(selRec.get('attachment_file_3'));
        win.down('textfield[name="attachment_file_4"]').setValue(selRec.get('attachment_file_4'));
        //单选按钮判断
        if(selRec.get('is_monitoring_center')==1){
            win.down('radio[id="is_monitoring_center1"]').setValue("1");
        }else if(selRec.get('is_monitoring_center')==2){
            win.down('radio[id="is_monitoring_center2"]').setValue("2");
        }
        win.show();
    },

    /**
     * 拥有审批权限的，状态为准备中和进行中的弹编辑框
     * @param grid
     * @param row
     * @param col
     */
    showManagerDialog:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.ChongxiWin');
        win.down('textfield[name="code"]').setReadOnly(true);
        var form=win.down('form[name=chongxiWin]');
        win.setTitle('冲洗、消毒申请单-编辑');
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));

        win.down('textfield[name="caliber_of_pipeline"]').setValue(selRec.get('caliber_of_pipeline'));
        win.down('textareafield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));

        win.down('datetimefield[name="filing_time"]').setValue(selRec.get('filing_date'));
        win.down('textfield[name="place"]').setValue(selRec.get('place'));
        win.down('datetimefield[name="plan_start_blunt_turb_time"]').setValue(selRec.get('plan_start_blunt_turb_date'));

        win.down('datetimefield[name="plan_end_blunt_turb_time"]').setValue(selRec.get('plan_end_blunt_turb_date'));
        win.down('datetimefield[name="plan_start_ch_injection_time"]').setValue(selRec.get('plan_start_ch_injection_date'));
        win.down('datetimefield[name="plan_end_ch_injection_time"]').setValue(selRec.get('plan_end_ch_injection_date'));

        win.down('datetimefield[name="plan_start_rush_ch_time"]').setValue(selRec.get('plan_start_rush_ch_date'));
        win.down('datetimefield[name="plan_end_rush_ch_time"]').setValue(selRec.get('plan_end_rush_ch_date'));
        win.down('datetimefield[name="actual_start_blunt_turb_time"]').setValue(selRec.get('actual_start_blunt_turb_date'));

        win.down('datetimefield[name="actual_end_blunt_turb_time"]').setValue(selRec.get('actual_end_blunt_turb_date'));
        win.down('datetimefield[name="actual_start_ch_injection_time"]').setValue(selRec.get('actual_start_ch_injection_date'));
        win.down('datetimefield[name="actual_end_ch_injection_time"]').setValue(selRec.get('actual_end_ch_injection_date'));

        win.down('datetimefield[name="actual_start_rush_ch_time"]').setValue(selRec.get('actual_start_rush_ch_date'));
        win.down('datetimefield[name="actual_end_rush_ch_time"]').setValue(selRec.get('actual_end_rush_ch_date'));
        win.down('fileuploadfield[name="attachment_file_a"]').emptyText=selRec.get('attachment_file_1');

        win.down('fileuploadfield[name="attachment_file_b"]').emptyText=selRec.get('attachment_file_2');
        win.down('fileuploadfield[name="attachment_file_c"]').emptyText=selRec.get('attachment_file_3');
        win.down('fileuploadfield[name="attachment_file_d"]').emptyText=selRec.get('attachment_file_4');
        //单选按钮判断
        if(selRec.get('is_monitoring_center')==1){
            win.down('radio[id="is_monitoring_center1"]').setValue("1");
        }else if(selRec.get('is_monitoring_center')==2){
            win.down('radio[id="is_monitoring_center2"]').setValue("2");
        }
        form.getForm().url = projectGP("/workflow/updateChongxiForm");
        win.show();
    },

    /**
     * 有调度员权限的弹修改框
     * @param grid
     * @param row
     * @param col
     */
    showDispatcherDialog:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.ChongxiDWin');
        win.setTitle('冲洗、消毒申请单-编辑');
        var form=win.down('form[name=chongxiDWin]');
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));

        win.down('textfield[name="caliber_of_pipeline"]').setValue(selRec.get('caliber_of_pipeline'));
        win.down('textareafield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));

        win.down('datetimefield[name="filing_time"]').setValue(selRec.get('filing_date'));
        win.down('textfield[name="place"]').setValue(selRec.get('place'));
        win.down('datetimefield[name="plan_start_blunt_turb_time"]').setValue(selRec.get('plan_start_blunt_turb_date'));

        win.down('datetimefield[name="plan_end_blunt_turb_time"]').setValue(selRec.get('plan_end_blunt_turb_date'));
        win.down('datetimefield[name="plan_start_ch_injection_time"]').setValue(selRec.get('plan_start_ch_injection_date'));
        win.down('datetimefield[name="plan_end_ch_injection_time"]').setValue(selRec.get('plan_end_ch_injection_date'));

        win.down('datetimefield[name="plan_start_rush_ch_time"]').setValue(selRec.get('plan_start_rush_ch_date'));
        win.down('datetimefield[name="plan_end_rush_ch_time"]').setValue(selRec.get('plan_end_rush_ch_date'));
        win.down('datetimefield[name="actual_start_blunt_turb_time"]').setValue(selRec.get('actual_start_blunt_turb_date'));

        win.down('datetimefield[name="actual_end_blunt_turb_time"]').setValue(selRec.get('actual_end_blunt_turb_date'));
        win.down('datetimefield[name="actual_start_ch_injection_time"]').setValue(selRec.get('actual_start_ch_injection_date'));
        win.down('datetimefield[name="actual_end_ch_injection_time"]').setValue(selRec.get('actual_end_ch_injection_date'));

        win.down('datetimefield[name="actual_start_rush_ch_time"]').setValue(selRec.get('actual_start_rush_ch_date'));
        win.down('datetimefield[name="actual_end_rush_ch_time"]').setValue(selRec.get('actual_end_rush_ch_date'));
        win.down('textfield[name="attachment_file_1"]').setValue(selRec.get('attachment_file_1'));

        win.down('textfield[name="attachment_file_2"]').setValue(selRec.get('attachment_file_2'));
        win.down('textfield[name="attachment_file_3"]').setValue(selRec.get('attachment_file_3'));
        win.down('textfield[name="attachment_file_4"]').setValue(selRec.get('attachment_file_4'));
        //单选按钮判断
        if(selRec.get('is_monitoring_center')==1){
            win.down('radio[id="is_monitoring_center1"]').setValue("1");
        }else if(selRec.get('is_monitoring_center')==2){
            win.down('radio[id="is_monitoring_center2"]').setValue("2");
        }
        form.getForm().url = projectGP("/workflow/updateDChongxiForm");
        win.show();
    },

    /**
     * 查询
     */
    doSearch:function(){
        var me=this;
        var wfView=this.getChongxiNewView();
        var grid = wfView.down('grid');
        var search_startTime=  wfView.down('datetimefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datetimefield[name="search_endTime"]').getValue();
        var search_state=wfView.down('combobox[name="search_state"]').getValue();

        var search_Context=wfView.down('textfield[name="search_Context"]').getValue();
        var search_unit=wfView.down('textfield[name="search_unit"]').getValue();
        var search_place=wfView.down('textfield[name="search_place"]').getValue();

        var search_actual_start_date=  wfView.down('datefield[name="search_actual_start_date"]').getValue();
        var search_actual_end_date=wfView.down('datefield[name="search_actual_end_date"]').getValue();
        var search_dn=wfView.down('textfield[name="search_dn"]').getValue();

        var search_mc=wfView.down('combobox[name="search_mc"]').getValue();
        var search_code=wfView.down('textfield[name="search_code"]').getValue();

        grid.getStore().getProxy().extraParams['search_state']= search_state;
        grid.getStore().getProxy().extraParams['search_start_time']= search_startTime;
        grid.getStore().getProxy().extraParams['search_end_time']= search_endTime;

        grid.getStore().getProxy().extraParams['search_Context']= search_Context;
        grid.getStore().getProxy().extraParams['search_unit']= search_unit;
        grid.getStore().getProxy().extraParams['search_place']= search_place;

        grid.getStore().getProxy().extraParams['search_actual_start_date']= search_actual_start_date;
        grid.getStore().getProxy().extraParams['search_actual_end_date']= search_actual_end_date;
        grid.getStore().getProxy().extraParams['search_dn']= search_dn;

        grid.getStore().getProxy().extraParams['search_mc']= search_mc;
        grid.getStore().getProxy().extraParams['search_code']= search_code;

        grid.getStore().load({
            method:'post',
            callback: function(records, operation, success) {
                var myRead = this.getProxy().getReader( );
                if(myRead.rawData.data.role['cx_remove']=='false'){
                    if(myRead.rawData.data.list.length!=0){
                        Ext.getCmp('cxOperation').items[4].disable();
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
     *审批权限的
     * @param btn
     */
    downloadByBtn:function(btn){
        var btnId=btn.getId();
        //获取按钮对应的id值，用于获取对应的下载框的值
        var id = this.getChongxiWin().down('form[name=chongxiWin]').getForm().findField('id').getValue();
        var mGrid =  this.getChongxiNewView().down('grid[name=taskInfoGrid]');
        var recode = mGrid.getSelectionModel().getSelection()[0];
        var myRecode = mGrid.getStore().findRecord('id', recode.get('id'));
        if(null!=id && id!=0 &&''!=id){
            this.download(myRecode,btnId);
        }
    },

    /**
     * 有调度员权限的
     * @param btn
     */
    downDloadByBtn:function(btn){
        var btnId=btn.getId();
        //获取按钮对应的id值，用于获取对应的下载框的值
        var id = this.getChongxiDWin().down('form[name=chongxiDWin]').getForm().findField('id').getValue();
        var mGrid =  this.getChongxiNewView().down('grid[name=taskInfoGrid]');
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
        var id = this.getChongxiSearchView().down('form[name=chongxiSearchView]').getForm().findField('id').getValue();
        var mGrid =  this.getChongxiNewView().down('grid[name=taskInfoGrid]');
        var recode = mGrid.getSelectionModel().getSelection()[0];
        var myRecode = mGrid.getStore().findRecord('id', recode.get('id'));
        if(null!=id && id!=0 &&''!=id){
            this.download(myRecode,btnId);
        }
    }

});