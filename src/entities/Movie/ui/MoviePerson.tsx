import React from 'react';
import IMoviePersonData from "../models/InfoParts/IMoviePersonData";
import {Stack, Typography} from "@mui/material";
import Image from "shared/ui/Image/Image";

type Props = {
    person: IMoviePersonData
}

export const MoviePerson = ({person}: Props) => {
    return (
        <Stack sx={{width: "100%"}}>
            <Image
                src={person.photo}
                alt={`Фото ${person.name}`}
                sx={{borderRadius: "10px"}}
            />
            <Typography variant={"h6"} textAlign={"center"}>
                {person.name}
            </Typography>
            <Typography textAlign={"center"} sx={{opacity: "50%", fontStyle: "italic"}}>
                {person.enName}
            </Typography>
            {person.description &&
                <Typography>
                    В роли: {person.description}
                </Typography>
            }
        </Stack>
    );
};
