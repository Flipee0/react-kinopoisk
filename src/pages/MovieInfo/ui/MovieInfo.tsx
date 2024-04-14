import React from 'react';
import {motion} from "framer-motion";
import {MovieInfoWidget} from "widgets/MovieInfo";

export const MovieInfo = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 100}}
            exit={{opacity: 0}}
            transition={{
                duration: 0.3
            }}
        >
            <MovieInfoWidget/>
        </motion.div>
    );
};
