/**
 * Created by WangJm on 2015/6/11.
 */
Ext.define('inas.model.system.OrganiztionModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});