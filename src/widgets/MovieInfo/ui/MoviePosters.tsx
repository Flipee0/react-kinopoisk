import React, {useState} from 'react';
import {IMoviePoster, MoviePostersCarousel} from "entities/Posters";
import {useInfiniteQuery} from "@tanstack/react-query";
import getMoviePosters from "../api/getMoviePosters";
import {CircularProgress} from "@mui/material";
import Error from "shared/ui/Error/Error";

type Props = {
    movieId: number
}

const MoviePosters = ({movieId}: Props) => {
    const [currentImage, setCurrentImage] = useState(0)

    const {data, isLoading, isError, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: ["posters", movieId],
        queryFn: async ({pageParam}) => await getMoviePosters(movieId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.docs.length === 0) {
                return undefined
            }
            return ++lastPageParam
        },
        refetchOnWindowFocus: false
    })

    const handleImageChange = (newValue:  number, _: number, endOffset: number) => {
        setCurrentImage(newValue)
        if (endOffset < 3) {
            fetchNextPage()
        }
    }

    return (
        <>
            {isLoading && <CircularProgress/>}
            {isError && <Error retryFn={refetch}/>}
            {
                data ?
                    <MoviePostersCarousel
                        posters={([] as IMoviePoster[]).concat(...(data.pages.map(page => page.docs)))}
                        index={currentImage}
                        onChange={handleImageChange}
                    />
                    :
                    <div>Loading...</div>
            }
        </>
    );
};

export default MoviePosters;
