import React from 'react';
import {CatalogWidget} from "widgets/Catalog";
import {motion} from "framer-motion";

export const Catalog = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 100}}
            exit={{opacity: 0}}
            transition={{
                duration: 0.3
            }}
        >
            <CatalogWidget/>
        </motion.div>
    );
};
