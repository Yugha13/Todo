const { PrismaClient } = require("@prisma/client");

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();


const middleware = async ( req, res, next ) => {
    const { token } = req.cookies;
    if(!token) return res.json({ msg : "try to login" });
    
    try {
        const gmail = await jwt.verify( token, process.env.KEY );
        const oldUser = await prisma.user.findFirst({
            where : {
                gmail
            }
        });
        //console.log(oldUser);
        
        if(Object.keys(oldUser).length != 0) {
            req.body.gmail = oldUser.gmail;
            return next();
        }

        return res.json({mes: "try to login"});
    }
    catch(e){
        return res.json({ msg: "something went wrong", e });
    }
}

module.exports = middleware;