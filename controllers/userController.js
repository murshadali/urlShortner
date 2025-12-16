import db from '../db/index.js'
import {userTable} from '../models/user.model.js'
import {eq} from 'drizzle-orm';
import bcrypt from 'bcrypt';
import {userValidationSchema} from '../validations/user.validation.js'

export const signupController = async(req,res)=>{
     try{
          //   const {firstName, lastName,email, password} = req.body;
          //   if(!firstName||!lastName||!email){
          //      return res.status(300).json({
          //           message:"fill all field",
          //      })
          //   }
          console.log(req.body)
          const validResult = await userValidationSchema.safeParseAsync(req.body);
          if(validResult.error){
               return res.status(400).json({message:validResult.error.format()})
          }
             const {firstName, lastName,email,password}= validResult.data;
          const [existingUser] = await db.select(
          {id:userTable.id}
          )
     .from(userTable)
     .where(eq(userTable.email, email))
     if(existingUser){
          return res.status(300).json({
               message:"user is existed",
          })
     }
     const hashPass = await bcrypt.hash(password,10);
     const [userId] = await db.insert(userTable).values({
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:hashPass,
     }).returning({id:userTable.id})
     return res.status(200).json({
          message: "user is created successfully",
          userId,
     })
     }
     catch(err){
          console.log(error);
          return res.status(400).json({
               error:"internal server error!"
          })
     }
   
}