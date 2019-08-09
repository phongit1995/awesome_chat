import express  from 'express';
import {auth, Home} from '../controllers';
let router = express.Router();
let initRouter = (app)=>{
    router.get("/",Home);
    router.get("/login", auth.authLogin);
    return app.use("/",router);
}
module.exports = initRouter;