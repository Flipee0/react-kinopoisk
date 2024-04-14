import {Avatar, Box, Chip, Grid, Typography} from '@mui/material';
import React from 'react';
import {IMovieShortData} from "../models/IMovieShortData";
import Image from "shared/ui/Image/Image"
import { green } from '@mui/material/colors';
import firstUpper from "shared/helpers/firstUpper";
import MovieTypes from "shared/models/MovieTypes";

type Props = {
    data: IMovieShortData
}

export const MoviePreview = ({data}: Props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={1} md={2} sm={3} sx={{
                position: "relative",
                width: "100%"
            }}>
                <Image
                    src={data.poster.previewUrl}
                    alt={`Постер фильма ${data.name}`}
                    width={667}
                    height={1000}
                    sx={{
                        height: "auto",
                        width: "100%",
                        borderRadius: "10px"
                    }}
                />
                {data.rating.kp &&
                    <Avatar sx={{
                        bgcolor: green[500],
                        position: "absolute",
                        top: 8,
                        left: 8,
                    }}>
                        {Math.round(data.rating.kp)}
                    </Avatar>
                }
            </Grid>
            <Grid item xs={12} lg={11} md={10} sm={9}>
                <Typography
                    variant={"h5"}
                    sx={theme => ({
                        [theme.breakpoints.down("sm")]: {
                            textAlign: "center"
                        }
                    })}
                >
                    {data.name}
                </Typography>
                <Typography sx={{
                    opacity: "50%"
                }}>
                    {[
                        data.alternativeName, MovieTypes[data.type as keyof typeof MovieTypes], data.year,
                        data.countries[0].name, data.movieLength === null ? null : `${data.movieLength} мин`,
                        data.ageRating === null ? null : `${data.ageRating}+`
                    ].filter(info => info !== null).join(" • ")}
                </Typography>
                <Typography
                    variant={"body1"}
                    sx={{
                        marginY: "0.5em"
                    }}
                >
                    {data.shortDescription}
                </Typography>
                <Box sx={{
                    display: "flex",
                    gap: "0.5em",
                    flexWrap: "wrap"
                }}>
                    {data.genres.map((genre, index) =>
                        <Chip key={index} label={firstUpper(genre.name)} variant={"outlined"}/>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};
