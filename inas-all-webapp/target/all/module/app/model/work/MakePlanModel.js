/**
 * Created by JM-SD09 on 2015/8/26.
 */
Ext.define('inas.model.work.MakePlanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id', type: 'int'
        }, {
            name: 'version', type: 'int'
        }, {
            name: 'create_date', type: Ext.data.Types.DATE, dateFormat: 'time'
        }, {
            name: 'creator', type: 'string'
        }, {
            name: 'edit_date', type: Ext.data.Types.DATE, dateFormat: 'time'
        }, {
            name: 'editor', type: 'string'
        }, {
            name: 'code', type: 'string'
        }, {
            name: 'starttime', type: Ext.data.Types.DATE, dateFormat: 'time'
        }, {
            name: 'endtime', type: Ext.data.Types.DATE, dateFormat: 'time'
        }, {
            name: 'name', type: 'string'
        }, {
            name: 'attendance', type: 'string'
        }, {
            name: 'content', type: 'string'
        },
        {name:'img1',type:'string'},
        {name:'doc1',type:'string'},
        {name:'img2',type:'string'},
        {name:'doc2',type:'string'},
        {name:'img3',type:'string'},
        {name:'doc3',type:'string'},
        {name:'img4',type:'string'},
        {name:'doc4',type:'string'},
        {
            name: 'lo', type: 'int'
        }, {
            name: 'deleted', type: 'int'
        }]
});