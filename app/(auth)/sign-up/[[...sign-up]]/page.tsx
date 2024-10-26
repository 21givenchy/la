"use client"

import { SignUp } from "@clerk/nextjs";


export default function SignUpPage() {
   
 

    return (
        
            <div className="pt-20 flex min-w-screen justify-center my-[5rem]">
                <SignUp />
            </div>
        
    );
}