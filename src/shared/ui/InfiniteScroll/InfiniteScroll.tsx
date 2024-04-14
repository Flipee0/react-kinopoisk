import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";

type Props = {
    children: React.ReactNode | React.ReactNode[]
    fetchNextPage: () => void
    isLoading: boolean
}

const InfiniteScroll = ({children, fetchNextPage, isLoading}: Props) => {
    const triggerRef = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)

    const onObserve = ([entry]: IntersectionObserverEntry[]) => {
        setInView(entry.isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            onObserve,
            {
                threshold: 0
            }
        )
        if (triggerRef.current !== null) {
            observer.observe(triggerRef.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    return (
        <Box position={"relative"}>
            {children}
            <Box display={isLoading ? "none" : "block"} position={"absolute"} width={"100px"} bottom={"100px"} ref={triggerRef}/>
        </Box>
    );
};

export default InfiniteScroll;
