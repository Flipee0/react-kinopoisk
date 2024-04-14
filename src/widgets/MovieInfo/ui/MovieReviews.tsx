import React from 'react';
import {useInfiniteQuery} from "@tanstack/react-query";
import getMovieReviews from "../api/getMovieReviews";
import {ReviewsList} from "entities/Reviews";
import {CircularProgress, Stack, Typography} from "@mui/material";
import InfoBlock from "shared/ui/InfoBlock/InfoBlock";
import InfiniteScroll from "shared/ui/InfiniteScroll/InfiniteScroll";
import Error from "shared/ui/Error/Error";

type Props = {
    movieId: number
}

const MovieReviews = ({movieId}: Props) => {
    const query = useInfiniteQuery({
        queryKey: ["reviews", movieId],
        queryFn: async ({pageParam}) => await getMovieReviews(movieId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.docs.length === 0) {
                return undefined
            }
            return ++lastPageParam
        },
        refetchOnWindowFocus: false
    })

    return (
        <Stack sx={{width: "100%"}} spacing={"1em"}>
            <InfoBlock>
                <Typography variant={"h5"} textAlign={"center"}>
                    Отзывы
                </Typography>
            </InfoBlock>
            {query.isLoading && <CircularProgress/>}
            {query.isError && <Error retryFn={query.refetch}/>}
            {query.data &&
                <InfiniteScroll {...query}>
                    {query.data.pages.map(page => (
                        <ReviewsList key={page.page} reviews={page.docs}/>
                    ))}
                </InfiniteScroll>
            }
        </Stack>
    );
};

export default MovieReviews;
