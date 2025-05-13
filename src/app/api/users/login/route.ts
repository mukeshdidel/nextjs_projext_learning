import {connect} from '@/app/dbConfig/dbConfig';
import UserModel from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;

        const user = await UserModel.findByEmail(email);
        // checking if user exists 
        if(!user){
            return NextResponse.json({error: "user not found"}, {status: 400});
        }

        // checking if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return  NextResponse.json({error: "Invalid Password"}, {status: 400}); 
        }

        const tokenData = {
            id: user.id,
            userbame: user.username,
            email: user.email,
        }

        // creating token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "login successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            path: '/'
        })
        
        return response;

    } catch (error: any) {  
        return NextResponse.json({error: error.message}, {status: 500});
    }
}