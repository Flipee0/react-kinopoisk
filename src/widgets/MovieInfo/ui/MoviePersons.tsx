import React from 'react';
import IMoviePersonData from "entities/Movie/models/InfoParts/IMoviePersonData";
import {MoviePerson} from "entities/Movie";
import {Box, Typography, useTheme} from "@mui/material";
import InfoBlock from "shared/ui/InfoBlock/InfoBlock";
import firstUpper from "shared/helpers/firstUpper";
import AnimatedList from "shared/ui/AnimatedList/AnimatedList";

type Props = {
    persons?: IMoviePersonData[]
}

const MoviePersons = ({persons}: Props) => {
    const theme = useTheme()

    if (persons === undefined) {
        return (
            <Typography>
                Нет информации о людях
            </Typography>
        )
    }
    return (
        <AnimatedList>
            {
                Object.entries(persons.reduce((groups: {[key: string]: IMoviePersonData[]}, person) => {
                    const key = person.profession as keyof Object
                    if (groups[key] === undefined) {
                        groups[key] = []
                    }
                    groups[key].push(person)
                    return groups
                }, {})).map(group => (
                    <Box key={group[0]}>
                        <InfoBlock sx={{marginBottom: "1em"}}>
                            <Typography variant={"h5"} textAlign={"center"}>{firstUpper(group[0])}</Typography>
                        </InfoBlock>
                        <AnimatedList
                            ulSx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                                [theme.breakpoints.down("xl")]: {
                                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                                },
                                [theme.breakpoints.down("md")]: {
                                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                },
                                [theme.breakpoints.down("sm")]: {
                                    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                                },
                                gap: "1em"
                            }}
                            liSx={{
                                height: "100%"
                            }}
                        >
                            {group[1].map(person => (
                                <InfoBlock key={person.id} sx={{height: "100%"}}>
                                    <MoviePerson person={person}/>
                                </InfoBlock>
                            ))}
                        </AnimatedList>
                    </Box>
                ))
            }
        </AnimatedList>
    );
};

export default MoviePersons;
