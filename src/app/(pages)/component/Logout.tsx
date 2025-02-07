'use client'

import { LogOutAction } from "@/action/logoutAction";



 
export default function Logout() {
    return (
        <a
               onClick={()=>LogOutAction()}
                href="/"
                className="text-red-700 text-2xl hover:text-white transition duration-300"
              >
                Logout
              </a>
    );
}