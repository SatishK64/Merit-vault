import mongoose from 'mongoose';
const tokenSchema=new mongoose.Schema(
    {
        _id: { type: String, default: "uniform" },
        token:{type: String,required: true},
        date:{type: Date, default: Date.now}
    });
    let Token;
    if(mongoose.models.Token){
        Token=mongoose.models.Token;
    }
    else{
      Token=mongoose.model('Token',tokenSchema);
    }
    export default Token;

