import jwt from "jsonwebtoken";

const secret = "qstore" 
export const auth = (req,res,next)=>{

    try {

    const token = req.headers.authorization?.split(" ")[1];

    let decodeData;

    if(token){
        decodeData = jwt.verify(token,secret)
        req.userId = decodeData?.id;
    }
      next();   
    } catch (error) {
        console.log(error);
    }

}