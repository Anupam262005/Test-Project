import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import HomePage from './components/pages/Home/Homepage.jsx'
import Welcome from './components/pages/Welcome/Welcome.jsx'
import Login from './components/pages/Login/Login.jsx'
import Signup from './components/pages/Signup/Signup.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import GoogleCallback from './components/GoogleCallback.jsx'
import CompleteProfile from './components/CompleteProfile.jsx'
import Dashboard from './components/pages/DashBoard/Dashborad.jsx'
import { AuthProvider } from './utils/authContext.jsx'
import Contact from './components/pages/contact/Contact.jsx'
import About from './components/pages/About/About.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path='/' element={<App />} errorElement>

            <Route index element={<HomePage />} />
            <Route path='welcome' element={<Welcome />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='verify-email' element={<VerifyEmail />} />
            <Route path='google/callback' element={<GoogleCallback />} />
            <Route path='complete-profile' element={<CompleteProfile />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='contact' element={<Contact />} />
            <Route path='about' element={<About />} />

        </Route>

    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
