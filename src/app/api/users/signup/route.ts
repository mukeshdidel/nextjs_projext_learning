import {connect} from '@/app/dbConfig/dbConfig';
import UserModel from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


connect();


export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        // check if user already exists
        const user = await UserModel.findByEmail({email})
        if(user){
            return NextResponse.json({error: "user already exists"}, {status: 400})
        }

        const hasshedPassword = await bcryptjs.hash(password, 10);

        const userId = await UserModel.create({
            username: username,
            email: email,
            password: hasshedPassword,
        })

        return NextResponse.json({
            message: "user created successfuly",
            success: true,
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}