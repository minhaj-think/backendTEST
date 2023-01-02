const express = require('express');
const cors = require('cors')
const app = express();
const fs = require('fs');
const moment = require('moment')
const multer = require('multer');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
const productSchema = require('./schemas/product');
const orderSchema = require('./schemas/order');

const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/backendTest',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB connection successful');
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

connectDB();

// section 1
app.post('/digits',async (req,res)=>{
    
    var {digit} = req.body;

    if(digit.toString().length==1){
        res.json({
            number : digit
        })
    }else{
        var digitToStrArr = digit.toString().split('');
        var total = 0;
        digitToStrArr.map((val,index)=>{
            if(index!=digitToStrArr.length-1){
                total = total + Number(val);
            }else{
                total = total + Number(val);
                res.json({
            number : total
                })
            }
        })
    }

})
// end of section 1




// section 2 
app.post('/uploadFilesArray/:filePath',
    multer({ dest: __dirname + 'filepath'+'/' }).array('fileData',5)
, 
(req, res) => {  
    console.log('get done',req.params.filePath)
    if(req.file!==undefined){
        console.log(req.file)
        res.json({
            status:'success'
        })
    }else{
        
      return res.json({message:'Failed',doc:'File can not be null'})
    }
  })
// end of section 2





// section 3
app.get('/filesGetting',async(req,res)=>{

var filesArray = ['SDP-M-001.txt','SDP-M-002.txt','SDP-M-003.txt','SDP-M-004.txt','SDP-M-005.txt','SDP-M-006.txt','SDP-M-007.txt',
'SDP-M-008.txt','SDP-M-009.txt','SDP-M-010.txt','SDP-M-011.txt','SDP-M-012.txt','SDP-M-013.txt']

var skippedFiles = [];
var readedFiles = [];
var newFileTxt ='';
filesArray.map( (filePath,index)=>{

    fs.readFile('files/'+filePath, 'utf8',function(err,data){
        if(err){
            console.log('err ',err)
        }else{
            if(data.split(' ').length>=150){
                readedFiles = [...readedFiles,filePath];
                newFileTxt = newFileTxt +data;
            }else{
                skippedFiles = [...skippedFiles,filePath];
            }
            if(index==filesArray.length-1){

                fs.writeFile('newFile.txt', newFileTxt, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
                  console.log("readed ",readedFiles)
                  console.log("skipped ",skippedFiles)
            }
        }
        })
})

res.json({
    skippedFiles,
    readedFiles
})
})
// end of section 3





// section 4
app.get('/',async(req,res)=>{

// 1
    var response1_1 = await productSchema.find();
    for(let i=0 ;i<response1_1.length; i++){

        var startDate = moment('15 11 2022').format('DD MM YYYY')
        console.log(startDate)
        var endDate = moment('30 12 2022').format('DD MM YYYY')
async function randomDate() {
            var date = new Date(startDate + Math.random() * (endDate - startDate));

          var result = await productSchema.updateOne({id:response1_1[i]._id},{
            createdDate:date
        },{new:true}) 
        console.log(result)
    }

}

// 2
    var response2_1 = await productSchema.find( { $expr: { $gt: [ '$actualCost',"$fakeCost" ] } } ).limit(10).sort({views:-1})
    // console.log(response2_1)




// 3
 var response3_1 = await productSchema.find({ $expr: { $gt:[100,{$subtract: [ '$actualCost',"$fakeCost" ] }] }} )
//  console.log(response3_1)


// 4
    var response4_1 = await productSchema.find({}).sort({sold:-1}).limit(5)
    var response4_2 = (response4_1[0].actualCost + response4_1[1].actualCost + response4_1[2].actualCost+
        response4_1[3].actualCost +response4_1[4].actualCost)/5
        // console.log(response4_2)

// 5
// var response5_1 = await productSchema.findOneAndUpdate({$expr:{ $lt:[ 1000,"$views" ]}},
// {
//     actualCost:{
//          $add:["$sold","$sold"]
//         } 
// }
// ,{new:true})
// console.log(response5_1)

// {$expr:{ $add:[ "$actualCost","$actualCost"]}}


// 6
var response6_1 = await orderSchema.find({ $expr: { $avg: [ '$items.unitPrice' ] } });
        // console.log(response6_1.items[0])


// 7
        var a1 = moment().format()
        var a2 = moment().subtract(1,'months').format()
        var a3 = moment().subtract(2,'months').format()
        var a4 = moment().subtract(3,'months').format()
        var a5 = moment().subtract(4,'months').format()
        var a6 = moment().subtract(5,'months').format()
        var a7 = moment().subtract(6,'months').format()


        const addFunction = (total, num)=>{
            return total + num;
        }

        var response7_1 = await orderSchema.find({
            createdDate:{
                $gte:a1,
                $lte:a2
            }
        });

        if(response7_1.length>0){
            var res = response7_1.reduce(addFunction)
        }
        // console.log(res)

        var response7_2 = await orderSchema.find({
            createdDate:{
                $gte:a2,
                $lte:a3
            }
        });
        if(response7_2.length>0){
            var res = response7_2.reduce(addFunction)
        }
        // console.log(res)

        var response7_3 = await orderSchema.find({
            createdDate:{
                $gte:a3,
                $lte:a4
            }
        });
        if(response7_3.length>0){
            var res = response7_3.reduce(addFunction)
        }
        // console.log(res)

        var response7_4 = await orderSchema.find({
            createdDate:{
                $gte:a4,
                $lte:a5
            }
        });
        if(response7_4.length>0){
            var res = response7_4.reduce(addFunction)
        }
        // console.log(res)

        var response7_5 = await orderSchema.find({
            createdDate:{
                $gte:a5,
                $lte:a6
            }
        });
        if(response7_5.length>0){
            var res = response7_5.reduce(addFunction)
        }
        // console.log(res)

        var response7_6 = await orderSchema.find({
            createdDate:{
                $gte:a6,
                $lte:a7
            }
        });
        if(response7_6.length>0){
            var res = response7_6.reduce(addFunction)
        }
        // console.log(res)
        


        // 8
        var response8_1 = await orderSchema.find({ $expr: { $lt: [ 1,"$items.length" ] } }).countDocuments();
        // console.log(response8_1)



        // 9
        var response9_1 = await orderSchema.find({ $expr: { $lt: [ 5000,"$items.unitPrice" ] } })
        // console.log(response9_1[0].total)


        // 10
        var response10_1 = await orderSchema.find({
            $expr: { $avg: "$items.unitPrice" } 
        })
        // console.log(response10_1)

res.json({
    status:200
})

})


// end of section 4

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
