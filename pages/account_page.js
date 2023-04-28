import Image from "next/image";
import Head from "next/head";
import { Inter } from "@next/font/google";
import cookies from "next-cookies";
import { useState,useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { verifyJwt } from "../utils/jwt";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

function AccountPage({user}) {
    return<div>
        <Image
            src={user.avatar || "/debut.png"}
            alt="avatar"
            width={120}
            height={120}
            className="rounded-full h-[70px] w-[70px] mb-5"
        />
        <div>
        <span className="font-Trocchi">
            {user.username}
            </span>
        <span className="text-xs">{user.email}</span>
        <span className="text-orange-800">{user.role}</span>
        </div>
        <div class="flex flex-col space-y-2">
        <form>
        <p>A quelle frequence souhaitez-vous être notifié.e par l'Applciation afin de réaliser un nouvel auto-diagnostic QVT personnelle</p>
        <div class="flex items-center space-x-2">
            <input type="radio" id="1mois" name="alerte" value="1" class="h-4 w-4 text-gray-600"/>
            <label for="1mois" class="text-gray-800 font-medium">1 mois</label>
        </div>
        <div class="flex items-center space-x-2">
            <input type="radio" id="3mois" name="alerte" value="3" class="h-4 w-4 text-gray-600"/>
            <label for="3mois" class="text-gray-800 font-medium">2 mois</label>
        </div>
        <div class="flex items-center space-x-2">
            <input type="radio" id="6mois" name="alerte" value="6" class="h-4 w-4 text-gray-600"/>
            <label for="6mois" class="text-gray-800 font-medium">6 mois</label>
        </div>
        <div class="flex items-center space-x-2">
            <input type="radio" id="12mois" name="alerte" value="12" class="h-4 w-4 text-gray-600"/>
            <label for="12mois" class="text-gray-800 font-medium">1 an</label>
        </div>
        <div class="flex items-center space-x-2">
            <input type="radio" id="jamais" name="alerte" value="1000000" class="h-4 w-4 text-gray-600"/>
            <label for="jamais" class="text-gray-800 font-medium">Option 3</label>
        </div>
        </form>
</div>

    </div>
}


export async function getServerSideProps(context){
    const token = cookies(context).token;
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        token: token,
        },
    });
    let userResponseJson = { data: {} };
    if (userResponse.ok) {
        userResponseJson = await userResponse.json();
    }
    return {
        props: {user: userResponseJson.data }, 
      };
}

export default AccountPage