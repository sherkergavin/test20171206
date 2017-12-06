/**
 * Created by ZS on 2015/7/29.
 */
Ext.define('inas.controller.work.WorkInstructionController', {
    extend: 'Ext.app.Controller',
    views: ['work.WorkInsWindown'],
    stores: ['work.WorkInstructStore'],
    refs: [{
        ref: 'instructionPanel',
        selector: 'instructionPanel'
    }, {
        ref: 'instructWin',
        selector: 'instructWin'
    }, {
        ref: 'instructionGrid',
        selector: 'instructionPanel>grid'
    }],
    init: function () {
        this.control({
            'instructionPanel': {
                render: this.doLoad
            },
            'instructionPanel>grid':{
                itemdblclick:this.editIns
            },
            'instructionPanel button[action="search"]': {
                click: this.searchInstructions
            },
            'instructionPanel button[action="add"]': {
                click: this.addIns
            },
            'instructionPanel button[action="edit"]': {
                click: this.editIns
            },
            'instructionPanel button[action="delete"]': {
                click: this.delIns
            }
        });
    },

    doLoad: function () {
        var me = this;
        var grid = me.getInstructionGrid();
        var searchM = me.getInstructionPanel().down('datefield[name="searchMonth"]').getValue();
        grid.store.load({
            params : {
                'searchMonth':Ext.Date.format(searchM, 'Y-m-d')
            }
        });
    },
    searchInstructions: function (btn) {
        this.doLoad();
    },
    addIns: function () {
        var addWin = Ext.create('inas.view.work.WorkInsWindown');
        addWin.setTitle('新增工作指示');
        addWin.show();
    },
    editIns: function () {
        var me = this;
        var grid = me.getInstructionGrid();
        var selRec = grid.getSelectionModel().getSelection()[0];
        if (selRec) {
            var edtWin = Ext.create('inas.view.work.WorkInsWindown');
            edtWin.setTitle('修改工作指示');
            selRec = grid.getStore().findRecord('id', selRec.get('id'));
            edtWin.down('hiddenfield[name="id"]').setValue(selRec.get('id'));
            edtWin.down('datefield[name="mon"]').setValue(selRec.get('daily_date'));
            edtWin.down('textareafield[name="content"]').setValue(selRec.get('content'));
            edtWin.show();
        } else {
            Jm.Msg.warning('请选中所需要编辑的数据！');
        }
    },
    delIns: function () {
        var me = this;
        var grid = me.getInstructionGrid();
        var selRec = grid.getSelectionModel().getSelection()[0];
        if (selRec) {
            Jm.Msg.confirm('确定删除该行数据吗？', function (btn) {
                if (btn == 'ok') {

                    Ext.Ajax.request({
                        url: projectGP('/workInstruct/delInstruct'),
                        params: {
                            id: selRec.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            grid.store.reload();
                        }
                    });
                }
            });
        } else {
            Jm.Msg.warning('请选中需要删除的数据！');
        }
    }
});