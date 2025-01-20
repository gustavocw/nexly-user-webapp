import React from "react";
import { BrowserRouter, Outlet, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Auth from "pages/auth";
import { AuthGuard } from "./auth/authGuard";
import Home from "pages/home/home";
import { Root } from "components/root/root";
import Profile from "pages/profile";
import Course from "pages/course/modules";
import Watch from "pages/course/watch/watch";
import Favorites from "pages/favorites";
import Certificates from "pages/certificates";
import Certificate from "pages/certificates/unique";
import Tickets from "pages/tickets";

const LayoutWithRoot: React.FC = () => (
  <Root>
    <Outlet />
  </Root>
);

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<LayoutWithRoot />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/certificate/:id" element={<Certificate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
