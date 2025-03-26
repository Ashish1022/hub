// "use client"

// import { FormEvent, useState } from "react"
// import { useSignUp } from "@clerk/nextjs"
// import { useRouter } from "next/navigation"
// import SignupForm from "../_components/signup-form";
// import VerifyForm from "../_components/verify-signup-form";

// export default function SignupPage() {
//     const { isLoaded, signUp, setActive } = useSignUp();
//     const router = useRouter();
//     const [verifying, setVerifying] = useState(false);
//     const [clerkError, setClerkError] = useState("");
//     const [code, setCode] = useState("");

//     const signUpWithEmail = async ({
//         emailAddress,
//         password
//     }: {
//         emailAddress: string;
//         password: string
//     }) => {
//         if (!isLoaded) {
//             return;
//         }

//         try {
//             await signUp.create({
//                 emailAddress,
//                 password
//             });
//             await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//             setVerifying(true)
//         } catch (err: any) {
//             setClerkError(err.errors[0].message);
//         }
//     }

//     const handleVerify = async (e: FormEvent) => {
//         e.preventDefault();
//         if (!isLoaded) {
//             return;
//         }

//         try {
//             const completeSignUp = await signUp.attemptEmailAddressVerification({
//                 code,
//             });
//             if (completeSignUp.status !== "complete") {
//                 console.log(JSON.stringify(completeSignUp, null, 2));
//             }
//             if (completeSignUp.status === "complete") {
//                 await setActive({ session: completeSignUp.createdSessionId });
//                 router.push("/store");
//             }
//         } catch (err) {
//             console.log("Error:", JSON.stringify(err, null, 2));
//         }
//     }

//     return (
//         <>
//             {!verifying ?
//                 (<SignupForm signUpWithEmail={signUpWithEmail} clerkError={clerkError} />) :
//                 (<VerifyForm handleVerify={handleVerify} code={code} setCode={setCode} />)
//             }
//         </>
//     )
// }

import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <SignUp/>
  )
}

export default page