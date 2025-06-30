import '../App.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/order">Order Now</Link>
    </nav>
  );
};

export default Navbar;