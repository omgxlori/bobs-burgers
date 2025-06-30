import { useEffect, useState } from 'react';
import { MenuApi, Configuration } from '../api';
import type { Menu } from '../api';

const SideDishesSection = () => {
  const [side, setSide] = useState<Menu[]>([]);

  useEffect(() => {
    const api = new MenuApi(new Configuration({ basePath: 'http://localhost:8000' }));

      api.menuList().then((items) => {
    const filtered = items.filter(
      (item) => item.category?.toLowerCase() === 'side'
    );
    setSide(filtered);
  });
}, []);

  return (
    <div className="side-dishes-section">
        <h2>Side Dishes</h2>
      <ul className="menu-list">
        {side.map((side) => (
          <li key={side.id} className="menu-item">
            <span className="item-name">{side.name}</span>
            <span className="dots"></span>
            <span className="item-price">${Number(side.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideDishesSection;
