Ext.define('inas.model.work.MettingRecModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'time',  type : Ext.data.Types.DATE,dateFormat : 'time'},
        {name: 'name', type: 'string'},
        {name:'attendance',type:'string'},
        {name:'address',type:'string'},
        {name:'content',type:'string'},
        {name:'img1',type:'string'},
        {name:'doc1',type:'string'},
        {name:'img2',type:'string'},
        {name:'doc2',type:'string'},
        {name:'img3',type:'string'},
        {name:'doc3',type:'string'},
        {name:'img4',type:'string'},
        {name:'doc4',type:'string'},
        {name:'description',type:'string'}
    ]
});