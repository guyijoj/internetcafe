// import { useEffect, useState } from "react";
// import { category,  categoryWithMenu } from "../types/cart";

// // 
// export function useMenu(){

// const [menu, setMenu] = useState<categoryWithMenu[]>([])
// const [category, setCategory] = useState<category[]>([])
// const [error, setError] = useState<null|string>(null)
// const [loading, setLoading] = useState<boolean>(false)

// useEffect(()=>{
//   async function loadMenu(){
//   try{
//    const response = await fetch("http://localhost:4000/api/menu")
//    if(!response.ok) throw new Error(`Ошибка загрузки меню - ${response.status}`)
  
//     const data  = await response.json()
//     setMenu(data)
    


//   }catch(e){
//     setError("Ошибка с соединением ")
//     console.error(e)
//   }
//   }
//   loadMenu()
// },[])





// }