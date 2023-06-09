const express = require ('express');
const {MongoClient, ObjectId} = require ('mongodb');
const bodyparser  = require('body-parser');
require ('dotenv').config();

const uri = "mongodb+srv://juanda52141:juanda52141@cluster0.hlnd5vi.mongodb.net/?retryWrites=true&w=majority";

const userService = require('../services/usuerService');
//const port = 3000;

//const app = express();

const router = express.Router();
const usuario = new usuerService();

//insertOne

router.post('/',async (req,res)=>{
    const body = req.body;
    const resultado = await usuario.insertOne(body)
    if (resultado){
        res.status(201).json({
            "message":"se ha insertado el usuario",
            data:body,
            usuario,
        });
    }else{
        res.send("no se encontro la pelicula")
    }
})

//find

router.get('/',async (req,res)=>{
    const client  = new MongoClient(uri)
    try{
        await client.connect();
        const usuarios = await client.db('BookWare').collection('usuarios').find({}).limit(5).toArray();
        if(usuarios){
            res.send(usuarios)
        }else{
            res.send("no se encontro la informacion")
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

//findOne

router.get('/:id',async (req,res)=>{
    // const client  = new MongoClient(uri)
    const id = req.params.id;
    // console.log(id)
    // await client.connect();
    const resultado = await usuario.findOne(id)
    if(resultado){
        res.send(resultado)
    }else{
        res.send("no se encontro el usuario con este id")
    }
   
})



router.patch('/:id',async (req,res)=>{
    const id = req.params.id;
    const client = new MongoClient(uri);
    const body = req.body;

    try {
        await client.connect();
        const usuario = await client.db('BookWare').collection('usuarios').updateOne({"_id":new ObjectId(id)},{
            $set:{
                title:body.title,
                year : body.year
            }
        })
        if (usuario){
            res.status(201).json({
                "message":"se ha modificado el usuario",
                data:body,
                usuario
            });
        }else{
            res.send("no se encontro el usuario")
        }
    } catch (error) {
        
    }
})

router.delete('/:id',async (req,res)=>{
    const client  = new MongoClient(uri)
    const id = req.params;
    // console.log(id);
    const usuarios = await usuario.deleteOne(id);
    if(usuarios){
        res.status(200).json({
            message: 'se ha eliminado al usuario',
            usuarios
        })
        // res.send(usuarios)
    }else{
        res.send("no se encontro el usuario con este id");
    }
})



module.exports = router;