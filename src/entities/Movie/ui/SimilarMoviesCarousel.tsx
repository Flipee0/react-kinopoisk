import React, {memo, useState} from 'react';
import {Carousel} from "shared/ui/Carousel";
import Image from "shared/ui/Image/Image";
import ISimilarMovie from "../models/InfoParts/ISimilarMovie";
import {Avatar, Box, Button, Stack, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import NoDecorationLink from "shared/ui/NoDecorationLink/NoDecorationLink";

type Props = {
    movies: ISimilarMovie[]
}

export const SimilarMoviesCarousel = memo(({movies}: Props) => {
    const [index, setIndex] = useState(0)

    const handleItemChange = (newIndex: number) => {
        setIndex(newIndex)
    }

    return (
        <Carousel
            index={index}
            onChange={handleItemChange}
            autoplayDelayMs={5000}
        >
            {movies.map(movie => (
                <Stack key={movie.id} width={"100%"} height={"100%"} spacing={1} alignItems={"center"}>
                    <Box position={"relative"} minHeight={0} maxWidth={"100%"}>
                        <Image src={movie.poster.url} sx={{maxWidth: "100%", maxHeight: "100%", borderRadius: "20px"}}/>
                        {movie.rating && movie.rating.kp &&
                            <Avatar sx={{
                                bgcolor: green[500],
                                position: "absolute",
                                top: 8,
                                left: 8,
                            }}>
                                {Math.round(movie.rating.kp)}
                            </Avatar>
                        }
                    </Box>
                    <Typography variant={"h6"} textAlign={"center"}>{movie.name} {movie.year ? `(${movie.year})` : ""}</Typography>
                    <NoDecorationLink to={`/movie/${movie.id}`} sx={{pointerEvents: "auto"}}>
                        <Button variant={"outlined"}>
                            Смотреть
                        </Button>
                    </NoDecorationLink>
                </Stack>
            ))}
        </Carousel>
    );
});
