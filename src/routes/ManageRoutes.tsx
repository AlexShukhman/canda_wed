import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {
  HeroPage,
  WhereWhenPage,
  RSVPPage,
  DetailsPage,
  RegistryPage,
} from "features";

export const ManageRoutes = () => {
    return (
        <Routes>
            <Route index element={<HeroPage/>}/>
            <Route path='/where_when' element={<WhereWhenPage/>}/>
            <Route path='/rsvp' element={<RSVPPage/>}/>
            <Route path='/details' element={<DetailsPage/>}/>
            <Route path='/registry' element={<RegistryPage/>}/>
        </Routes>
    );
}