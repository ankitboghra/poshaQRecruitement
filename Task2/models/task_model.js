const mongoose=require('mongoose');
const lSchema=mongoose.Schema({
    label:{type:String},
    tasks:[{type:String}]
},
{
    collection: 'col_tasks'
}
);

module.exports=mongoose.model('db_Todo', lSchema);