import burgerImage from '../assets/burger.png';
import { BurgerApi, Configuration } from '../api';
import { useEffect, useState } from 'react';
import type { BurgerOfTheDay } from '../api';
import './classes.css';

const BurgerOfTheDayComponent = () => {
  const [burger, setBurger] = useState<BurgerOfTheDay | null>(null);

  useEffect(() => {
    const api = new BurgerApi(new Configuration({ basePath: 'http://localhost:8000' }));

    api.menuBurgerOfTheDayRandomList().then(setBurger).catch(console.error);
  }, []);

  if (!burger) return <p>Loading...</p>;

  return (
    <div className="burger-of-the-day-container">
    <div className="burger-of-the-day">
      <img src={burgerImage} alt="Burger of the Day" className="burger-image" />
      <div className="burger-details">
      <h2>Burger of the Day</h2>
      <h3>{burger.name}</h3>
      <p>{burger.description}</p>
      </div>
    </div>
    <div className="price-container">
    <div className="burger-of-the-day-price">
      <h2>BURGER OF THE DAY</h2>
      <h2>$5.95</h2>
    </div>
    <div className="disclaimer">
      <p>Price includes all toppings for the day. No substituitions. Selection will change daily.</p>
      </div>
    </div>
    </div>
  );
};

export default BurgerOfTheDayComponent;
