import { useEffect, useState } from 'react';
import { MenuApi, Configuration } from '../api';
import type { Menu } from '../api';

const DrinkSection = () => {
  const [drink, setDrink] = useState<Menu[]>([]);

  useEffect(() => {
    const api = new MenuApi(new Configuration({ basePath: 'http://localhost:8000' }));

      api.menuList().then((items) => {
    const filtered = items.filter(
      (item) => item.category?.toLowerCase() === 'drink'
    );
    setDrink(filtered);
  });
}, []);

  return (
    <div className="drink-section">
        <h2>Drinks</h2>
      <ul className="menu-list">
        {drink.map((drink) => (
          <li key={drink.id} className="menu-item">
            <div className="item-details">
            <span className="item-name">{drink.name}</span>
            {drink.description && (
              <p className="item-description">{drink.description}</p>  
            )}
            <span className="dots"></span>
            <span className="item-price">${Number(drink.price).toFixed(2)}</span>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkSection;
