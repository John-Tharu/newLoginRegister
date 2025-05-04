import { Router } from "express";
import { home, login, register, signup } from "../controller/controller.js";

const router = Router();

router.get('/', home);

router.get('/login', login);

router.route('/register').get(register).post(signup);

export const routerdata = router;