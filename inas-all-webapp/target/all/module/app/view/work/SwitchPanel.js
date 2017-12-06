/**
 * Created by JM-SD09 on 2015/9/7.
 */
Ext.define('inas.view.work.SwitchPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.switchPanel',

    initComponent: function () {
        var tbar = Ext.create('Ext.Toolbar', {
            id:'tbar',
            align: 'center',
            region: 'north',
            name: 'middleToolbar',
            height: 40,
            items: [
                //{
                //    fieldLabel: '站点',
                //    name: 'entity_id',
                //    xtype: 'combobox',
                //    store: 'data.EntityComboBox',
                //    emptyText: '请选择',
                //    queryMode: 'query',
                //    mode: 'local',
                //    triggerAction: 'all',
                //    displayField: 'NAME',
                //    valueField: 'ID',
                //    editable: false,
                //    allowBlank: false
                //},
                {
                    xtype: 'datefield',
                    fieldLabel: '日期',
                    name: 'selectTime',
                    editable: false,
                    labelWidth: 30,
                    format: 'Y-m-d',
                    value: Ext.Date.format(new Date(), 'Y-m-d')
                }, {
                    xtype: 'jbutton',
                    action: 'search'
                }]
        });


        var col = [];
        col.push({text: 'entity_type_id',dataIndex: 'entity_type_id', width: 100,hidden:true});
        col.push({text: 'entity_id',dataIndex: 'entity_id', width: 100,hidden:true});
        col.push({text: 'data_item_id',dataIndex: 'data_item_id', width: 100,hidden:true});
        col.push({text: "单位名称", dataIndex: 'entity_name', width: 100,hidden:true, align: 'center'});
        col.push({text: '泵名称', dataIndex: 'data_item_name', width: 100, align: 'center'});
        for (var i = 0; i < 24; i++) {
            //alert('h'+(i+1));
            col.push({
                text: "<div style='text-align: center'>" + i + "  -  " + (i == 23 ? 0 : i + 1) + "</div>",
                //text: i + ' - ' + (i == 23 ? 0 : i + 1),
                dataIndex: 'h'+(i+1),
                width: 180,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //record.get("value_type");
                    var data='';
                    var temp='';
                    var val1='';
                    var val2='';
                    var val3='';
                    var val4='';
                    var val5='';
                    var val6='';
                    var line1='/';
                    var line2='-';
                    var line3='/';
                    if(record.get("value_type")==1){
                        for(var i=0;i<value.length;i++){
                            //alert(value[i]); //获取h1-h23的值
                            if(value[i]!=null){
                                var a=Ext.typeOf(value[i]);
                                //alert(a);  number or array?
                                if(a=='array'){
                                    //alert('1:'+value[i][1]+'/'+'2:'+value[i][2]+'/'+'3:'+value[i][3]+'/'+'4:'+value[i][4]);
                                    //value[i][1] value[i][2]
                                    if(value[i][1]==null&&value[i][2]==null){
                                        line1='';
                                        line2=''
                                    }else if(value[i][1]==null||value[i][2]==null){
                                        line1=''
                                    }
                                    if(value[i][3]==null&&value[i][4]==null){
                                        line2='';
                                        line3=''
                                    }else if(value[i][3]==null||value[i][4]==null){
                                        line3=''
                                    }
                                    //for(var v=1;v<5;v++) {
                                    //
                                    //    if (value[i][v] == null) {
                                    //        value[i][v] = '';
                                    //    }
                                    //}
                                    //alert(i+'/'+temp+'/'+a);
                                    temp = "line-" + value[i][0] + ".png";
                                    val1 = value[i][1];
                                    val2 = value[i][2];
                                    val3 = value[i][3];
                                    val4 = value[i][4];
                                    val5 = value[i][5];
                                    val6 = value[i][6];
                                    var length = '';
                                    var displayPressure ='';
                                    if (val1 !=null && val2 !=null && val3 !=null && val4 !=null && val5 !=null && val6 !=null){
                                        displayPressure = val1+'/'+val2+','+val3+'-'+val4+'/'+val5+','+val6;
                                        length = 6;
                                    } else if (val1!=null && val4!=null &&val2==null && val3==null && val5==null && val6==null){
                                        displayPressure = val1+'-'+val4;
                                        length = 2;
                                    } else if(val1==null && val2==null &&val3==null && val4==null && val5==null && val6==null) {
                                        displayPressure = '';
                                        length = 0;
                                    }else{
                                        if(val1 == null){ val1=''};
                                        if(val2 == null){ val2=''};
                                        if(val3 == null){ val3=''};
                                        if(val4 == null){ val4=''};
                                        if(val5 == null){ val5=''};
                                        if(val6 == null){ val6=''};
                                        displayPressure = val1+'/'+val2+','+val3+'-'+val4+'/'+val5+','+val6;
                                    }
                                    if (value[i][0] == 3) {
                                        if(length == 2 || length ==0 ) {
                                            if( i == 4 || i == 5 ) {
                                                data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style=' left: -50px; top:-7px; position: absolute'>" +
                                                    "</span></div><div style='float:right'>" + displayPressure + "</div>";
                                            }else if(i ==2 || i == 3){
                                                data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style=' left: -50px; top:-7px; position: absolute'>" +
                                                    "</span></div><div style='float:left;margin-left: 67px'>" + 'juzhong'+displayPressure + "</div>";
                                            }
                                            else{
                                                data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style=' left: -50px; top:-7px; position: absolute'>" +
                                                    "</span></div><div style='float:left'>" + displayPressure + "</div>";
                                            }
                                        }else{
                                            data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style=' left: -50px; top:-7px; position: absolute'>" +
                                                "</span></div><div style='float:right'>" + displayPressure + "</div>";
                                        }
                                    } else {
                                        if(length ==2 || length ==0 ) {
                                            if( i == 4 || i == 5 ) {
                                                data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style='  left: 4px; top:-7px; position: absolute'>" +
                                                    "</span></div><div style='float:right'>" + displayPressure + "</div>";
                                            }else if (i==2 || i==3){
                                                data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style='  left: 4px; top:-7px; position: absolute'>" +
                                                    "</span></div><div style='float:left;margin-left: 67px'>" + displayPressure + "</div>";
                                            }
                                            else{
                                                data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style='  left: 4px; top:-7px; position: absolute'>" +
                                                    "</span></div><div style='float:left'>" + displayPressure + "</div>";
                                            }
                                        }else{
                                            data += "<div style='width: 30px;display: inline-block; position: relative'><img width='30' src='" + sxtGP('/inas/switch/' + temp) + "'/><span style='  left: 4px; top:-7px; position: absolute'>" +
                                                "</span></div><div style='float:left'>" + displayPressure + "</div>";
                                        }
                                    }
                                }
                                else{
                                    temp="line-"+value[i]+".png";
                                    data+="<img width='30' src='" + sxtGP('/inas/switch/'+temp) + "'/>";
                                }
                            }
                            else{
                                //Ext.EventManager.on('qwer','click',function(){aelrt('123')});
                                temp="line-0.png";
                                data+="<img width='30' src='" + sxtGP('/inas/switch/'+temp) + "'/>";
                            }
                        }


                        //console.log(data);
                        return data ;
                    }else {
                        //console.log(value);
                        return value;
                    }
                }
            });
        };

        //Ext.EventManager.addListener("myDiv",'click',function(){alert('123')});


        Ext.apply(this, {
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    border: true,
                    xtype: 'treepanel',
                    region: 'west',
                    autoScroll: true,
                    forceFit: true,
                    width: 200,
                    rootVisible: false,
                    store: 'work.switchTreeStore',
                    useArrows: true,
                    autoHeight: true,
                    name: 'switchTree'
                },
                {
                    xtype: 'grid',
                    id:'tmpGrid',
                    //frame:true,
                    region: 'center',
                    //selType:'cellmodel',
                    cls: 'myCls',
                    name: 'switchGrid',
                    store: 'work.switchGridStore',
                    enableColumnMove: false,
                    enableColumnResize: false,
                    viewConfig: {
                        enableTextSelection: 'true',
                        getRowClass: function (record, index, rowParams, store) {
                            return 'row-switch';
                        }
                    },
                    columns: col,
                    features: [{ftype:'grouping'}],  //分组列表
                    tbar: tbar
                }
            ],
            //buttons: [{xtype: 'jbutton', action: 'refresh'}],
            forceFit: true
        });
        this.callParent(arguments);
    }
});