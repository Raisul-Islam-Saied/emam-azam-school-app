import React, { Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { adminRoutes, routes } from "./Routes";
import DefaultLayout from "./Pages/layout/DefaultLayout";
import AdminHome from "./components/Admin/AdminHome";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import StudentInfo from "./components/Admin/StudentInfo";
import Syllabus from "./components/Syllabus";

function App() {
  const date = new Date();

  const { authLoading } = useAuth();

  return authLoading ? (
    <Loader />
  ) : (
    <div
      className={` selection:bg-purple-500 animate-loading dark:bg-slate-900 dark:text-stone-100 font-bangla text-gray-900  bg-white strokeWidth `}
    >
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/student/:student_id" element={<StudentInfo />} />
                <Route path="/syllabus" element={<Syllabus />} />
                {routes.map((routes, index) => {
                  const { path, component: Component } = routes;
                  return (
                    <Route
                      key={index}
                      path={path}
                      element={
                        <Suspense fallback={<Loader />}>
                          <Component />
                        </Suspense>
                      }
                    />
                  );
                })}
              </Routes>{" "}
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route index element={<AdminHome />} />
                  {adminRoutes.map((routes, index) => {
                    const { path, component: Component } = routes;
                    return (
                      <Route
                        key={index}
                        path={path}
                        element={
                          <Suspense fallback={<Loader />}>
                            <Component />
                          </Suspense>
                        }
                      />
                    );
                  })}
                </Route>
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={true} />
      {/* <NotFound />
      <Catagories /> */}
      {/* <Modal /> */}
      {/* <Switch1 /> */}
    </div>
  );
}

export default App;
