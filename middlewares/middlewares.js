import { checktoken } from "../model/model.js";

export const verifytoken = (req,res,next) =>{
    const token = req.cookies.access_token;
    console.log(token);

    if(!token){
        req.user = null;
        return next();
    }

    try {
        const decodedtoken = checktoken(token);
        req.user = decodedtoken;
        console.log(`Req.users :`, req.user);
    } catch (error) {
        req.user = null;
    }
    return next();
}