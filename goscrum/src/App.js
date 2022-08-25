import Login from "./Views/Login";
import Tasks from "./Views/Tasks";
import Error404 from "./Views/Error404";
import Register from './Views/Register'
import Registered from './Views/Registrered'

import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';

import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const RequireAuth = ({ children }) => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}

const pageTransition = {
  in: { opacity: 1 },
  out:{ opacity: 0 },
};

function App() {
  return (
    <AnimatePresence>
      <SkeletonTheme baseColor="#14142B" highlightColor="#444">
      <Routes >
        <Route
          path="GoScrum-React/"
          element={
            <RequireAuth>
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Tasks />
              </motion.div>
            </RequireAuth>
          }
        />
        <Route
          index
          path="GoScrum-React/login"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="registered/:teamID"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Registered />
            </motion.div>
          }
          />
         <Route
          index
          path="GoScrum-React/register"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Error404 />
            </motion.div>
          }
        />
      </Routes>
      </SkeletonTheme>
    </AnimatePresence>
  );
}

export default App;
