function seltext(v, record) {
    return record.data.name+(null==record.data.description?"":record.data.description);
};
Ext.define('inas.model.pm.DataFormatModel',{
    extend:'Ext.data.Model',
    fields:['id','name', 'data_type','data_spec','data_unit','description','lo',{name:'descriptions',convert:seltext}]
});