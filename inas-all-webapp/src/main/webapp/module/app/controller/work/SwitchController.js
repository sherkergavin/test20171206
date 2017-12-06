/**
 * Created by JM-SD09 on 2015/9/7.
 */
Ext.define('inas.controller.work.SwitchController', {
    extend: 'Ext.app.Controller',
    models: ['work.switchGridModel', 'work.switchWindowModel', 'data.ExtityComModel'],
    stores: ['work.switchTreeStore', 'work.switchGridStore', 'work.switchWindowStore', 'data.EntityComboBox'],
    refs: [
        {
            ref: 'switchPanel',
            selector: 'switchPanel'
        }, {
            ref: 'switchGrid',
            selector: 'switchPanel>grid'
        }, {
            ref: 'switchWindow',
            selector: 'switchWindow'
        }, {
            ref: 'treePanel',
            selector: 'switchPanel treepanel'
        }
    ],
    init: function () {
        this.control({
            'switchPanel treepanel[name=switchTree]': {
                render: this.treeLoad,
                select: this.onSelect
            },
            'switchPanel grid[name=switchGrid]': {
                afterrender: this.onLoad,
                itemclick: this.Itemdblclick
            },
            'switchPanel>toolbar>button[action=refresh]': {
                click: this.doClick
            }, 'switchPanel button[action=search]': {
                click: this.search
            }
        })
    },
    Itemdblclick: function (t, record, item, index, e, eOpts) {
        var panel = this.getSwitchPanel();
        var win = Ext.create('inas.view.work.SwitchWindow');
        var id = record.data.id;
        var entity_type_id = record.data.entity_type_id;
        var entity_id = record.data.entity_id;
        var data_item_id = record.data.data_item_id;
        var data_format_id = record.data.data_format_id;
        var recordT = record.data.seTime;
        var recordTime = null;
        if (recordT != null) {
            recordTime = recordT.substring(12, 22);
        } else {
            recordTime = panel.down('datefield[name=selectTime]').getValue();
            recordTime = Ext.Date.format(recordTime, 'Y-m-d');
            //console.log(recordTime);
        }
        var grid = win.down('grid[name=switchWinGrid]');
        grid.getStore().reload({
            params: {
                data_item_id: id,
                recordTime: recordTime
            }
        });

        var form = win.down('form[name=switchWinForm]');
        form.down('hiddenfield[name=recordTime]').setValue(recordTime);
        form.down('hiddenfield[name=entity_type_id]').setValue(entity_type_id);
        form.down('hiddenfield[name=entity_id]').setValue(entity_id);
        form.down('hiddenfield[name=data_item_id]').setValue(data_item_id);
        form.down('hiddenfield[name=data_format_id]').setValue(data_format_id);
        form.getForm().loadRecord(record);
        win.show();
    },
    treeLoad: function (t, e) {
        t.getStore().load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        })
    },
    onLoad: function () {
        //this.getSwitchGrid().getStore().load();
        //var view = this.getSwitchGrid().getView();
        //var q = Ext.getDoc('qwe').dom;
        //var q1 = q.children[0];
        //var tip = Ext.create('Ext.tip.Tip',{
        //    height:25,
        //    width:20,
        //    target:q1,
        //    //target:view.el,
        //    title:'123'
        //});
        //tip.show();
    },
    onSelect: function (t, record, index, eOpts) {
        var selectTime = this.getSwitchPanel().down("toolbar datefield[name=selectTime]").getValue();
        var grid = this.getSwitchGrid();
        //false根节点,TRUE为叶节点
        if (record.data.leaf == false) {
            var temp='';
            if(record.data.text=='水厂') {
                temp=2;
            }else if(record.data.text=='泵站'){
                temp=3;
            }
                //grid.getStore().getProxy().url = projectGP("/data/getMiddleJSON");
                //alert(record.raw.rid);
                grid.getStore().load({
                    params: {
                        selectTime: selectTime,
                        temp:temp,
                        pid:record.raw.rid
                    }
                });
        }else{
            var tid = record.raw.tid;
            //grid.getStore().getProxy().url = projectGP("/data/getMiddleJSON?entity_id=" + tid);
            grid.getStore().load({
                params: {
                    selectTime: selectTime,
                    entity_id:tid
                }
            });
        }
        var treepanel = this.getTreePanel();
        //alert(treepanel);
        var tmpGrid = Ext.getCmp('tmpGrid');
        var tmpCols = tmpGrid.columns;
        var tmpCol = tmpCols[0];

        treepanel.relayEvents(tmpCol,['select']);
        tmpCol.on('select',function(){
            alert('123');
            //alert(e.getPageX()+','+e.getPageY());
        });

        //var q = Ext.get('qwe').dom;
        //var tmpGrid = Ext.getCmp('tmpGrid');
        //var tmpCols = tmpGrid.columns;
        //var tmpCol = tmpCols[0];
        //alert(tmpCol.getPageX());

        //var q = Ext.getDoc('qwe').dom;
        //var q1 = q.children[0];
        //var scrollheight = q1.offsetTop;
        //var oRect = q1.getBoundingClientRect();
        //alert(oRect.x+','+oRect.y);
        //alert(scrollheight);
        //alert(q1);
        //str='';
        //for(var i in q1){
        //    str+=i+':===>'+q1[i]+'////';
        //
        //}
        //console.log(str);
        //document.write(str);
        //alert(q.getX()+','+ q.getY());
        //alert(q.getXY());
        //var clientHeight = q.clientHeight;
        //var clientWidth = q.clientWidth;
        //alert(clientHeight+','+clientWidth);
        //x: q.scrollLeft, y: q.scrollTop

        //var oRect=q.getBoundingClientRect();
        //alert(oRect.x+','+oRect.y);

    },
    doClick: function () {
        var panel = this.getSwitchPanel();
        var grid = panel.down('grid[name=switchGrid]');
        grid.getStore().getProxy().url = projectGP('/data/getMiddleJSON');
        //grid.getStore().getProxy().url = projectGP('/module/app/store/workflow/test.json');
        grid.getStore().load();
    },
    search: function () {
        var panel = this.getSwitchPanel();
        var entity_id = null;
        var temp='';
        var tree = panel.down('treepanel[name=switchTree]');
        var selected = tree.getSelectionModel().getSelection();
        if (selected[0].raw.leaf ) {
            var treeArray = new Array();
            for (var i = 0; i < selected.length; i++) {
                entity_id = selected[i].raw.tid;
            }
            //this.getSwitchGrid().getStore().getProxy().url = projectGP('/module/app/store/workflow/test.json');
            //this.getSwitchGrid().getStore().load({
            //    params: {
            //        entity_id: entity_id,
            //        selectTime: selectTime
            //    }
            //});
        }else{
            entity_id=null;
            if(selected[0].data.text=='水厂') {
                temp=2;
            }else if(selected[0].data.text=='泵站'){
                temp=3;
            }
        }
        var selectTime = panel.down('datefield[name=selectTime]').getValue();
        this.getSwitchGrid().getStore().getProxy().url = projectGP('/data/getMiddleJSON');
        //this.getSwitchGrid().getStore().getProxy().url = projectGP('/module/app/store/workflow/test.json');
        this.getSwitchGrid().getStore().load({
            params: {
                entity_id: entity_id,
                selectTime: selectTime,
                temp:temp,
                pid:selected[0].raw.rid

            }
        });
    }
})
;