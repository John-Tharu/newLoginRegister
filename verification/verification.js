import z from 'zod';

export const registerData = z.object({
    username: z.string().trim().min(4,{message:"Username must be 4 character long"}).max(100,{message:"Username must be 100 character long"}),
    email: z.string().trim().email({message:"Enter a valid email address"}).max(100),
    password: z.string().min(6,{message:"Password must be 6 character long"}).max(100,{message:"Password must be 100 character long"}),
    cpassword: z.string().min(6,{message:"Password must be 6 character long"}).max(100,{message:"Password must be 100 character long"})
})

export const signUpData = z.object({
    email: z.string().trim().email({message:"Enter a valid email address"}).max(100),
    password: z.string().min(6,{message:"Password must be 6 character long"}).max(100,{message:"Password must be 100 character long"})
})