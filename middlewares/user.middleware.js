import jwt from 'jsonwebtoken';
export const userMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return next();
    }
    if(!authHeader.startsWith('Bearer')){
        return res.status(400).json({
            error:"authHeader is not start from Bearer",
        })
    }
    const [_, token]= authHeader.split(' ')
    console.log(token)
    const payload = jwt.verify(token, "murshad");
    req.user = payload;
    next();
}