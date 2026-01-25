import { useEffect, useState } from "react"


const useFetch=<T>(fetchFn:()=>Promise<T>, autoFetch=true)=>{

    const [data, setData]=useState<T | null>(null)
    const [error, setError]=useState<Error | null>(null)
    const [loading ,setLoading]=useState(false)


    const fetchData=async()=>{


        try {
     
            setLoading(true)
            setError(null)
            
            const data=await fetchFn()

 

          

            //@ts-ignore
            setData(data)
            

           //@ts-ignore 
        } catch (err) {
            setError(err instanceof Error ? err:new Error("An Error occurred"))
        }finally{
            setLoading(false)
        }


        
        
    }
    
    const reset=()=>{
        setLoading(false)
        setError(null)
        setData(null)
    }

    useEffect(()=>{
        if(autoFetch){
            fetchData()
        }
    },[])


    return {data, error, loading, refetch:fetchData, reset}


}


export default useFetch