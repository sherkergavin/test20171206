Ext.define('inas.controller.workflow.ShebeiTingyiController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.ShebeiTingyiView','workflow.ShebeiTingyiCreateView','workflow.ShebiTingyiEditView'],
    stores:['workflow.WorkFlowInfosStore','system.DictionaryStore'],
    models:['workflow.EquipmentStopModel'],
    refs:[
        {
            ref: 'shebeiView',
            selector: 'shebeiView'
        },{
            ref: 'taskInfoGrid',
            selector: 'shebeiView>grid[name="taskInfoGrid"]'
        },{
            ref:'shebeiTingyiCreateView',
            selector:'shebeiTingyiCreateView'
        },{
            ref:'sheBeiTingYiEditView',
            selector:'sheBeiTingYiEditView'
        }
    ],
    init:function(){
        this.control({
            'shebeiView':{
                render:this.doload
            },
            'shebeiView>grid[name="taskInfoGrid"]':{
                itemdblclick:this.getTaskInfo
            },
            'shebeiView>toolbar>button[action="add"]':{
                    click:this.addNewProcess
            },

            'shebeiView>toolbar>button[action="search"]':{
                    click:this.doSearch
            },
            'shebeiView>grid':{
                itemeditbuttonclick: this.editClick,
                itemdeletebuttonclick:this.deleteClick,
                itemviewbuttonclick:this.viewClick
            },
            'shebeiTingyiCreateView button[action="save"]':{
                    click:this.saveNewProcess
            },
            'sheBeiTingYiEditView button[action="save"]':{
                click:this.doSaveEdit
            },
            'sheBeiTingYiEditView button[action="reject"]':{
                click:this.doReject
            }

        })
    },

    doload:function(){
        var me=this;
        var wfView=me.getShebeiView();
        var grid = wfView.down('grid');
        var stateComb=wfView.down('combobox[name=search_state]');
        var wfFomType=wfView.wf_formType;
        var search_startTime=  wfView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datefield[name="search_endTime"]').getValue();
        grid.getStore().load({
            method:'POST',
            params: {
                search_start_time:search_startTime,
                search_end_time:search_endTime,
                procDefKey:wfFomType
            },
            callback: function(records, operation, success) {
             //Ext.Array.each(records,function(m){
             //
             //   alert(m.get('code'));
             //
             //});
            }
        });



    },



    getTaskInfo:function(t, record, item, index, e, eOpts){
        var taskId=record.get('id');
        var taskState=record.raw.state;
        var taskKey=record.raw.taskDefinitionKey;
        var procId=record.get('processInstanceId');
        var win=Ext.create('inas.view.workflow.ShebeiTingyiEditView');
        //var infoFm=win.down('form[name="sbtyForm"]');
        //infoFm.getForm().load({
        //                url: projectGP('/workflow/getExtHistoryVariables'),
        //                params:{
        //                    processInstanceId:procId
        //                },
        //                method:'GET',
        //                success:function(fm,action){
        //
        //                }
        //            });
        //win.setTaskKey(taskKey);
        //win.setTaskId(taskId);
        //win.setProcId(procId);
        //win.setTaskState(taskState);
        win.show();

    },

