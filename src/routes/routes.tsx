import React from "react";
import { BrowserRouter, Outlet, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Auth from "pages/auth";
import { AuthGuard } from "./auth/authGuard";
import Home from "pages/home/home";
import { Root } from "components/root/root";

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
