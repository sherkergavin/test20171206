Ext.define('inas.controller.data.CurrentDataController', {
    extend: 'Ext.app.Controller',
    stores: ['pm.CurrentDataWindowStore'],
    views:['data.CurrentData'],
    refs: [
        {
            ref: 'currentData',
            selector: 'currentData'
        }
    ],
    init: function () {
        this.control({

            'currentData': {
                render: this.initCurData

            },
            'currentData menu': {
                click: this.menuClick

            }
        })
    },
    menuClick: function (menu, item, e, eOpts) {
        if (item.bind_id != null) {

            var panel = this.getCurrentData();
            panel.bind_id = item.bind_id;
            panel.type_id = item.type_id;

            Ext.Ajax.request({
                url: projectGP('/data/getCurrentData'),
                method: "POST",
                params: {
                    id: item.bind_id,
                    type: item.type_id
                },
                success: function (response) {

                    panel.removeAll();
                    var text = Ext.JSON.decode(response.responseText).success;
                    var fields = [];
                    var columns = [];
                    var data = [];
                    var bind_name = '';
                    var bind_type = null;
                    if (text && Ext.JSON.decode(response.responseText).data.length > 0) {
                        var ptemp = null;


                        for (var i = 0; i < Ext.JSON.decode(response.responseText).data.length; i++) {
                            fields = Ext.JSON.decode(response.responseText).data[i].fields;
                            columns = Ext.JSON.decode(response.responseText).data[i].columns;
                            data = Ext.JSON.decode(response.responseText).data[i].data;
                            bind_name = Ext.JSON.decode(response.responseText).data[i].bind_name;
                            bind_type = Ext.JSON.decode(response.responseText).data[i].bind_type;


                            if (1 == bind_type) {
                                ptemp = Ext.create('Ext.panel.Panel', {
                                    title: '<center>' + bind_name + '</center>',
                                    align: 'middle',
                                    layout: 'hbox',
                                    items: []
                                });
                                var ctemp = null;

                                for (var j = 0; j < data.length; j++) {


                                    ctemp = Ext.create('Ext.grid.Panel', {
                                        overCls: 'bg-color:red',
                                        sortableColumns: false,
                                        margin: '0 5 0 0',
                                        flex: 1,
                                        forceFit: true,
                                        columnLines: true,
                                        selModel: Ext.create('Ext.selection.CellModel', {
                                            singleSelect: true
                                        }),

                                        store: Ext.create('Ext.data.Store', {
                                            fields: fields,
                                            data: data[j]

                                        }),
                                        columns: columns,
                                        listeners: {
                                            cellclick: function (g, td, cellIndex, record, tr, rowIndex, e, eOpts) {

                                                var column = g.getHeaderAtIndex(cellIndex);
                                                var fieldName = column.dataIndex;
                                                fieldName = fieldName.replace('column_', 'item_id_');

                                                var item_id = record.get(fieldName);
                                                var station_id = record.get('station_id');

                                                if (cellIndex > 0 && item_id != '' && item_id != null) {

                                                    var window = Ext.create('inas.view.pm.DataHistoryWin');
                                                    window.setDataItemId(item_id);
                                                    window.show();
                                                }
                                                else if (station_id != null) {
                                                    var window = Ext.create('inas.view.pm.CurrentDataWindow');
                                                    window.on('render', function () {
                                                        var grid = window.down("gridpanel");
                                                        grid.store.load({
                                                            params: {
                                                                station_id: station_id
                                                            },
                                                            callback: function (records, operation, success) {
                                                            }


                                                        });
                                                        grid.on('itemclick', function (g, r) {
                                                            var item_id = r.get('ID');
                                                            if (item_id != null) {
                                                                var w = Ext.create('inas.view.pm.DataHistoryWin');
                                                                w.on('beforerender', function () {
                                                                    w.setDataItemId(item_id);
                                                                });
                                                                w.show();
                                                            }
                                                        });
                                                    });
                                                    window.show();
                                                }
                                            }
                                        }
                                    });
                                    ptemp.items.add(ctemp);
                                }
                                panel.items.add(ptemp);
                                panel.doLayout();
                            }
                        }
                    }
                }
            });
        }
    },
    initCurData: function (p, e) {

        Ext.Ajax.request({
            url: projectGP('/data/getDataCurrentMenu'),
            params: {},
            success: function (response) {

                var text = Ext.JSON.decode(response.responseText).success;
                var bl = true;
                if (text && Ext.JSON.decode(response.responseText).data.length > 0) {

                    for (var i = 0; i < Ext.JSON.decode(response.responseText).data.length; i++) {

                        p.mytbar.add(Ext.JSON.decode(response.responseText).data[i]);
                        if (Ext.JSON.decode(response.responseText).data[i].menu != null) {

                            for (var j = 0; j < Ext.JSON.decode(response.responseText).data[i].menu.items.length; j++) {
                                if (bl) {
                                    p.bind_id = Ext.JSON.decode(response.responseText).data[i].menu.items[j].bind_id;
                                    p.type_id = Ext.JSON.decode(response.responseText).data[i].menu.items[j].type_id;
                                    bl = false;
                                }
                            }
                        }
                    }

                    var refresh = Ext.create('inas.view.pm.AutoRefresher', {
                        refreshInterval: 60,
                        listeners: {
                            refresh: function () {

                                Ext.Ajax.request({
                                    url: projectGP('/data/getCurrentData'),
                                    params: {
                                        id: p.bind_id,
                                        type: p.type_id
                                    },
                                    success: function (response) {
                                        p.removeAll();
                                        var text = Ext.JSON.decode(response.responseText).success;
                                        var fields = [];
                                        var columns = [];
                                        var data = [];
                                        var bind_name = '';
                                        var bind_type = null;
                                        if (text && Ext.JSON.decode(response.responseText).data != null) {
                                            var ptemp = null;
                                            for (var i = 0; i < Ext.JSON.decode(response.responseText).data.length; i++) {
                                                fields = Ext.JSON.decode(response.responseText).data[i].fields;
                                                columns = Ext.JSON.decode(response.responseText).data[i].columns;
                                                data = Ext.JSON.decode(response.responseText).data[i].data;

                                                bind_name = Ext.JSON.decode(response.responseText).data[i].bind_name;
                                                bind_type = Ext.JSON.decode(response.responseText).data[i].bind_type;
                                                if (1 == bind_type) {

                                                    ptemp = Ext.create('Ext.panel.Panel', {
                                                        title: '<center>' + bind_name + '</center>',
                                                        align: 'middle',
                                                        layout: 'hbox',
                                                        items: []
                                                    });
                                                    var ctemp = null;
                                                    for (var j = 0; j < data.length; j++) {
                                                        ctemp = Ext.create('Ext.grid.Panel', {
                                                            overCls: 'bg-color:red',
                                                            sortableColumns: false,
                                                            margin: '0 5 0 0',
                                                            flex: 1,
                                                            forceFit: true,
                                                            columnLines: true,
                                                            selModel: Ext.create('Ext.selection.CellModel', {
                                                                singleSelect: true
                                                            }),

                                                            store: Ext.create('Ext.data.Store', {
                                                                fields: fields,
                                                                data: data[j]

                                                            }),
                                                            columns: columns,
                                                            listeners: {
                                                                cellclick: function (g, td, cellIndex, record, tr, rowIndex, e, eOpts) {

                                                                    var column = g.getHeaderAtIndex(cellIndex);
                                                                    var fieldName = column.dataIndex;
                                                                    fieldName = fieldName.replace('column_', 'item_id_');

                                                                    var item_id = record.get(fieldName);
                                                                    var station_id = record.get('station_id');

                                                                    if (cellIndex > 0 && item_id != '' && item_id != null) {

                                                                        var window = Ext.create('inas.view.pm.DataHistoryWin');
                                                                        window.setDataItemId(item_id);
                                                                        window.show();
                                                                    }
                                                                    else if (station_id != null) {
                                                                        var window = Ext.create('inas.view.pm.CurrentDataWindow');
                                                                        window.on('render', function () {
                                                                            var grid = window.down("gridpanel");
                                                                            grid.store.load({
                                                                                params: {
                                                                                    station_id: station_id
                                                                                },
                                                                                callback: function (records, operation, success) {
                                                                                }


                                                                            });
                                                                            grid.on('itemclick', function (g, r) {
                                                                                var item_id = r.get('ID');
                                                                                if (item_id != null) {
                                                                                    var w = Ext.create('inas.view.pm.DataHistoryWin');
                                                                                    w.on('beforerender', function () {
                                                                                        w.setDataItemId(item_id);
                                                                                    });
                                                                                    w.show();
                                                                                }
                                                                            });
                                                                        });
                                                                        window.show();
                                                                    }
                                                                }
                                                            }
                                                        });
                                                        ptemp.items.add(ctemp);
                                                    }
                                                    p.items.add(ptemp);
                                                    p.doLayout();
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });

                    p.mytbar.add('->');
                    p.mytbar.add(refresh);

                    refresh.fireEvent('refresh');
                }
            }
        });
    }
});