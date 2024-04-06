import { Router } from "express";
import { registration, loginUser } from "../Registr_&_Auth/Regist_&_Auth";



const UserRoute = Router();

UserRoute.post('/register', registration);
UserRoute.post('/login', loginUser);

export { UserRoute };

