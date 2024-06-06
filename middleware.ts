import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";
import { logMiddleware } from "./middlewares/api/logMiddleware";

export const config = {
    matcher:"/api/:path",
};

export default function middleware(request:NextRequest){

    if(request.url.includes("/api/blogd")){
        const logResult = logMiddleware(request);
        console.log(logResult.response)
    }
    
    const authResult = authMiddleware(request);

    if(!authResult?.isValid){
        return new NextResponse(JSON.stringify({message:"unauthorized"}),{
            status:401
        })
    }
    return NextResponse.next();
}