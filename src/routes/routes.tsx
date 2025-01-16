import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Auth from "pages/auth";
import { AuthGuard } from "./auth/authGuard";
import { Box } from "@chakra-ui/react";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<Auth />} />
            <Route path="/" element={<Box />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
