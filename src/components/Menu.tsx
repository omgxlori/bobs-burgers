import { bobsBurgersLogo, bobsBurgersFamily } from "../assets";
import BurgerOfTheDayComponent from './BurgerOfTheDay';
import BurgersSection from './Burgers';
import ToppingsSection from './Toppings';
import SideDishesSection from './SideDishes';
import DrinkSection from './Drinks';
import SpecialtyBurgersSection from './SpecialtyBurgers';

const MenuComponent = () => {
  return (
    <div className="menu-container">
      <img src={bobsBurgersLogo} alt="Bob's Burgers Logo" className="logo" />
      <div className="about-bobs-burgers">
        Bob's Burgers started as a small family restaurant in January 2011. Bob's Burgers has been frequently mentioned on the news and featured in Coasters magazine. In 2014, Bob's Burgers came in second place in the Best Burger Taste-Off at the Wharf It Down Food Festival.
      </div>
      <BurgerOfTheDayComponent />
      <BurgersSection />
      <div className="toppings-and-sides">
        <div className="left-column">
          <ToppingsSection />
          <DrinkSection />
        </div>
        <div className="right-column">
          <SideDishesSection />
          <img src={bobsBurgersFamily} alt="Bob's Burgers Family" className="family" />
        </div>
      </div>
      <div>
        <SpecialtyBurgersSection />
      </div>
    </div>
  );
};

export default MenuComponent;
