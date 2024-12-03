import React from "react"
import {GetSocket} from "../uitls/SocketProvider";
import {MessageCircle} from "lucide-react";

const SideBar = () =>{
 const socket = GetSocket();
 return (
     <div>
      <div className={"bg-secondary h-full py-5 flex flex-col items-center justify-center"}>
       <div>
        <div className={"w-12 h-12 flex justify-center items-center cursor-pointer text-slate-300 hover:text-slate-200 rounded"}>
         <MessageCircle size={20} />
        </div>
       </div>
      </div>
     </div>
 );
};

export default SideBar