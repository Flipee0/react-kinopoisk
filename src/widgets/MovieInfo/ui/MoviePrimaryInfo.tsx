import React from 'react';
import {IMovieData} from "entities/Movie";
import InfoBlock from "shared/ui/InfoBlock/InfoBlock";
import {BudgetAndFees, MovieDescription, MovieRating} from "entities/Movie";
import AnimatedGrid from "shared/ui/AnimatedGrid/AnimatedGrid";
import AnimatedGridItem from "shared/ui/AnimatedGrid/AnimatedGridItem";
import SimilarMovies from "./SimilarMovies";
import {Typography} from "@mui/material";

type Props = {
    data?: IMovieData
}

const MoviePrimaryInfo = ({data}: Props) => {
    if (data === undefined) {
        return <></>
    }

    return (
        <AnimatedGrid spacing={"2em"} marginBottom={"4em"}>
            <AnimatedGridItem key={1} sm={12} md={6} lg={8}>
                <AnimatedGrid spacing={"2em"}>
                    <AnimatedGridItem key={1} xs={12}>
                        <InfoBlock>
                            <MovieDescription slogan={data.slogan} description={data.description}/>
                        </InfoBlock>
                    </AnimatedGridItem>
                </AnimatedGrid>
            </AnimatedGridItem>
            <AnimatedGridItem key={2} sm={12} md={6} lg={4}>
                <AnimatedGrid spacing={"2em"}>
                    <AnimatedGridItem key={1} xs={12}>
                        <InfoBlock>
                            <MovieRating rating={data.rating} votes={data.votes}/>
                        </InfoBlock>
                    </AnimatedGridItem>
                    <AnimatedGridItem key={2} xs={12}>
                        <InfoBlock>
                            <BudgetAndFees budget={data.budget} fees={data.fees}/>
                        </InfoBlock>
                    </AnimatedGridItem>
                </AnimatedGrid>
            </AnimatedGridItem>
            <AnimatedGridItem key={3} xs={12}>
                <InfoBlock sx={{marginBottom: "1em"}}>
                    <Typography variant={"h5"} textAlign={"center"}>Похожие фильмы</Typography>
                </InfoBlock>
                <SimilarMovies movieData={data}/>
            </AnimatedGridItem>
        </AnimatedGrid>
    );
};

export default MoviePrimaryInfo;
