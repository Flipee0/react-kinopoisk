import {useEffect, useState} from "react";

const useApiCall = <T, ARGS extends Array<any>>(fn: (...args: ARGS) => Promise<T>, ...args: ARGS) => {
    const [data, setData] = useState<T>()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fn(...args)
            .then(result => setData(result))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }, args)

    return {data, isLoading, isError}
}

export default useApiCall
