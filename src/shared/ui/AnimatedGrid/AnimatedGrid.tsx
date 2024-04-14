import React from 'react';
import {Grid, GridOwnProps} from "@mui/material";
import {motion} from "framer-motion";

const AnimatedGrid = (props: GridOwnProps) => {
    const MotionGrid = motion(Grid)

    return (
        <MotionGrid
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.3
                    }
                }}}
            {...props}
            container
        >
            {props.children}
        </MotionGrid>
    );
};

export default AnimatedGrid;
