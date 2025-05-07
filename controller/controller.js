import { checkemail, checkpassword, generateToken, hashpassword, savedata } from "../model/model.js";
import { registerData, signUpData } from "../verification/verification.js";

export const login = (req,res) =>{
    res.render('login', {msg: req.flash('errors')});
}

export const home = (req,res) =>{
    if(!req.user) return res.redirect('login');
    res.render('home');
}

export const register = (req,res) =>{
    res.render('register', {msg:req.flash("errors")});
}

export const about = (req,res) =>{
    if(!req.user) return res.redirect('login');
    res.render('about');
}

export const contact = (req,res) =>{
    if(!req.user) return res.redirect('login');
    res.render('contact');
}

export const signup = async (req,res) =>{
    // const {username,email,password,cpassword} = req.body;
    // console.log(username,email,password,cpassword);

    const {data,error} = registerData.safeParse(req.body);
    console.log(data);

    if(error){
        console.log(error);
        req.flash("errors",error.errors[0].message);
        res.redirect('register');
    }

    const {username,email,password,cpassword} = data;

    if (password === cpassword) {
        const [datas] = await checkemail(email);
        console.log(datas);

        if (datas) {
            req.flash("errors", "email already exists");
            return res.redirect('/register')
        }

        const hashpass = await hashpassword(password);
        console.log(hashpass);

        const [save] = await savedata({username,email,hashpass});
        console.log(save);
        res.render('home',{title:"Data Registered!!!"});
    }
    else{
        req.flash("errors", "Password not matched!!");
        res.redirect('/register');
    }
}

export const logindata = async (req,res) =>{

    if(req.user) return res.redirect('/');

    console.log(req.body);
    //const {email,password} = req.body;

    const {data,error} = signUpData.safeParse(req.body);

    if(error){
        req.flash("errors",error.errors[0].message);
        res.redirect('login');
    }

    const {email,password} = data;


    //Check empty email and password
    if (!email || !password){
        req.flash("errors", "Fill all fields!!");
        res.redirect('/login');
    }

    try {
        const [data] = await checkemail(email);

        if(!data){
            req.flash("errors", "Invalid Email or Password");
            res.redirect('/login');
        }
        //console.log(data);

        const checkpass = await checkpassword(password,password);
        //console.log(checkpass);

        if (checkpass) {
            const token = generateToken({
                id: data.id,
                name: data.username,
                email: data.email
            })
            res.cookie('access_token',token);
            res.redirect('/');
        }
        else{
            req.flash("errors", "Invalid Email or Password");
            res.redirect('/login');
        }
    } catch (error) {
        res.render('login');
    }
}

export const medata = (req,res) =>{
    if(!req.user) return res.send('You are not loggedIn');

    return res.send(`Hello ${req.user.name}. Your email is ${req.user.email}`);
}

export const logout = (req,res) =>{
    res.clearCookie('access_token');
    res.redirect('login');
}