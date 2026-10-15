import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import MenuLayout from "./pages/menu/MenuLayout";
import MenuList from "./pages/menu/MenuList";
import DishDetail from "./pages/menu/DishDetail";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Nested routing: /menu, /menu/:category, /menu/:category/:dishId */}
          <Route path="/menu" element={<MenuLayout />}>
            <Route index element={<MenuList />} />
            <Route path=":category" element={<MenuList />} />
            <Route path=":category/:dishId" element={<DishDetail />} />
          </Route>

          <Route path="/reservations" element={<Reservations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
