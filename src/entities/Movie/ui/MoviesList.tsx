import React from 'react';
import {MoviePreview} from "./MoviePreview";
import { motion } from 'framer-motion';
import {useNavigate, useSearchParams} from "react-router-dom";
import {IMovieShortData} from "../models/IMovieShortData";
import {redirectMovieDataStore} from "../models/RedirectMovieDataStore";
import AnimatedList from "shared/ui/AnimatedList/AnimatedList";
import InfoBlock from "shared/ui/InfoBlock/InfoBlock";

type Props = {
    data: IMovieShortData[]
}

export const MoviesList = ({data}: Props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const handleListItemClick = (movie: IMovieShortData) => {
        redirectMovieDataStore.queryParams = searchParams.toString()
        redirectMovieDataStore.setData(movie)
        return navigate(`/movie/${movie.id}`)
    }

    return (
        <AnimatedList>
            {data.map(movie => (
                <motion.button
                    key={movie.id}
                    whileHover={{ scale: 1.01 }}
                    style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        textAlign: "left"
                    }}
                    onClick={() => handleListItemClick(movie)}
                >
                    <InfoBlock>
                        <MoviePreview data={movie}/>
                    </InfoBlock>
                </motion.button>
            ))}
        </AnimatedList>

    );
};
