import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuComponent from './components/Menu';
import HomeView from './views/HomeView';
import VideoIntro from './components/VideoIntro';
import OrderNow from './components/OrderNow';
import { useEffect, useState } from 'react';
import { MenuApi, Configuration } from './api';
import type { MenuItem } from './components/OrderNow';
import type { Cart } from './api/models';
import CheckoutView from "./views/CheckoutView";


function AppContent() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(location.pathname === '/');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [user, setUser] = useState<{ email: string } | null>(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

//   const refreshCart = async () => {
//   try {
//     const api = new CartApi(new Configuration({ basePath: 'http://localhost:8000' }));
//     const data = await api.menuCartList();
//     setCart(data); // This will update the shared cart
//   } catch (error) {
//     console.error('Failed to fetch cart:', error);
//   }
// };

  // Hide intro video on non-home routes
  useEffect(() => {
    if (location.pathname !== '/' && showIntro) {
      setShowIntro(false);
    }
  }, [location.pathname, showIntro]);


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const api = new MenuApi(new Configuration({ basePath: 'http://localhost:8000' }));
        const data = await api.menuList();
        setMenuItems(data as unknown as MenuItem[]);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <div className="hero" />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeView />
              {showIntro && <VideoIntro onFinish={() => setShowIntro(false)} />}
            </>
          }
        />
        <Route path="/menu" element={<MenuComponent />} />
  <Route
  path="/order"
  element={
    <OrderNow
      menuItems={menuItems}
      cart={cart}   
      setCart={setCart} 
    />
  }
/>
  <Route
  path="/checkout"
  element={
    <CheckoutView
      cart={cart}            
      setCart={setCart}  
      user={user}
      setUser={setUser}
    />
  }
/>
</Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
