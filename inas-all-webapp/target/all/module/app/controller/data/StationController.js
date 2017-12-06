/**
 * Created by chai on 14-4-8.
 */
Ext.define('inas.controller.data.StationController', {
    extend: 'Ext.app.Controller',
    views: ['inas.view.data.StationView'],
    stores: ['data.StationTypeTreeStore', 'system.DictionaryStore', 'data.StationTypeStore', 'data.StationStatusStore'],
    refs: [{
        ref: 'StationView',
        selector: 'StationView'
    }],

    init: function () {
        this.control({
            'StationView treepanel[name="stationTypeTree"]': {
                render: this.initStationTypeTree,
                itemclick: this.nodeClick

            },
            'StationView combo[name="entity_type_id"]': {
                render: this.initEntityTypeCombo
            },
            'StationView combo[name="working_status"]': {
                render: this.initWorkingStatusCombo
            },

            'StationView button[action="add"]': {
                click: this.addConfig
            },
            'StationView button[action="save"]': {
                click: this.saveConfig
            },
            'StationView button[action="reset"]': {
                click: this.resetConfig
            },
            'StationView button[action="delete"]': {
                click: this.deleteConfig
            },
            'StationView form[name="StationConfigForm"]>fieldset[name="fieldSetField"]>button[name="addFileField"]': {
                click: this.addFileField
            }
        })
    },
    initStationTypeTree: function (t, e) {
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });

        this.getStationView().down('treepicker[name="area_id"]').store.load();
        this.getStationView().down('treepicker[name="organization_id"]').store.load();
    },
    nodeClick: function (t, record, item, index, e, eOpts) {

        if (record.raw.leaf != null) {
            //alert(record.raw.tid);
            var panel = this.getStationView();
            panel.curNode = record.raw.tid;
            var form = panel.down('form');
            form.getForm().load({
                url: projectGP('/data/getStationList'),
                params: {
                    id: record.raw.tid
                },
                success: function (f, action) {


                },
                failure: function (f, action) {
                    Jm.Msg.error('加载错误！请联系管理员！');
                }
            });
        }
    },
    initEntityTypeCombo: function (combo) {
        combo.store.load();

    },
    initWorkingStatusCombo: function (combo) {
        combo.store.load({
            params: {
                type: Jm.DB.Constant.DICTIONARY_TYPE_STATIONSTATUS
            },
            callback: function (records, operation, success) {
            }
        });
    },

    addConfig: function (btn) {
        var form = btn.up('form').getForm();
        form.reset();
    },
    saveConfig: function (btn) {
        var panel = this.getStationView();
        var form = btn.up('form').getForm();
        var tree = this.getStationView().down('treepanel');
        if (form.findField('area_id').getValue() == 'root' || form.findField('organization_id').getValue() == 'root') {
            Jm.Msg.warning('不可选择根节点');
        } else {
            if (form.isValid()) {
                form.submit({
                    url: projectGP('/data/saveEntity'),
                    method: "POST",
                    params: {
                        //newStatus: 'delivered'
                    },
                    success: function (f, action) {

                        form.load({
                            url: projectGP('/data/getStationList'),
                            params: {
                                id: panel.curNode
                            },
                            success: function (f, action) {
                                tree.store.reload();
                                form.reset();
                            },
                            failure: function (f, action) {
                                Jm.Msg.error('加载错误！请联系管理员！');
                            }
                        });
                    },
                    failure: function (form, action) {
                        Jm.Msg.warning(action.result.handle);
                    }

                });
            }
        }
    },

    deleteConfig: function (btn) {
        var id = btn.up('form').getForm().findField('id').getValue();
        var version = btn.up('form').getForm().findField('version').getValue();
        var tree = this.getStationView().down('treepanel');
        var form = btn.up('form');
        if (id != null && id != '') {
            Jm.Msg.confirm('确定删除该行数据吗？', function (btn) {
                if (btn == 'ok') {
                    Ext.Ajax.request({
                        url: projectGP('/data/deleteEntity'),
                        params: {
                            id: id,
                            version: version
                        },
                        success: function (response) {
                            var text = response.responseText;
                            tree.store.reload();
                            form.getForm().reset();
                        }
                    });
                }
            });

        } else {
            Jm.Msg.warning('请选中站点！');
        }
    },
    resetConfig: function (btn) {
        btn.up('form').getForm().reset();


    },

    addFileField: function () {
        //alert(this.getFieldSetField())
        //var  fieldSet=   this.getStationView().fieldSet;


        //alert(fieldSet);
        //fieldSet.add(temp1);
        //fieldSet.doLayout();
        //var addFilefield = function (count) {
        //
        //    return Ext.create({
        //        xtype: 'filefield',
        //        fieldLabel: '文件路径' + count,
        //        allowBlank: false,
        //        width: '80%',
        //        name: 'ATTACHEMENT',
        //        buttonText: '选择文件'
        //
        //    })
        //
        //}
        //    fileSet.add(     Ext.create({
        //    xtype: 'filefield',
        //    fieldLabel: '文件路径',
        //    allowBlank: false,
        //    width: '80%',
        //    name: 'ATTACHEMENT',
        //    buttonText: '选择文件'
        //
        //}));
        //this.getStationView().fieldSetField.doLayout();
    }
});
