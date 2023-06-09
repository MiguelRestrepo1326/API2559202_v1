const express = require ('express');
const {MongoClient, ObjectId} = require ('mongodb');
const bodyparser  = require('body-parser');
require ('dotenv').config();

const uri = process.env.URI;


class usuarioService{

    constructor(){

    }

    //INSERT

    //insertOne

    async insertOne(body){

        const client = new MongoClient(uri)
        try {
            await client.connect();
            const usuario = await client.db('BookWare').collection('usuarios').insertOne({body})
            return usuario;
        } catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }

    //insertMany

    //FIND

    //find



    //findOne

    async findOne(id){
        try{
            await client.connect();
            const usuarios = await client.db('BookWare').collection('usuarios').findOne({idusuario:id});
            return usuarios;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


   
    //update
    
    //DELETE

    //deleteOne


    async  deleteOne(){

        try{
            await client.connect();
            const usuarios = await client.db('BookWare').collection('usuarios').deleteOne({idusuario:id});
            return usuarios;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }

    //deleteMany
    
}

module.exports  = usuarioService;