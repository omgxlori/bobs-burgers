import { useEffect, useState } from 'react';
import { MenuApi, Configuration } from '../api';
import type { Menu } from '../api';

const SpecialtyBurgersSection = () => {
  const [specialtyBurgers, setSpecialtyBurgers] = useState<Menu[]>([]);

  useEffect(() => {
    const api = new MenuApi(new Configuration({ basePath: 'http://localhost:8000' }));

      api.menuList().then((items) => {
    const filtered = items.filter(
  (item) => item.category?.toLowerCase() === 'specialty burger'
);
    setSpecialtyBurgers(filtered);
  });
}, []);

  return (
    <div className="specialty-burger-section">
        <h2>Specialty Burgers</h2>
      <ul className="menu-list">
        {specialtyBurgers.map((specialtyBurger) => (
          <li key={specialtyBurger.id} className="menu-item">
            <span className="item-name">{specialtyBurger.name}</span>
            <span className="dots"></span>
            <span className="item-price">${Number(specialtyBurger.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialtyBurgersSection;
