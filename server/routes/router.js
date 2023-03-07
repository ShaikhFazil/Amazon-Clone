const express = require('express');
const router = new express.Router();
const Products = require('../models/productsSchema');
const USER = require('../models/userScheme');

// GET productsdata api
router.get('/getproducts',async(req,res)=>{
    try{

        const productsdata = await Products.find();
        //console.log(` console the data ${productsdata}`);
        res.status(201).json(productsdata);
    }catch(e){ 
       console.log(`error ${e}`);
    }
})


//GET individual data

router.get("/getproductsone/:id",async(req,res)=>{
    try{
const {id} = req.params;
//console.log(id);

const individualdata = await Products.findOne({id:id});
//console.log(individualdata+"individual data");

res.status(201).json(individualdata);

    }
    catch(e){
res.status(400).json(individualdata);
console.log('error'+ e.message);
    }
})

//Register Data

router.post('/register',async(req,res)=>{
   // console.log(req.body);

const {fname,email,mobile,password,cpassword} = req.body;

if(!fname || !email || !mobile || !password || !cpassword){
    res.status(422).json({error:"fill the data"});
    console.log("not available data");
}


try{
const preuser = await  USER.findOne({email:email});

if(preuser){
    res.status(422).json({error:"this user is already present"})
}else if(password !== cpassword){
    res.status(422).json({error:"Password and Cpassword are not matched"})
}else{
    const finaluser = new USER({
        fname,email,mobile,password,cpassword
    });



    
    const storedata = await finaluser.save();
    console.log(storedata);

    res.status(201).json(storedata);
}

}
catch(e){
    res.status(422).json({e:"sorry"});
}


})



module.exports = router;