import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HeroPage} from "features/hero";

export const ManageRoutes = () => {
    return (
        <Routes>
            <Route index element={<HeroPage/>}/>
        </Routes>
    );
}