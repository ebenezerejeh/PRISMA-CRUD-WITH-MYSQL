const express = require('express');
require('dotenv').config();
const app = express();
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

app.use(express.json());

//this gets all users from the database
app.get('/prisma/user', async (req,res)=>{
    try {
        const allUser = await prisma.user.findMany();
        res.json(allUser)
        
    } catch (error) {
        console.log(error)
        
    }


})

//this gets all houses from tehe database with details about their owners
app.get('/prisma/houses', async (req,res)=>{
    try {
        const allHouses = await prisma.house.findMany({include:{
            owner:true,
            builtBy:true
        }});
        res.json(allHouses)
        
    } catch (error) {
        console.log(error)
        
    }


})

//this gets a house by id
app.get('/prisma/houses/:id', async (req,res)=>{
    const id = req.params.id
    try {
        const allHouses = await prisma.house.findUnique({
            where: {id:id},
            include:{owner:true}
        });
        res.json(allHouses)
        
    } catch (error) {
        console.log(error)
        
    }


})

//this creates a new user
app.post('/prisma/user', async (req,res)=>{
    try {
        console.log(req.body)
        const newUser = await prisma.User.create({data: req.body});
        // console.log(newUser)
        res.json(`${newUser.firstName} has been added to the database`)
        
    } catch (error) {
        console.log(error)

        
    }


})


//this creates a new house
app.post('/prisma/houses', async (req,res)=>{
    try {
        console.log(req.body)
        const newHouse = await prisma.house.create({data: req.body});
        // console.log(newUser)
        res.json(newHouse)
        
    } catch (error) {
        console.log(error)

        
    }


})

//this updates a users age
app.put('/prisma/user/:id', async (req,res)=>{
    const id = req.params.id;
    const newAge = req.body.age
    try {
        const updatedUser = await prisma.user.update({where: {id: id} , data: {age: newAge}});
        // res.json(updatedUser)
        res.json(`${User.firstName} has been updated sucessfully`)
        
    } catch (error) {
        console.log(error)
        
    }


})

//this deletes a users record
app.delete('/prisma/user/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const deletedUser = await prisma.user.delete({where: {id:id}});
        res.json(`${deletedUser.firstName} has been deleted`)
        // res.json(`${User.firstname} has been updated sucessfully`)
        
    } catch (error) {
        console.log(error)
        
    }


})


// CREATE MANY WILL TAKE IN AN ARRAY OF OBJECTS AND POPULATE WITH MULTIPLE VALUES

//FIND BASED ON CONDITIONS(FILTER)
//ORDER YOUR RESULTS BASED ON ALPHABETS





const port = (process.env.PORT)

app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
})