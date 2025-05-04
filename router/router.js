import { Router } from "express";
import { about, contact, home, login, register, signup } from "../controller/controller.js";

const router = Router();

router.get('/', home);

router.get('/login', login);

router.get('/about', about);

router.get('/contact', contact);

router.route('/register').get(register).post(signup);

export const routerdata = router;