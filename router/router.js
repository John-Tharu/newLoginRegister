import { Router } from "express";
import { about, contact, home, login, logindata, register, signup } from "../controller/controller.js";

const router = Router();

router.get('/', home);

router.route('/login').get(login).post(logindata);

router.get('/about', about);

router.get('/contact', contact);

router.route('/register').get(register).post(signup);

export const routerdata = router;