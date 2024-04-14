import React, { memo } from 'react';
import {IMoviePoster} from "../models/IMoviePoster";
import {Carousel} from "shared/ui/Carousel";
import Image from "shared/ui/Image/Image";

type Props = {
    posters: IMoviePoster[]
    index: number
    onChange: (newValue: number, startOffset: number, endOffset: number) => void
}

export const MoviePostersCarousel = memo(({posters, index, onChange}: Props) => {
    return (
        <Carousel
            index={index}
            onChange={onChange}
            autoplayDelayMs={5000}
        >
            {posters.map(poster => (
                <Image key={poster.id} src={poster.url}/>
            ))}
        </Carousel>
    );
});
