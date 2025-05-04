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

export const signup = (req,res) =>{
    console.log(req.body);
    res.render('register');
}