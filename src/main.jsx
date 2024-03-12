import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ContextProvider from '../ContextProvider.jsx';
import PON from './PON.jsx';
import Home from './Home.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import ISignin from './ISignin.jsx';
import ISignUp from './ISignUp.jsx';
import Home1 from './Home1.jsx';
import IDashboard from './IDashboard.jsx';
import AddaCls from './AddaCls.jsx';
import MyClasses from './MyClasses.jsx';
import Classes from './Classes.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/isignup",
        element: <ISignUp />,
      },
      {
        path: "/isignin",
        element: <ISignin />,
      }
    ]
  },
  {
    path: "/instructor",
    element: <Home1 />,
    children: [
      {
        path: "/instructor/home",
        element: <IDashboard />
      },
      {
        path: "/instructor/aac",
        element: <AddaCls />
      },
      {
        path: "/instructor/myclasses",
        element: <MyClasses />
      },
    ]
  },
  {
    path: "*",
    element: <PON />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ContextProvider>
       <RouterProvider router={router} />
       </ContextProvider>
  </React.StrictMode>,
)
