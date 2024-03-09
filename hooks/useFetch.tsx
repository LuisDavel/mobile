import { api } from "@/util/axios/axios"
import React from "react"

type TUseFetch<T>  = {
    url: string
}

export function useFetch<T>({ url }: TUseFetch<T>) {
    const [ isLoading, setLoading ] = React.useState(true)
    const [ data, setData ] = React.useState<T  | []>([])

    async function fetch() {
        try {
          const res = await api.get(url);
          if(res.status == 200) {
            setLoading(false);
            console.log(res.data)
            return setData(res.data as T); // Set data to res.data
          }
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
      }

    React.useEffect(() => {
      fetch()
    }, [isLoading])
    
    function refetch(){
        return fetch()
    }

    return { isLoading, data, refetch}
}