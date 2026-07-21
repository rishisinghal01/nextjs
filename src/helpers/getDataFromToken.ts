import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const datafromtoken =(request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || "";
      const decodedtoken:any =  jwt.verify(token,process.env.token_secret!)

      return decodedtoken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}