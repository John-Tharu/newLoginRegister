import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { usersTable } from "../drizzle/schema.js"
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const checkemail = async (email) =>{
    const data = await db.select().from(usersTable).where(eq(usersTable.email,email));
    return data;
}

export const hashpassword = async (password) =>{
    return await argon2.hash(password);
}

export const savedata = async ({username,email,hashpass}) =>{
    return await db.insert(usersTable).values({username,email,password:hashpass}).$returningId();
}

export const checkpassword = async (hashpass,password) =>{
    return await argon2.verify(hashpass,password);
}

export const generateToken = ({id,name,email}) =>{
    return jwt.sign({id,name,email}, process.env.json_token,{
        expiresIn:"30d",
    })
}

export const checktoken = (token) =>{
    return jwt.verify(token,process.env.json_token);
}