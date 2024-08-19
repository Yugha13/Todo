const { PrismaClient } = require("@prisma/client");

const { z } = require("zod");

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();


const user = z.object({
    gmail    : z.string().email(),
    password : z.string().min(4)
})

const signup = async ( req, res ) => {
    const { gmail, password } = req.body;
    const typeCheck = user.safeParse({ gmail, password });
    const err = typeCheck.error?.errors.map( item => (item.message));
    if(typeCheck.error) return res.json({ msg : err });
    try {
        await prisma.user.create({
            data: {
                gmail,
                password
            }
        })
        return res.json({ msg : "user created" });
    } catch (e) {
        return res.json({ msg : "user already created" });
    }
}


const login = async ( req, res ) => {
    const { gmail, password } = req.body;
    const typeCheck = user.safeParse({ gmail, password });
    const err = typeCheck.error?.errors.map((item) => item.message);
    if (typeCheck.error) return res.json({ msg: err });
    try {
        const olduser = await prisma.user.findFirst({
            where : {
                gmail,
                password
            }
        });
        if(!olduser) return res.json({ msg: "user not found" });
        const token  = await jwt.sign(gmail, process.env.KEY);
        res.cookie("token", token);
        return res.json({ msg : "user logedin" });
    } catch (e) {
        res.json({ err : e });
    }
}

const viewuser = async ( req, res ) => {
    const { gmail } = req.body;
    return res.json({ msg : gmail }) 
} 



module.exports = {
    signup,
    login,
    viewuser
};