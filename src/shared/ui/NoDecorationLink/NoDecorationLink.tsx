import React from 'react';
import { Link, To } from 'react-router-dom';
import {styled, SxProps} from "@mui/material";

type Props = {
    to: To,
    children: React.ReactNode | React.ReactNode[]
    sx?: SxProps
}

const NoDecorationLink = ({to, children, sx}: Props) => {
    const StyledLink = styled(Link)(({ theme }) => ({
        textDecoration: "none",
        color: theme.palette.text.primary
    }))

    return (
        <StyledLink
            to={to}
            sx={sx}
        >
            {children}
        </StyledLink>
    );
};

export default NoDecorationLink;
