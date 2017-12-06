/**
 * Created by JM-SD09 on 2015/8/26.
 */
Ext.define('inas.controller.work.MakePlanPanelController', {
    extend: 'Ext.app.Controller',
    models: ['work.MakePlanModel'],
    stores: ['work.MakePlanStore'],
    views: ['work.MakePlanPanel'],
    refs: [{
        ref: 'makePlanPanel',
        selector: 'makePlanPanel'
    }],
    init: function () {
        this.control({
            'makePlanPanel': {
                render: this.reload
            },
            'makePlanPanel grid[name=makePlanGrid]': {
                itemdblclick: this.staClick
            },
            'makePlanPanel button[action=add]': {
                click: this.addClick
            },
            'makePlanPanel button[action=edit]': {
                click: this.editClick
            },
            'makePlanPanel button[action=delete]': {
                click: this.deleteClick
            },
            'makePlanPanel button[action=search]': {
                click: this.searchClick
            }
        });
    }, reload: function () {
        var me = this;
        var panel = this.getMakePlanPanel();
        var grid = this.getMakePlanPanel().down('grid[name=makePlanGrid]');
        var staTime = panel.down('toolbar datefield[name=staTime]').getValue();
        var endTime = panel.down('toolbar datefield[name=endTime]').getValue();
        var recStore = me.getStore('work.MakePlanStore');
        recStore.on("beforeload",function(){
            Ext.apply(recStore.proxy.extraParams, {
                'staTime':Ext.Date.format(staTime, 'Y-m-d'),
                'endTime':Ext.Date.format(endTime, 'Y-m-d'),
                currentPage: 1
            });
        });
        grid.getStore().loadPage(1);
        //grid.getStore().load();


    }, staClick: function (t, record, item, index, e, eOpts) {
        var win = Ext.create('inas.view.work.MakePlanWindow');
        win.setTitle('调度详细信息');
        var form = win.down('form[name=makePlanForm]');
        form.getForm().loadRecord(record);

        form.down('fileuploadfield[name="met_img1"]').emptyText=record.get('img1');
        form.down('fileuploadfield[name="met_doc1"]').emptyText=record.get('doc1');
        form.down('fileuploadfield[name="met_img2"]').emptyText=record.get('img2');
        form.down('fileuploadfield[name="met_doc2"]').emptyText=record.get('doc2');
        form.down('fileuploadfield[name="met_img3"]').emptyText=record.get('img3');
        form.down('fileuploadfield[name="met_doc3"]').emptyText=record.get('doc3');
        form.down('fileuploadfield[name="met_img4"]').emptyText=record.get('img4');
        form.down('fileuploadfield[name="met_doc4"]').emptyText=record.get('doc4');

        form.getForm().url = projectGP("/makePlan/upDateMakePlan");
        win.show();
    },
    addClick: function () {
        var win = Ext.create('inas.view.work.MakePlanWindow');
        win.setTitle('添加调度计划');
        var form = win.down('form[name=makePlanForm]');
        form.down('textfield[name=code]').setReadOnly(false);
        form.down('textfield[name=name]').setReadOnly(false);
        form.down('datefield[name=create_date]').setVisible(false);
        form.down('textfield[name=creator]').setVisible(false);
        form.down('textfield[name=editor]').setVisible(false);
        form.down('datefield[name=edit_date]').setVisible(false);
        form.getForm().url = projectGP("/makePlan/insertMakePlan");
        win.show();
    },
    editClick: function () {
        var grid = this.getMakePlanPanel().down('grid[name=makePlanGrid]');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            return Jm.Msg.error("请选择一条数据进行操作");
        }
        var win = Ext.create('inas.view.work.MakePlanWindow');
        win.setTitle('修改调度信息');
        var select = grid.getSelectionModel().selected;
        for (var i = 0; i < select.length; i++) {
            var record = select.get(i);
            win.down('form[name=makePlanForm]').getForm().loadRecord(record);
        }
        var form = win.down('form[name=makePlanForm]');
        win.down('form[name=makePlanForm]').getForm().url = projectGP("/makePlan/upDateMakePlan");
        win.show();
    },
    deleteClick: function () {
        var id = null;
        var grid = this.getMakePlanPanel().down('grid[name=makePlanGrid]');
        var sm = grid.getSelectionModel();
        var select = grid.getSelectionModel().selected;
        for (var i = 0; i < select.length; i++) {
            var record = select.get(i);
            id = record.data.id;
        }
        if (sm.getSelection().length == 0) {
            return Jm.Msg.error("请选择一条数据进行操作");
        }
            Jm.Msg.confirm('确定删除该行数据吗？', function (btn) {
                if (btn == 'ok') {
                    Ext.Ajax.request({
                        method: 'POST',
                        url: projectGP('/makePlan/delMakePlan'),
                        params: {
                            id: id
                        },
                        success: function (forms, action) {
                            grid.getStore().load();
                        },
                        failure: function (forms, action) {
                            Jm.MessageBox.error(action.result.handle);
                        }
                    });
                }
            });
    },
    searchClick: function () {
        var me =this;
        var grid = this.getMakePlanPanel().down('grid[name=makePlanGrid]');
        var panel = this.getMakePlanPanel();
        var staTime = panel.down('toolbar datefield[name=staTime]').getValue();
        var endTime = panel.down('toolbar datefield[name=endTime]').getValue();
        var docCode = panel.down('toolbar textfield[name=code]').getValue();
        var docName =  panel.down('toolbar textfield[name=name]').getValue();
        var recStore = me.getStore('work.MakePlanStore');
        recStore.on("beforeload",function(){
            Ext.apply(recStore.proxy.extraParams, {
                'staTime':Ext.Date.format(staTime, 'Y-m-d'),
                'endTime':Ext.Date.format(endTime, 'Y-m-d'),
                'docCode':docCode,
                'docName':docName
            });
        });
        grid.getStore().loadPage(1);
        grid.getStore().load();
    }
});