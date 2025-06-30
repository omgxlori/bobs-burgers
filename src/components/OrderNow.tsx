import React, { useState, useEffect } from "react";
import { CartApi, Configuration } from "../api";
import type { Cart } from "../api/models";
import "./OrderNow.css";
import MyCart from "./MyCart";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity?: number;
  toppings?: MenuItem[];
};

type OrderNowProps = {
  menuItems: MenuItem[];
  cart: Cart[]; // ✅ correct
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
};


const OrderNow = ({ menuItems, cart, setCart }: OrderNowProps) => {
  const [selectedBurger, setSelectedBurger] = useState<MenuItem | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<MenuItem[]>([]);
  const [selectedFlavorItem, setSelectedFlavorItem] = useState<MenuItem | null>(
    null
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSimpleItem, setSelectedSimpleItem] = useState<MenuItem | null>(
    null
  );
  const [showCartModal, setShowCartModal] = useState(false);

  const api = new CartApi(
    new Configuration({ basePath: "http://localhost:8000" })
  );

  const handleBurgerClick = (burger: MenuItem) => {
    setSelectedBurger(burger);
    setSelectedToppings([]);
    setQuantity(1);
  };

  const handleToppingToggle = (topping: MenuItem) => {
    setSelectedToppings((prev) =>
      prev.find((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const handleConfirmBurgerOrder = () => {
    if (selectedBurger) {
      api
        .menuCartCreate({
          data: {
            menuItemId: selectedBurger.id,
            quantity,
            toppingIds: new Set(selectedToppings.map((t) => t.id)),
          },
        })
        .then(() => {
          console.log("Burger added to cart");
          refreshCart(); // ✅ Add this
        })
        .catch(console.error);
    }
    setSelectedBurger(null);
    setSelectedToppings([]);
    setQuantity(1);
  };

  const handleConfirmFlavorOrder = () => {
    if (selectedFlavorItem && selectedFlavor) {
      api
        .menuCartCreate({
          data: {
            menuItemId: selectedFlavorItem.id,
            quantity,
            selectedOption: selectedFlavor,
          },
        })
        .then(() => {
          console.log("Drink with flavor added");
          refreshCart(); // ✅ Add this
        })
        .catch(console.error);
    }
    setSelectedFlavorItem(null);
    setSelectedFlavor("");
    setQuantity(1);
  };

  const toTitleCase = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const groupByCategory = (items: MenuItem[]) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  };

  const groupedItems = groupByCategory(menuItems);
  const toppings = groupedItems["topping"] || [];

  const categoryLabels: Record<string, string> = {
    burger: "Burgers",
    specialty: "Specialty Burgers",
    side: "Side Dishes",
    drink: "Drinks",
  };

  const refreshCart = () => {
    api.menuCartList().then(setCart).catch(console.error);
  };

  useEffect(() => {
    refreshCart(); // on mount
  }, []);

  return (
    <div className="order-now-container">
      <h2>Order Now</h2>
      {Object.entries(groupedItems).map(([category, items]) => {
        if (category === "topping") return null;

        return (
          <div key={category} className="category-section">
            <h3 className="category-title">
              {categoryLabels[category] || toTitleCase(category)}
            </h3>
            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item-card">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                  <button
                    onClick={() => {
                      if (
                        ["burger", "specialty burger"].includes(item.category)
                      ) {
                        handleBurgerClick(item);
                      } else if (
                        ["Fountain Soda", "Milkshake", "Canned Beer"].includes(
                          item.name
                        )
                      ) {
                        setSelectedFlavorItem(item);
                        setSelectedFlavor("");
                        setQuantity(1);
                      } else {
                        setSelectedSimpleItem(item);
                        setQuantity(1);
                      }
                    }}
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Burger Toppings Modal */}
      {selectedBurger && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Choose Toppings for: {selectedBurger.name}</h3>
            <div className="topping-options">
              {toppings.map((topping) => (
                <label key={topping.id}>
                  <input
                    type="checkbox"
                    checked={selectedToppings.some((t) => t.id === topping.id)}
                    onChange={() => handleToppingToggle(topping)}
                  />
                  {topping.name} (+${topping.price})
                </label>
              ))}
            </div>
            <div className="quantity-wrapper">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  –
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="modal-buttons">
              <button onClick={handleConfirmBurgerOrder}>Confirm</button>
              <button onClick={() => setSelectedBurger(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Flavor Modal */}
      {selectedFlavorItem && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Choose a flavor for: {selectedFlavorItem.name}</h3>
            <div className="flavor-options">
              {selectedFlavorItem.description.split(",").map((flavor) => (
                <label key={flavor.trim()}>
                  <input
                    type="radio"
                    name="flavor"
                    value={flavor.trim()}
                    checked={selectedFlavor === flavor.trim()}
                    onChange={() => setSelectedFlavor(flavor.trim())}
                  />
                  {flavor.trim()}
                </label>
              ))}
            </div>
            <div className="quantity-wrapper">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  –
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="modal-buttons">
              <button onClick={handleConfirmFlavorOrder}>Confirm</button>
              <button onClick={() => setSelectedFlavorItem(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedSimpleItem && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>How many orders of {selectedSimpleItem.name}?</h3>

            <div className="quantity-wrapper">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  –
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="modal-buttons">
              <button
                onClick={() => {
                  api
                    .menuCartCreate({
                      data: {
                        menuItemId: selectedSimpleItem.id,
                        quantity,
                      },
                    })
                    .then(() => {
                      console.log("Item added");
                      refreshCart(); // ✅ Add this
                    })
                    .catch(console.error);

                  setSelectedSimpleItem(null);
                  setQuantity(1);
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setSelectedSimpleItem(null);
                  setQuantity(1);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="view-cart-button"
        onClick={() => setShowCartModal(true)}
      >
        🛒 View Cart{" "}
        {cart.length > 0
          ? `(${cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0)})`
          : ""}
      </button>
      {showCartModal && (
        <MyCart
          onClose={() => {
            setShowCartModal(false);
            refreshCart();
          }}
          cart={cart}
          setCart={setCart}
        />
      )}
    </div>
  );
};

export default OrderNow;
