Ext.define('inas.controller.data.DataFormatController', {
    extend: 'Ext.app.Controller',
    stores: ['pm.DataFormatTreeStore', 'pm.DataFormatStore'
        ,
        'pm.FormatGroupStore'
    ],
    views: ['data.DataFormat'],
    refs: [
        {
            ref: 'dataFormat',
            selector: 'dataFormat'
        }
    ],

    init: function () {
        this.control({
            'dataFormat':{
                show:this.cleanAllAct
            },
            'dataFormat>panel>grid':{
                itemdblclick:this.doedit
            },
            'dataFormat treepanel[name="dataFormatTreePanel"]': {
                render: this.treeLoad,
                itemclick: this.nodeClick
            },
            //button
            'dataFormat button[action="add"]': {
                click: this.addDataFormat
            },
            'dataFormat button[action="edit"]': {
                click: this.doedit
            },
            'dataFormat button[action="delete"]': {
                click: this.dodelete
            }

        });
    },

    //清空所有状态
    cleanAllAct:function(){
        var ftPanel = this.getDataFormat().down('panel[name="formatPanel"]');
        ftPanel.layout.setActiveItem(2);
    },
    doLoad: function () {
        //this.getDataFormat().down('grid[name="dataFormatGrid"]').getStore().load({
        //    params:
        //});
    },
    treeLoad: function (t, eOpts) {
        t.getStore().load({
            params: {
                'type': Jm.DB.Constant.DICTIONARY_TYPE_DATASTATUS
            },
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },
    nodeClick: function (t, record, item, index, e, eOpts) {
        var id = record.get('id');
        var treeTxt = record.get('text');
        var controller = record.get('controller');
        var ftPanel = this.getDataFormat().down('panel[name="formatPanel"]');
        if (controller == 'analog') {
            ftPanel.layout.setActiveItem(0);
            ftPanel.layout.getActiveItem().getStore().load({
                params: {
                    'code': controller
                }
            });
        }
        if (controller == 'switching') {
            ftPanel.layout.setActiveItem(1);
            ftPanel.layout.getActiveItem().getStore().load({
                params: {
                    'code': controller
                }
            });
        }
    },
    //添加
    addDataFormat: function () {
        var typeTree = this.getDataFormat().down('treepanel[name="dataFormatTreePanel"]');
        var rec = typeTree.getSelectionModel().getSelection()[0];
        if (null != rec) {
            var treeId = rec.get('id');

            var controller = rec.get('controller');
            if (rec != null || treeId != null) {
                var dataWin = Ext.create('inas.view.data.DataFormatWin');
                dataWin.setTreeId(treeId);
                var dataType = dataWin.down('combo[name="data_type"]');
                var dataSpec = dataWin.down('textfield[name="data_spec"]');
                var unit = dataWin.down('textfield[name="data_unit"]');
                dataType.setValue(treeId);
                var valueTf = dataWin.down('textfield[name="value"]');
                var dictTf = dataWin.down('combo[name="dictionaryId"]');
                var dataFormatText = dataWin.down('textfield[jm="formatname"]');
                var description = dataWin.down('textfield[name="description"]');
                //data_type,data_spec,data_unit,value,dictionId
                if (controller == 'analog') {
                    dataWin.setTitle("模拟量[新增]");
                    valueTf.reset();
                    valueTf.setDisabled(false);
                    valueTf.hide();
                    valueTf.allowBlank = true;
                    dictTf.clearValue();
                    dictTf.setDisabled(false);
                    dictTf.hide();
                    dictTf.allowBlank = true;
                    dataSpec.show();
                    unit.show();
                    dataFormatText.hide();
                    dataFormatText.setDisabled(true);
                }
                if (controller == 'switching') {
                    dataWin.setTitle("开关量[新增]");
                    //dataSpec.hide();
                    //dataSpec.setDisabled(false);
                    //dataSpec.clearValue();
                    //dataSpec.allowBlank = true;
                    dataSpec.reset();
                    dataSpec.setDisabled(false);
                    dataSpec.hide();
                    dataSpec.allowBlank = true;
                    unit.hide();
                    unit.reset();
                    unit.setDisabled(false);
                    unit.allowBlank = true;
                    description.hide();
                    valueTf.show();
                    dictTf.show();
                    dataFormatText.hide();
                    dataFormatText.setDisabled(true);
                }
                dataWin.setController(controller);
                dataWin.show();
            } else {
                Jm.MessageBox.info('请从右侧树形菜单中选中需要添加的类型')
            }
        }
    },
    //编辑
    doedit: function (btn) {
        var ftPanel = this.getDataFormat().down('panel[name="formatPanel"]');
        var grid = ftPanel.layout.getActiveItem();
        var typeTree = this.getDataFormat().down('treepanel[name="dataFormatTreePanel"]');
        var treeRec = typeTree.getSelectionModel().getSelection()[0];

        if(treeRec){
            var treeId = treeRec.get('id');
            var controller = treeRec.get('controller');

            var selRec = null;
            selRec = grid.getSelectionModel().getSelection()[0];
            if (selRec) {
                var dataWin = Ext.create('inas.view.data.DataFormatWin');
                dataWin.setTreeId(treeId);
                dataWin.setController(controller);
                var dataType = dataWin.down('combo[name="data_type"]');
                var dataSpec = dataWin.down('textfield[name="data_spec"]');
                var dataFormat = dataWin.down('combo[name="data_format_id"]');
                var dataFormatText = dataWin.down('textfield[jm="formatname"]');
                var dataFormatId = dataWin.down('hiddenfield[name="dataFormatId"]');
                var unit = dataWin.down('textfield[name="data_unit"]');
                var valueTf = dataWin.down('textfield[name="value"]');
                var dictTf = dataWin.down('combo[name="dictionaryId"]');
                var loTf = dataWin.down('textfield[name="lo"]');
                //编辑后发生位置BUG需通过更新后的STORE找回RECORD
                var myRec = grid.getStore().findRecord('id', selRec.get('id'));
                dataType.setValue(treeId);
                if (controller == 'switching') {
                    dataWin.setTitle("开关量[编辑]");
                    loTf.hide();
                    loTf.reset();
                    loTf.setDisabled(false);
                    loTf.allowBlank = true;
                    //dataSpec.hide();
                    //dataSpec.setDisabled(false);
                    //dataSpec.clearValue();
                    //dataSpec.allowBlank = true;
                    dataSpec.reset();
                    dataSpec.setDisabled(false);
                    dataSpec.hide();
                    dataSpec.allowBlank = true;
                    unit.hide();
                    unit.reset();
                    unit.setDisabled(false);
                    unit.allowBlank = true;
                    valueTf.show();
                    dictTf.show();
                    dataFormat.hide();
                    dataFormatText.show();
                    dataFormatId.setValue(myRec.raw.dataFormatId);
                    dataFormatText.setDisabled(false);
                    dataFormatText.setValue(myRec.raw.name);
                    dataFormat.allowBlank = true;
                }
                if (controller == 'analog') {
                    dataWin.setTitle("模拟量[编辑]");
                    valueTf.reset();
                    valueTf.setDisabled(false);
                    valueTf.hide();
                    valueTf.allowBlank = true;
                    dictTf.clearValue();
                    dictTf.setDisabled(false);
                    dictTf.hide();
                    dictTf.allowBlank = true;
                    dataFormatId.reset();
                    dataSpec.show();
                    unit.show();
                    dataFormat.setRawValue(myRec.raw.name);
                    dataFormatText.hide();
                    dataFormatText.setDisabled(true);
                }
                dataWin.down('form').getForm().loadRecord(myRec);
                dataWin.setController(controller);
                dataWin.show();
            } else {
                Jm.Msg.warning('请选中所需要编辑的数据！');
            }
        }
    },
    //删除
    dodelete: function (btn) {
        var ftPanel = this.getDataFormat().down('panel[name="formatPanel"]');
        var grid = ftPanel.layout.getActiveItem();
        var gridRec = grid.getSelectionModel().getSelection()[0];
        if(gridRec){
        var typeTree = this.getDataFormat().down('treepanel[name="dataFormatTreePanel"]');
        if(gridRec ){
            var treeRec = typeTree.getSelectionModel().getSelection()[0];
            var controller = treeRec.get('controller');
            Ext.Ajax.request({
                url:projectGP('/format/delDataFormatEntity'),
                params: {
                    id:gridRec.get('id'),
                    controller:controller
                },
                success: function(response){
                    var text = response.responseText;
                    grid.store.reload();
                }
            });

        }else{
            Ext.Msg.alert('提示','请选中一行数据！');
        }
    }
    }
})