import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import Enquiries from "./pages/Enquiries";
import MainLayout from "./components/MainLayout";
import Bloglist from "./pages/Bloglist";
import Blogcatelist from "./pages/Blogcatelist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcate from "./pages/Addblogcate";
import Addcolor from "./pages/Addcolor";
import Addcate from "./pages/Addcate";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Addcoupon from "./pages/Addcoupon";
import Couponlist from "./pages/Couponlist";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="list-coupon" element={<Couponlist />} />
          <Route path="coupon" element={<Addcoupon />} />
          <Route path="list-blog" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="list-blog-category" element={<Blogcatelist />} />
          <Route path="blog-category" element={<Addblogcate />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcate />} />
          <Route path="category/:id" element={<Addcate />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
