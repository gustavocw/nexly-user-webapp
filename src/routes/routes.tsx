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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
