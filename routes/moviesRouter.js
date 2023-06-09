const express = require('express');
const {MongoClient, ObjectId}=require('mongodb');
const bodyparser = require('body-parser');
require('dotenv').config();




const router = express.Router();

const uri=process.env.URI;

router.get('/',async (req,res)=>{
    const cliente = new MongoClient(uri);
    try{
        await cliente.connect();
        const resultado= await cliente.db('sample_mflix').collection('movies').find({}).limit(10).toArray();
        if(resultado){
            // para que lo muestre solo si la respuesta del servidor es esa
            res.status(200).json({
                "message":"Se creo la pelicula",
                resultado,
            })
        }else{
            res.send('nooo')
        }

    }catch(e){
        console.log(e);
    }finally{
        cliente.close();
    }
});

//findOne()
router.get('/:id',async (req,res)=>{
    const cliente = new MongoClient(uri);
    const {id}  = req.params;
    try{
        await cliente.connect();
        const resultado= await cliente.db('sample_mflix').collection('movies').findOne({_id:new ObjectId(id)}).toArray();
        if(resultado){
            res.json(resultado)
        }else{
            res.send('nooo')
        }

    }catch(e){
        console.log(e);
    }finally{
        cliente.close();
    }
});

//Create
router.get('/',async (req,res)=>{
    const cliente = new MongoClient(uri);
    const body  = req.body;
    try{
        await cliente.connect();
        const resultado= await cliente.db('sample_mflix').collection('movies').insertOne(body);
        if(resultado){
            res.status(201).json({
                "message":"Sii",
                data:body,
                resultado,
            })
        }else{
            res.send('nooo')
        }

    }catch(e){
        console.log(e);
    }finally{
        cliente.close();
    }
});

//Update

router.patch('/:id',async (req,res)=>{
    const {id} =req.params;
    const cliente = new MongoClient(uri);
    const body  = req.body;
    try{
        await cliente.connect();
        const resultado= await cliente.db('sample_mflix').collection('movies').updatetOne({_id:new ObjectId(id)},{$set:{title: body.title,year: body.year}});
        if(resultado){
            res.status(200).json({
                "message":"Sii",
                data:body,
                id
            })
        }else{
            res.send('nooo')
        }
    }catch(e){
        console.log(e);
    }finally{
        cliente.close();
    }
});

//Delete

router.delete('/:id',async (req,res)=>{
    const {id} =req.params;
    const cliente = new MongoClient(uri);
    try{
        await cliente.connect();
        const resultado= await cliente.db('sample_mflix').collection('movies').deletetOne({_id:new ObjectId(id)});
        if(resultado){
            res.status(204).json({
                "message":"Sii se elimino",
                resultado,
                id
            })
        }else{
            res.send('nooo')
        }
    }catch(e){
        console.log(e);
    }finally{
        cliente.close();
    }
});