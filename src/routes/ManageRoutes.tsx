import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {
  HeroPage,
  WherePage,
  RSVPPage,
} from "features";

export const ManageRoutes = () => {
    return (
        <Routes>
            <Route index element={<HeroPage/>}/>
            <Route path='/where' element={<WherePage/>}/>
            <Route path='/rsvp' element={<RSVPPage/>}/>
        </Routes>
    );
}