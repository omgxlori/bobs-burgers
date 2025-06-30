import { useEffect, useState } from 'react';
import { MenuApi, Configuration } from '../api';
import type { Menu } from '../api';

const BurgersSection = () => {
  const [burgers, setBurgers] = useState<Menu[]>([]);

  useEffect(() => {
    const api = new MenuApi(new Configuration({ basePath: 'http://localhost:8000' }));

      api.menuList().then((items) => {
    const filtered = items.filter(
      (item) => item.category?.toLowerCase() === 'burger'
    );
    setBurgers(filtered);
  });
}, []);

  return (
    <div className="burger-section">
      <ul className="menu-list">
        {burgers.map((burger) => (
          <li key={burger.id} className="menu-item">
            <span className="item-name">{burger.name}</span>
            <span className="dots"></span>
            <span className="item-price">${Number(burger.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurgersSection;
