import {useCallback, useRef} from "react";

const useDebounce = <ARGS extends Array<any>>(callback: (...args: ARGS) => void, delay: number) => {
    const timer = useRef<NodeJS.Timeout>();

    return useCallback<(...args: ARGS) => void>((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay]);
};

export default useDebounce
