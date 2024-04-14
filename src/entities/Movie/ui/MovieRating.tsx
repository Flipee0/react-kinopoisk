import React from 'react';
import IMovieRating from "../models/InfoParts/IMovieRating";
import {
    Grid,
    Typography
} from "@mui/material";
import convertToTriades from "shared/helpers/convertToTriades";

type Props = {
    rating: IMovieRating
    votes: IMovieRating
}

export const MovieRating = ({rating, votes}: Props) => {
    return (
        <>
            {(
                rating === null || votes === null || Object.keys(rating).every(
                    key =>
                        rating[key as keyof IMovieRating] === undefined ||
                        votes[key as keyof IMovieRating]=== undefined ||
                        votes[key as keyof IMovieRating] === 0
                )
            ) &&
                <Typography>Нет данных</Typography>
            }
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant={"h5"} sx={{textAlign: "center"}}>
                        Оценки
                    </Typography>
                </Grid>
                {!(rating.kp === undefined || votes.kp === undefined || votes.kp === 0) &&
                    <>
                        <Grid item xs={4}>
                            Кинопоиск
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                {Math.round(rating.kp * 10) / 10} баллов
                            </Typography>

                        </Grid>
                        <Grid item xs={4}>
                            {convertToTriades(votes.kp)} оценок
                        </Grid>
                    </>
                }
                {!(rating.imdb === undefined || votes.imdb=== undefined || votes.imdb === 0) &&
                    <>
                        <Grid item xs={4}>
                            IMDB
                        </Grid>
                        <Grid item xs={4}>
                            {Math.round(rating.imdb * 10) / 10} баллов
                        </Grid>
                        <Grid item xs={4}>
                            {convertToTriades(votes.imdb)} оценок
                        </Grid>
                    </>
                }
                {!(rating.tmdb === undefined || votes.tmdb === undefined || votes.tmdb === 0) &&
                    <>
                        <Grid item xs={4}>
                            TMDB
                        </Grid>
                        <Grid item xs={4}>
                            {Math.round(rating.tmdb * 10) / 10} баллов
                        </Grid>
                        <Grid item xs={4}>
                            {convertToTriades(votes.tmdb)} оценок
                        </Grid>
                    </>
                }
                {!(rating.filmCritics === undefined || votes.filmCritics === undefined || votes.filmCritics === 0) &&
                    <>
                        <Grid item xs={4}>
                            Кинокритики
                        </Grid>
                        <Grid item xs={4}>
                            {Math.round(rating.filmCritics * 10) / 10} баллов
                        </Grid>
                        <Grid item xs={4}>
                            {convertToTriades(votes.filmCritics)} оценок
                        </Grid>
                    </>
                }
                {!(rating.russianFilmCritics === undefined || votes.russianFilmCritics === undefined || votes.russianFilmCritics === 0) &&
                    <>
                        <Grid item xs={4}>
                            Российские кинокритики
                        </Grid>
                        <Grid item xs={4}>
                            {Math.round(rating.russianFilmCritics * 10) / 10} баллов
                        </Grid>
                        <Grid item xs={4}>
                            {convertToTriades(votes.russianFilmCritics)} оценок
                        </Grid>
                    </>
                }
                {!(rating.await === undefined || votes.await === undefined || votes.await === 0) &&
                    <>
                        <Grid item xs={4}>
                            Пользовательские ожидания
                        </Grid>
                        <Grid item xs={4}>
                            {Math.round(rating.await * 10) / 10} баллов
                        </Grid>
                        <Grid item xs={4}>
                            {convertToTriades(votes.await)} оценок
                        </Grid>
                    </>
                }
            </Grid>
        </>
    );
};
