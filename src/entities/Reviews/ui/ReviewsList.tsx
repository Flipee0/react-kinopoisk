import React, {memo} from 'react';
import {IMovieReview} from "../models/IMovieReview";
import AnimatedList from "shared/ui/AnimatedList/AnimatedList";
import Review from "./Review";

type Props = {
    reviews: IMovieReview[]
}

export const ReviewsList = memo(({reviews}: Props) => {
    return (
        <AnimatedList liSx={{marginBottom: "1em"}}>
            {reviews.map(review => (
                <Review key={review.id} review={review}/>
            ))}
        </AnimatedList>
    );
});
