import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Contact from "./components/Pages/Contact/Contact.jsx"
import Gallery from "./components/Pages/MainGallery/Gallery.jsx"
import About from "./components/Pages/About/About.jsx"
import TourPackage from "./components/Pages/TourPackage/TourPackage.jsx"
import Destination from "./components/Pages/Destination/Destination.jsx"
import Login from "./components/Pages/Login-Signup/Login.jsx";
import TourDetail from "./components/Pages/TourPackage/TourDetail.jsx";
import ThankYou from "./components/Pages/Thankyou/ThankYou.jsx";
import Signup from "./components/Pages/Login-Signup/Signup.jsx";
import Terms from "./components/Pages/Terms&Conditions/Terms.jsx";
import Policy from "./components/Pages/PrivacyPolicy/Policy.jsx";
import SearchResult from "./components/Pages/SearchResult/SearchResult.jsx";
import AllDestinations from "./components/Pages/Destination/AllDestinations.jsx";
// Admin
import AdmApp from "./components/Admin/Home/AdmApp.jsx";
import AllTours from "./components/Admin/Pages/tours/AllTours.jsx";
import AddTours from "./components/Admin/Pages/tours/AddTours.jsx";
import Users from "./components/Admin/Pages/Users.jsx";
import AllBookings from "./components/Admin/Pages/AllBookings.jsx";
import AdmHome from "./components/Admin/Home/AdmHome.jsx";
import EditTour from "./components/Admin/Pages/tours/EditTour.jsx";
import AddImg from "./components/Admin/Pages/gallery/AddImg.jsx";
import AllImg from "./components/Admin/Pages/gallery/AllImg.jsx";
import Query from "./components/Admin/Pages/Query.jsx";
import UserDashboard from "./components/Pages/UserDashboard/UserDashboard.jsx";




const router = createBrowserRouter(
  [
    //user panel
    {
      path: '/', element: <App />, children: [
        { path: '/', element: <Home /> },
        { path: '/search', element: <SearchResult /> },
        { path: '/signup', element: <Signup /> },
        { path: '/login', element: <Login /> },
        { path: '/contact', element: <Contact /> },
        { path: '/gallery', element: <Gallery /> },
        { path: '/about', element: <About /> },
        { path: '/tour', element: <TourPackage /> },
        { path: '/tour-details/:id', element: <TourDetail /> },
        { path: '/all-destinations', element: <AllDestinations /> },
        { path: '/destination/:destinationName', element: <Destination /> },
        { path: '/user-dashboard/', element: <UserDashboard /> },
        { path: '/thank-you', element: <ThankYou /> },
        { path: '/terms', element: <Terms /> },
        { path: '/policy', element: <Policy /> }

      ]
    },
    //admin panel
    {
      path: '/Admin', element: <AdmApp />, children: [
        { path: '', element: <AdmHome /> },
        { path: '/Admin/all-tours', element: <AllTours /> },
        { path: '/Admin/add-tour', element: <AddTours /> },
        { path: '/Admin/edit-tour/:id', element: <EditTour /> },
        { path: '/Admin/add-image', element: <AddImg /> },
        { path: '/Admin/all-images', element: <AllImg /> },
        { path: '/Admin/users', element: <Users /> },
        { path: '/Admin/users-query', element: <Query /> },
        { path: '/Admin/all-bookings', element: <AllBookings /> }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
