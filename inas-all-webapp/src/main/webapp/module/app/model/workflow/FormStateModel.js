/**
 * Created by luyufei on 2016/3/23.
 */
Ext.define('inas.model.workflow.FormStateModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'name',type:'string'
        },
        {
            name: 'value',type:'string'
        }
    ]
    //data : [
    //    {name: '待我审批',    value: '1'},
    //    {name: '审批中', value: '2'},
    //    {name: '准备中', value: '3'},
    //    {name: '正在进行', value: '4'},
    //    {name: '已完成', value: '5'}
    //]
});
