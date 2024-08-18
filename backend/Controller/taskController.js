const { PrismaClient } = require("@prisma/client");

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();




const addTask = async ( req, res ) => {
    const { task } = req.body;
    await prisma.task.create({
       data: {
         title: task ,
         user: {
           connect: {
             id: oldUser.id,
           },
         },
       },
    });
    return res.json({ msg : "task created" });
}

module.exports = addTask;
