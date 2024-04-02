import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContextProvider from '../ContextProvider.jsx';
import PON from './PON.jsx';
import Home from './Home.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Home1 from './Home1.jsx';
import IDashboard from './IDashboard.jsx';
import AddaCls from './AddaCls.jsx';
import MyClasses from './MyClasses.jsx';
import Classes from './Classes.jsx';
import Instructors from './Instructors.jsx';
import Home2 from './Home2.jsx';
import SDashboard from './SDashboard.jsx';
import SelectedCls from './SelectedCls.jsx';
import EnrolledClss from './EnrolledClss.jsx';
import PaymentHsit from './PaymentHsit.jsx';
import Home3 from './Home3.jsx';
import ManageUsers from './ManageUsers.jsx';
import ADashboard from './ADashboard.jsx';
import ManageCls from './ManageCls.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Protected from './Protected.jsx';

const queryClient = new QueryClient();

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
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      }
    ]
  },
  {
    path: "/instructor",
    element: <Protected><Home1 /></Protected>,
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
    path: '/student',
    element: <Protected><Home2 /></Protected>,
    children: [
      {
        path: '/student/home',
        element: <SDashboard />
      },
      {
        path: '/student/selected',
        element: <SelectedCls />
      },
      {
        path: '/student/enrolled',
        element: <EnrolledClss />
      },
      {
        path: '/student/payment',
        element: <PaymentHsit />
      },
    ]
  },
  {
    path: "/admin",
    element: <Protected><Home3 /></Protected>,
    children: [
      {
        path: "/admin/home",
        element: <ADashboard />
      },
      {
        path: '/admin/manageusers',
        element: <ManageUsers />
      },
      {
        path: '/admin/manageclasses',
        element: <ManageCls />
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
       </ContextProvider>
  </React.StrictMode>,
)
