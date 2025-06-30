import { useEffect, useState } from 'react';
import { MenuApi, Configuration } from '../api';
import type { Menu } from '../api';

const ToppingsSection = () => {
  const [topping, setTopping] = useState<Menu[]>([]);

  useEffect(() => {
    const api = new MenuApi(new Configuration({ basePath: 'http://localhost:8000' }));

      api.menuList().then((items) => {
    const filtered = items.filter(
      (item) => item.category?.toLowerCase() === 'topping'
    );
    setTopping(filtered);
  });
}, []);

  return (
    <div className="topping-section">
        <h2>Additional Toppings</h2>
      <ul className="menu-list">
        {topping.map((topping) => (
          <li key={topping.id} className="menu-item">
            <span className="item-name">{topping.name}</span>
            <span className="dots"></span>
            <span className="item-price">${Number(topping.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToppingsSection;
