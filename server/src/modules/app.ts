import express, { Request, Response, NextFunction } from "express"
import morgan from "morgan"
import cors from "cors"
import router from "./router";
import userRouter from "../models/user/user.router"
import propertyRouter from "../models/property/property.router";
import zoneRouter from "../models/zone/zone.router";
import propertyMemberRouter from "../models/propertyMember/propertyMember.router";

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/", [
    router,
    userRouter,
    propertyRouter,
    zoneRouter,
    propertyMemberRouter
])


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(400).json({message: err.message})
});


export default app
