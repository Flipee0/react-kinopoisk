import {Route, Routes, useLocation} from "react-router-dom";
import {Catalog} from "./Catalog";
import { MovieInfo } from "./MovieInfo/";
import {AnimatePresence} from "framer-motion";

export const Routing = () => {
    const location = useLocation()

    return (
        <AnimatePresence mode={"wait"}>
            <Routes location={location} key={location.pathname}>
                <Route path={"/"} Component={Catalog} />
                <Route path={"/movie/:id"} Component={MovieInfo} />
            </Routes>
        </AnimatePresence>
    );
};
