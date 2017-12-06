/**
 * Created by JM-SD09 on 2015/8/28.
 */
Ext.define('inas.controller.work.SumMarizePanelController', {
    extend: 'Ext.app.Controller',
    models: ['work.SumMarizeModel'],
    stores: ['work.SumMarizeStore'],
    views: ['work.SumMarizePanel'],
    refs: [
        {
            ref: 'sumMarizePanel',
            selector: 'sumMarizePanel'
        }, {
            ref: 'sumMarizeGrid',
            selector: 'sumMarizePanel>grid'
        }
    ],
    init: function () {
        this.control({
            'sumMarizePanel': {
                render: this.onLoad
            },
            'sumMarizePanel>grid': {
                itemdblclick: this.onItemdblclick
            },
            'sumMarizePanel button[action=add]': {
                click: this.addClick
            },
            'sumMarizePanel button[action=edit]': {
                click: this.editClick
            },
            'sumMarizePanel button[action=delete]': {
                click: this.deleteClick
            },
            'sumMarizePanel button[action=search]': {
                click: this.searchClick
            }
        })
    },
    onLoad: function () {
        var me = this;
        var panel = this.getSumMarizePanel();
        var grid = this.getSumMarizeGrid();
        var starTime = panel.down('toolbar datefield[name=starTime]').getValue();
        var endTime = panel.down('toolbar datefield[name=endTime]').getValue();
        var recStore = me.getStore('work.SumMarizeStore');
        recStore.on("beforeload", function () {
            Ext.apply(recStore.proxy.extraParams, {
                'starTime': Ext.Date.format(starTime, 'Y-m-d'),
                'endTime': Ext.Date.format(endTime, 'Y-m-d')
            });
        });
        grid.getStore().loadPage(1);
        //grid.getStore().load();
    },
    onItemdblclick: function (t, record) {
        var win = Ext.create('inas.view.work.SumMarizeWindow');
        win.setTitle("小结详细");
        var form = win.down('form[name=sumMarizeForm]');
        form.getForm().loadRecord(record);
        form.down('fileuploadfield[name="met_img1"]').emptyText=record.get('img1');
        form.down('fileuploadfield[name="met_doc1"]').emptyText=record.get('doc1');
        form.down('fileuploadfield[name="met_img2"]').emptyText=record.get('img2');
        form.down('fileuploadfield[name="met_doc2"]').emptyText=record.get('doc2');
        form.down('fileuploadfield[name="met_img3"]').emptyText=record.get('img3');
        form.down('fileuploadfield[name="met_doc3"]').emptyText=record.get('doc3');
        form.down('fileuploadfield[name="met_img4"]').emptyText=record.get('img4');
        form.down('fileuploadfield[name="met_doc4"]').emptyText=record.get('doc4');
        form.getForm().url = projectGP('/sumMarize/upDateSumMarize');
        win.show();
    },
    addClick: function () {
        var win = Ext.create('inas.view.work.SumMarizeWindow');
        win.setTitle("添加小结");
        var form = win.down('form[name=sumMarizeForm]');
        form.down('textfield[name=code]').setReadOnly(false);
        form.down('textfield[name=name]').setReadOnly(false);
        form.down('datefield[name=create_date]').setVisible(false);
        form.down('textfield[name=creator]').setVisible(false);
        form.down('textfield[name=editor]').setVisible(false);
        form.down('datefield[name=edit_date]').setVisible(false);
        form.getForm().url = projectGP('/sumMarize/insertSumMarize');
        win.show();
    },
    editClick: function () {
        var grid = this.getSumMarizeGrid();
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            return Jm.MessageBox.info("请选择一条数据进行操作");
        }
        var win = Ext.create('inas.view.work.SumMarizeWindow');
        win.setTitle("编辑小结");
        var form = win.down('form[name=sumMarizeForm]');
        var select = grid.getSelectionModel().selected;
        for (var i = 0; i < select.length; i++) {
            var record = select.get(i);
            form.getForm().loadRecord(record);
        }
        //form.down('fileuploadfield[name="imgFile"]').emptyText=record.get('imgs');
        //form.down('fileuploadfield[name="docFile"]').emptyText=record.get('docs');
        form.getForm().url=projectGP('/sumMarize/upDateSumMarize');
        win.show();
    },
    searchClick: function () {
        var me = this;
        var grid = this.getSumMarizeGrid();
        var panel = this.getSumMarizePanel();
        var starTime = panel.down('toolbar datefield[name=starTime]').getValue();
        var endTime = panel.down('toolbar datefield[name=endTime]').getValue();
        var code = panel.down('toolbar textfield[name=code]').getValue();
        var name = panel.down('toolbar textfield[name=name]').getValue();
        var attendance = panel.down('toolbar textfield[name=attendance]').getValue();
        var recStore = me.getStore('work.SumMarizeStore');
        recStore.on("beforeload", function () {
            Ext.apply(recStore.proxy.extraParams, {
                'starTime': Ext.Date.format(starTime, 'Y-m-d'),
                'endTime': Ext.Date.format(endTime, 'Y-m-d'),

                'code':code,
                'name':name,
                'attendance':attendance
            });
        });
        grid.getStore().loadPage(1);
        grid.getStore().load();
    },
    deleteClick: function () {
        var grid = this.getSumMarizeGrid();
        var sm = grid.getSelectionModel();
        if(sm.getSelection().length==0){
            return Jm.MessageBox.info('请选择一条数据进行操作');
        }
        var id=null;
        var select = grid.getSelectionModel().selected;
        for(var i=0;i<select.length;i++){
            var record = select.get(i);
            id =  record.data.id;
        }
        Ext.Ajax.request({
            method:"POST",
            url:projectGP('/sumMarize/delSumMarize'),
            success: function () {
                grid.getStore().load();
            },failure: function (forms, action) {
                Jm.MessageBox.error(action.result.handle);
            },params:{id:id}
        })
    }
});