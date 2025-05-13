import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/models/userModel";
import {connect} from '@/app/dbConfig/dbConfig';

connect();

export async function GET(req : NextRequest){
    try {
        const userId = await getDataFromToken(req);
        const user = await UserModel.findByUserId(userId);
        delete user.password;

        return NextResponse.json({
            message:"user found",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400 })
    }
}
