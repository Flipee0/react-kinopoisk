import React from 'react';
import {motion} from "framer-motion";
import {styled, SxProps} from "@mui/material";

type Props = {
    children: (React.ReactElement | React.ReactNode)[]
    ulSx?: SxProps
    liSx?: SxProps
}

const AnimatedList = ({children, ulSx, liSx}: Props) => {
    const AnimatedUl = styled(motion.ul)({})
    const AnimatedLi = styled(motion.li)({})

    return (
        <AnimatedUl
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.3
                    }
                }}}
            sx={{
                listStyle: "none",
                width: "100%",
                padding: 0,
                margin: 0,
                ...ulSx
            }}
        >
            {(children.filter(child => child && React.isValidElement(child)) as React.ReactElement[]).map(child => (
                <AnimatedLi
                    key={child.key}
                    variants={{
                        hidden: {
                            y: -10,
                            opacity: 0
                        },
                        visible: {
                            y: 0,
                            opacity: 1
                        }
                    }}
                    sx={{marginBottom: "2em", ...liSx}}
                >
                    {child}
                </AnimatedLi>
            ))}
        </AnimatedUl>
    );
};

export default AnimatedList;