//弹出新增界面
    addNewProcess:function(){
        Ext.Ajax.request({
            url: projectGP('/equipment/getIsHasAccess'),
            method: 'post',
            success: function (response, options) {
                //将返回的JSON数据转成对象
                var tmpObj  = Ext.decode(response.responseText);
                //判断是否拥有某个具体权限，根据权限做不同的事
                if(tmpObj['data']['role']['sbty_add']=='true'){ //拥有新增权限的
                    var win=Ext.create('inas.view.workflow.ShebeiTingyiCreateView');
                    var form = win.down('form[name=sheBeiTingYiCreateFrom]');
                    form.getForm().url = projectGP("/equipment/createEquipmentStopForm");
                    win.show();
                }else if(tmpObj['data']['role']['sbty_dp_approve']=='true'){//有调度管理权限的
                   alert("您没有新增权限。。。");
                }
            }
        });
        //var win=Ext.create('inas.view.workflow.ShebeiTingyiCreateView');

    }
    ,
    saveNewProcess:function(){
        var grid = this.getShebeiView().down('grid[name=taskInfoGrid]');
        var win = this.getShebeiTingyiCreateView();
        win.down('form[name=sheBeiTingYiCreateFrom]').getForm().submit({
            method: 'POST',

            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (f, a) {
                Jm.MessageBox.error(a.result.handle);
            }
        });
        //alert("111111111111111111111111111111");
    }
    ,

    doSearch:function(){
        var me=this;
        var wfView=me.getShebeiView();
        var grid = wfView.down('grid');
        var wfFomType=wfView.wf_formType;
        //alert("1111111111111")
        var search_startTime=  wfView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datefield[name="search_endTime"]').getValue();
        var search_state=wfView.down('combobox[name="search_state"]').getValue();
        var search_unit=wfView.down('textfield[name="search_unit"]').getValue();
        var search_Context=wfView.down('textfield[name="search_Context"]').getValue();
        grid.getStore().load({
            method:'POST',
            params: {
                procDefKey:wfFomType,
                search_start_time:search_startTime,
                search_end_time:search_endTime,
                search_state:search_state,
                search_Context:search_Context
            }
        });

    },
    editClick:function(grid, row, col){
        var me = this;
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        Ext.Ajax.request({
            url: projectGP('/equipment/getIsHasAccess'),
            method: 'post',
            success: function (response, options) {
                //将返回的JSON数据转成对象
                var tmpObj  = Ext.decode(response.responseText);
                //判断是否拥有某个具体权限，根据权限做不同的事
                if(tmpObj['data']['role']['sbty_fg_approve']=='true'||tmpObj['data']['role']['sbty_officer_approve']=='true'||tmpObj['data']['role']['sbty_manager_approve']=='true'
                    ||tmpObj['data']['role']['sbty_cm_approve']=='true'){ //拥有审批权限的
                    if(selRec.get('status')=='待我审批'){
                        //alert("待我审批对话框");
                        me.doapprove(grid, row, col)
                    }else if(selRec.get('status')=='审批中'){
                        //alert("审批中对话框");
                        me.doapprove(grid, row, col);
                    }else if(tmpObj['data']['role']['sbty_dp_approve']=='true'){//有调度管理权限的
                        if(selRec.get('status')=='准备中'||selRec.get('status')=='进行中'){
                            //alert(111111111111111111111111);
                            //me.readyToDirector(grid, row, col);
                            me.readyToDirector(grid, row, col);
                        }else{
                            //alert(222222222222222222222222222222);
                            me.justShow(grid, row, col);
                        }
                    }
                }else{//没有任何关于编辑的权限的
                    //alert("11133333333333333333333333333333")
                    me.justShow(grid, row, col);
                }
            }
        });

    },

    doSaveEdit:function(){
        var grid = this.getShebeiView().down('grid[name=taskInfoGrid]');
        var win = this.getSheBeiTingYiEditView();

        win.down('form[name=sheBeiTingYiEditFrom]').getForm().submit({
            method: 'POST',
            url : projectGP("/equipment/updateEquipmentStopForm"),
            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (f, a) {
                Jm.MessageBox.error(a.result.handle);
            }
        });
    },


    deleteClick:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        // alert(selRec.get('id'));
        Jm.Msg.confirm('确定删除该行数据吗?', function (btn) {
            if (btn == 'ok') {
                Ext.Ajax.request({
                    url: projectGP('/equipment/deleteEquipmentStopForm'),
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
    //审批驳回
    doReject:function(grid, row, col){
        var grid = this.getShebeiView().down('grid[name=taskInfoGrid]');
        var win = this.getSheBeiTingYiEditView();

        win.down('form[name=sheBeiTingYiEditFrom]').getForm().submit({
            method: 'POST',
            url : projectGP("/equipment/rejectEquipmentStopForm"),
            success: function (forms, action) {
                grid.getStore().reload();
                win.close();
            }, failure: function (f, a) {
                Jm.MessageBox.error(a.result.handle);
            }
        });

},
//查看操作
    justShow:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.ShebiTingyiEditView');
          //alert(win.down('button[name="save"]'));
        win.setTitle('设备停役单-查看');
        win.down('button[name="save"]').setVisible(false);
        win.down('button[name="reject"]').setVisible(false);
        win.down('button[name="reset"]').setVisible(false);
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('hiddenfield[name="factory_manager"]').setValue(selRec.get('factory_manager'));
        win.down('hiddenfield[name="company_manager"]').setValue(selRec.get('company_manager'));
        win.down('hiddenfield[name="dispatche_manager"]').setValue(selRec.get('dispatche_manager'));
        win.down('hiddenfield[name="dispatche_center_director"]').setValue(selRec.get('dispatche_center_director'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));
        win.down('textfield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="lister"]').setValue(selRec.get('lister'));
        win.down('textareafield[name="equipment_stop_content"]').setValue(selRec.get('equipment_stop_content'));
        win.down('textareafield[name="influence_content"]').setValue(selRec.get('influence_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));
        win.down('datefield[name="filing_time"]').setValue(selRec.get('filing_date'));
        win.down('datefield[name="planing_start_time"]').setValue(selRec.get('planing_start_date'));
        win.down('datefield[name="planing_end_time"]').setValue(selRec.get('planing_end_date'));
        win.down('textareafield[name="new_check_result"]').setValue(selRec.get('new_check_result'));
        win.down('textareafield[name="influence_content"]').setValue(selRec.get('influence_content'));
        win.down('fileuploadfield[name="attachment_file_a"]').emptyText=selRec.get('attachment_file_1');
        win.down('fileuploadfield[name="attachment_file_b"]').emptyText=selRec.get('attachment_file_2');
        win.down('fileuploadfield[name="attachment_file_c"]').emptyText=selRec.get('attachment_file_3');
        win.down('fileuploadfield[name="attachment_file_d"]').emptyText=selRec.get('attachment_file_4');

        ////单选按钮值判断
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

        win.show();
    },
    //审批操作
    doapprove:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.ShebiTingyiEditView');
        //alert(win.down('button[name="save"]'));
        win.setTitle('设备停役单-审批');
        //得到具体一行的数据，并进行设值
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('hiddenfield[name="factory_manager"]').setValue(selRec.get('factory_manager'));
        win.down('hiddenfield[name="company_manager"]').setValue(selRec.get('company_manager'));
        win.down('hiddenfield[name="dispatche_manager"]').setValue(selRec.get('dispatche_manager'));
        win.down('hiddenfield[name="dispatche_center_director"]').setValue(selRec.get('dispatche_center_director'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));
        win.down('textfield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));
        win.down('datefield[name="filing_time"]').setValue(selRec.get('filing_date'));
        win.down('datefield[name="planing_start_time"]').setValue(selRec.get('planing_start_date'));
        win.down('datefield[name="planing_end_time"]').setValue(selRec.get('planing_end_date'));
        win.down('textfield[name="lister"]').setValue(selRec.get('lister'));
        win.down('textareafield[name="equipment_stop_content"]').setValue(selRec.get('equipment_stop_content'));
        win.down('textareafield[name="check_result"]').setValue(selRec.get('check_result'));
        win.down('textareafield[name="new_check_result"]').setValue(selRec.get('new_check_result'));
        win.down('textareafield[name="influence_content"]').setValue(selRec.get('influence_content'));
        win.down('fileuploadfield[name="attachment_file_a"]').emptyText=selRec.get('attachment_file_1');
        win.down('fileuploadfield[name="attachment_file_b"]').emptyText=selRec.get('attachment_file_2');
        win.down('fileuploadfield[name="attachment_file_c"]').emptyText=selRec.get('attachment_file_3');
        win.down('fileuploadfield[name="attachment_file_d"]').emptyText=selRec.get('attachment_file_4');

        ////单选按钮值判断
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

        win.show();
    },
    readyToDirector:function(grid, row, col){
        var grid = this.getTaskInfoGrid();
        var store = grid.getStore();
        var selRec = store.getAt(row);
        var win=Ext.create('inas.view.workflow.ShebiTingyiEditView');
        win.setTitle('设备停役单-调度');
        selRec = grid.getStore().findRecord('code', selRec.get('code'));
        //Ext.getCmp("actual_start_time").getEl.dom.hidden = false;
        //Ext.getCmp("actual_end_time").getEl.dom.hidden = false;

            win.down('datefield[name="actual_start_time"]').setVisible(true);
            win.down('datefield[name="actual_end_time"]').setVisible(true);

        win.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
        win.down('hiddenfield[name="factory_manager"]').setValue(selRec.get('factory_manager'));
        win.down('hiddenfield[name="company_manager"]').setValue(selRec.get('company_manager'));
        win.down('hiddenfield[name="dispatche_manager"]').setValue(selRec.get('dispatche_manager'));
        win.down('hiddenfield[name="dispatche_center_director"]').setValue(selRec.get('dispatche_center_director'));
        win.down('hiddenfield[name="dispatcher"]').setValue(selRec.get('dispatcher'));
        win.down('textfield[name="code"]').setValue(selRec.get('code'));
        win.down('textfield[name="job_content"]').setValue(selRec.get('job_content'));
        win.down('textfield[name="fill_unit"]').setValue(selRec.get('fill_unit'));
        win.down('datefield[name="filing_time"]').setValue(selRec.get('filing_date'));
        win.down('datefield[name="planing_start_time"]').setValue(selRec.get('planing_start_date'));
        win.down('datefield[name="planing_end_time"]').setValue(selRec.get('planing_end_date'));
        win.down('datefield[name="actual_start_time"]').setValue(selRec.get('actual_start_date'));
        win.down('datefield[name="actual_end_time"]').setValue(selRec.get('actual_end_date'));
        win.down('textareafield[name="equipment_stop_content"]').setValue(selRec.get('equipment_stop_content'));
        win.down('textareafield[name="check_result"]').setValue(selRec.get('check_result'));
        win.down('textareafield[name="new_check_result"]').setValue(selRec.get('new_check_result'));
        win.down('textareafield[name="influence_content"]').setValue(selRec.get('influence_content'));
        win.down('fileuploadfield[name="attachment_file_a"]').emptyText=selRec.get('attachment_file_1');
        win.down('fileuploadfield[name="attachment_file_b"]').emptyText=selRec.get('attachment_file_2');
        win.down('fileuploadfield[name="attachment_file_c"]').emptyText=selRec.get('attachment_file_3');
        win.down('fileuploadfield[name="attachment_file_d"]').emptyText=selRec.get('attachment_file_4');

        ////单选按钮值判断
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

        win.show();
    },
    //查看附件
    viewClick:function(grid, row, col){
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
    }


});