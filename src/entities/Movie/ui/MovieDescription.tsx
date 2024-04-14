import {Stack, Typography} from '@mui/material';
import React from 'react';

type Props = {
    description?: string
    slogan?: string
}

export const MovieDescription = ({description, slogan}: Props) => {
    return (
        <Stack rowGap={1}>
            <Typography variant={"h5"} textAlign={"center"}>Описание</Typography>
            {slogan &&
                <Typography sx={{fontStyle: "italic", opacity: "50%"}}>«{slogan}»</Typography>
            }
            <Typography>{description ? description : "Описание отсутствует"}</Typography>
        </Stack>
    );
};
