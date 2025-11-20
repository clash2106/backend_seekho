import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
    //for the middleware add it before the main function in the routes
    upload.fields([
        {
            name:"avatar",
            maxcount:1
        },
        {
            name:"coverImage",
            maxcount:1
        }
    ]),
    registerUser
)




export default router