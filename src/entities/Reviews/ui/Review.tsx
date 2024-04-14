import React from 'react';
import {IMovieReview} from "../models/IMovieReview";
import {Box, Chip, Divider, Stack, Typography} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import InfoBlock from 'shared/ui/InfoBlock/InfoBlock';
import ReviewType from "../models/ReviewType";
import { green, red } from '@mui/material/colors';

type Props = {
    review: IMovieReview
}

const Review = ({review}: Props) => {
    return (
        <InfoBlock sx={{
            backgroundColor: review.type === ReviewType.POSITIVE ?
                green[400] :
                review.type === ReviewType.NEGATIVE ?
                    red[400] :
                    undefined
        }}>
            <Stack spacing={2}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1}>
                    <Box>
                        <Typography fontWeight={"bold"}>
                            {review.author}
                        </Typography>
                        <Typography fontStyle={"italic"} sx={{opacity: "50%"}}>
                            Рейтинг {review.userRating}
                        </Typography>
                    </Box>
                    <Stack alignItems={"flex-end"} spacing={0.5}>
                        <Typography textAlign={"right"}>
                            {review.date.toLocaleString("ru", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            })}
                        </Typography>
                        {review.reviewLikes !== undefined && review.reviewDislikes !== undefined &&
                            <Stack direction={"row"} spacing={1}>
                                <Chip icon={<ThumbUpIcon />} label={"Полезно " + review.reviewLikes} sx={{paddingX: 1}}/>
                                <Chip icon={<ThumbDownIcon />} label={"Нет " + review.reviewDislikes} sx={{paddingX: 1}}/>
                            </Stack>
                        }
                    </Stack>
                </Stack>
                <Divider/>
                <Typography variant={"h6"} fontWeight={"bold"}>
                    {review.title}
                </Typography>
                <Box whiteSpace={"pre-line"}>
                    <p dangerouslySetInnerHTML={{ __html: review.review}}/>
                </Box>
            </Stack>
        </InfoBlock>
    );
};

export default Review;
