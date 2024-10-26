"use client"

import { SignIn } from "@clerk/nextjs";


export default function SignInPage() {
 

    return (
        
            <div className="pt-20 mt-16 flex min-w-screen justify-center my-[5rem]">
                <SignIn />
            </div>
        
    );
}