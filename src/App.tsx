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
import { CartApi, MenuApi, Configuration } from './api';
import type { MenuItem } from './components/OrderNow';
import type { Cart } from './api/models';
import CheckoutView from "./views/CheckoutView";


function AppContent() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(location.pathname === '/');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);


  // Hide intro video on non-home routes
  useEffect(() => {
    if (location.pathname !== '/' && showIntro) {
      setShowIntro(false);
    }
  }, [location.pathname, showIntro]);

  // Fetch menu items once on load
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const api = new MenuApi(new Configuration({ basePath: 'http://localhost:8000' }));
        const data = await api.menuList(); // adjust this if your endpoint differs
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
      cart={cart}             // ✅ pass down cart
      setCart={setCart}       // ✅ pass down setter
    />
  }
/>
  <Route
  path="/checkout"
  element={
    <CheckoutView
      cart={cart}             // ✅ same here
      setCart={setCart}       // ✅
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
