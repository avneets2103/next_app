import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

async function connecting(){
    console.log("Inside Connecting")
    await connect()
    console.log("Ending Connecting")
}
connecting();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        // check exsistence
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User doesnt exsist"}, {status: 400})
        }
        
        // check password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        // token usage now
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login Success",
            success: true,
            username: user.username,
        })
        response.cookies.set("token", token, {httpOnly: true,})
        return response;
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}