import React from 'react';
import {Paper} from "@mui/material";

interface Props extends React.ComponentProps<typeof Paper> {
    children: React.ReactNode | React.ReactNode[]
}

const InfoBlock = ({elevation = 2, ...props}: Props) => {
    return (
        <Paper {...props} elevation={elevation} sx={{
            borderRadius: "20px",
            padding: "1em",
            width: "100%",
            ...props.sx
        }}>
            {props.children}
        </Paper>
    );
};

export default InfoBlock;
