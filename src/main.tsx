import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import {NextUIProvider} from "@nextui-org/react";
import App from './App.tsx'
import ClinicPage from "~/pages/clinic"
import LoginPage from '~/pages/Login.tsx';
import ForgotPasswordPage from './pages/ForgotPassword.tsx';
import './index.css'
import "./styles/grid.css"
import LockedPage from './pages/Locked.tsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />
  },
  {
    path: "/locked",
    element: <LockedPage />
  },
  {
    path: "/clinic/*",
    element: <ClinicPage /> ,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            className: '!p-0 !m-0',
          }}
          containerClassName="toast-container"
        />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
