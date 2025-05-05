import { checkemail, checkpassword, generateToken, hashpassword, savedata } from "../model/model.js";

export const login = (req,res) =>{
    res.render('login');
}

export const home = (req,res) =>{
    res.render('home');
}

export const register = (req,res) =>{
    res.render('register');
}

export const about = (req,res) =>{
    res.render('about');
}

export const contact = (req,res) =>{
    res.render('contact');
}

export const signup = async (req,res) =>{
    const {username,email,password,cpassword} = req.body;
    console.log(username,email,password,cpassword);

    if (password === cpassword) {
        const [data] = await checkemail(email);
        console.log(data);

        if (data) return res.redirect('/register')

        const hashpass = await hashpassword(password);
        console.log(hashpass);

        const [save] = await savedata({username,email,hashpass});
        console.log(save);
        res.render('home',{title:"Data Registered!!!"});
    }
    else{
        res.redirect('/register');
    }
}

export const logindata = async (req,res) =>{
    //console.log(req.body);
    const {email,password} = req.body;

    //Check empty email and password
    if (!email || !password) return res.render('login');

    try {
        const [data] = await checkemail(email);
        //console.log(data);

        const checkpass = await checkpassword(data.password,password);
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
            res.render('login');
        }
    } catch (error) {
        res.render('login');
    }
}

export const medata = (req,res) =>{
    if(!req.user) return res.send('You are not loggedIn');

    return res.send(`Hello ${req.user.name}. Your email is ${req.user.email}`);
}