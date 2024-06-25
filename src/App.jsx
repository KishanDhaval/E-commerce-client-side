import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import { useAuthContext } from "./hooks/useAuthContext"
import Dashboard from "./pages/user/Dashboard"
import PrivateRoute from "./components/routes/PrivateRoute"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import AdminRoute from "./components/routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Users from "./pages/Admin/Users"
import Orders from "./pages/user/Orders"
import Profile from "./pages/user/Profile"
import { Toaster } from 'react-hot-toast';
import Products from "./pages/Admin/Products"
import UpdateProduct from "./pages/Admin/UpdateProduct"
import Search from "./pages/Search"
import ProductDetail from "./pages/ProductDetail"
import Categories from "./pages/Categories"
import CategoryProduct from "./pages/CategoryProduct"
import CartPage from "./pages/CartPage"
import AdminOrder from "./pages/Admin/AdminOrder"
import DisableInspect from "./components/DisableInspect "


function App() {

  const { user } = useAuthContext()
  const location = useLocation()

  return (
    <>
    {/* <DisableInspect/> */}
      <Toaster />
      <Routes>
        {/* nasted route using protected route */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={ <Categories /> } />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={ <CartPage /> }/>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="user/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
          <Route path="user/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path='admin' element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path='admin/create-category' element={user ? <CreateCategory /> : <Navigate to="/login" />} />
          <Route path='admin/create-product' element={user ? <CreateProduct /> : <Navigate to="/login" />} />
          <Route path='admin/update-product/:slug' element={user ? <UpdateProduct /> : <Navigate to="/login" />} />
          <Route path='admin/product' element={user ? <Products /> : <Navigate to="/login" />} />
          <Route path='admin/users' element={user ? <Users /> : <Navigate to="/login" />} />
          <Route path='admin/orders' element={user ? <AdminOrder /> : <Navigate to="/login" />} />
        </Route>
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to={location.state || "/login"} />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to={location.state || "/"} />}
        />
        <Route path="/forgot-password" element={ !user ?<ForgotPassword />  : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App

