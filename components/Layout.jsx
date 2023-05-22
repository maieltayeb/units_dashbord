import Head from "next/head"
import Navbar from "./Navbar"
import { useRouter } from "next/router";

import Error from "@/pages/404";



export default function Layout (props) {
    const router = useRouter();
  return (
    <>
{router.pathname !== "/404" ? <> 
     <Navbar />

   {props.children}
    <footer></footer></>:<Error />}
   
    </>
  )
}