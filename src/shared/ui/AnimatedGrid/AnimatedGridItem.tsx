import React from 'react';
import {motion} from "framer-motion";
import {Grid, GridOwnProps} from "@mui/material";

const AnimatedGridItem = (props: GridOwnProps) => {
    const MotionGrid = motion(Grid)

    return (
        <MotionGrid
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
            {...props}
            item
        >
            {props.children}
        </MotionGrid>
    );
};

export default AnimatedGridItem;
