import React from "react"
import SideBar from "./SideBar";

const DashboardLayout = ({children}) =>{
 return (
     <div className={"grid lg:grid-cols-[350px,lfr] h-screen maz-f-screen"}>
       <section>
         <SideBar />
       </section>
       {children}
     </div>
 );
};

export default DashboardLayout