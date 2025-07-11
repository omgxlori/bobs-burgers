import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartApi, Configuration, type Cart } from "../api";
import "./MyCart.css";

type MyCartProps = {
  onClose: () => void;
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
};

const MyCart = ({ onClose }: MyCartProps) => {
  const [cart, setCart] = useState<Cart[]>([]);
  const navigate = useNavigate();

  const api = new CartApi(
    new Configuration({ basePath: "http://localhost:8000" })
  );

  useEffect(() => {
    api
      .menuCartList()
      .then((res) => {
        setCart(res);
      })
      .catch(console.error);
  }, []);

  const handleQuantityChange = (index: number, delta: number) => {
    const item = cart[index];
    const newQty = Math.max(1, (item.quantity ?? 1) + delta);

    if (!item.menuItem?.id) return;

    api
      .menuCartUpdate({
        id: String(item.id),
        data: {
          quantity: newQty,
          menuItemId: item.menuItem!.id,
          toppingIds: new Set(
            (item.toppings ?? [])
              .map((t) => t.id)
              .filter((id): id is number => typeof id === "number")
          ),
          selectedOption:
            typeof item.selectedOption === "object" &&
            item.selectedOption !== null
              ? item.selectedOption
              : undefined,
        },
      })
      .then(() => {
        const updated = [...cart];
        updated[index] = { ...item, quantity: newQty };
        setCart(updated);
      })
      .catch(console.error);
  };

  const handleRemove = (index: number) => {
    const item = cart[index];
    api
      .menuCartDelete({ id: String(item.id) })
      .then(() => {
        setCart((prev) => prev.filter((_, i) => i !== index));
      })
      .catch(console.error);
  };

  const total = cart.reduce((sum, item) => {
    const basePrice = Number(item.menuItem?.price ?? 0);
    const quantity = Number(item.quantity ?? 1);

    const toppingsTotal = (item.toppings ?? []).reduce((sum, topping) => {
      return sum + Number(topping?.price ?? 0);
    }, 0);

    const itemTotal = (basePrice + toppingsTotal) * quantity;
    return sum + itemTotal;
  }, 0);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-header-row">
                  <strong>{item.menuItem?.name}</strong>
                  <span className="cart-price">
                    ${item.menuItem?.price} × {item.quantity}
                  </span>
                  <div className="quantity-buttons">
                    <button onClick={() => handleQuantityChange(index, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>
                      +
                    </button>
                  </div>
                </div>

                {item.toppings && item.toppings.length > 0 && (
                  <ul className="topping-list">
                    {item.toppings.map((topping) => (
                      <li key={topping.id} className="topping-item">
                        + {topping.name} (${topping.price})
                      </li>
                    ))}
                  </ul>
                )}

                {item.selectedOption && (
                  <div className="selected-option">
                    Option: {item.selectedOption}
                  </div>
                )}

                <div className="cart-remove-button">
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-total">
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>
        <div className="modal-buttons">
          {cart.length > 0 && (
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              Go to Checkout
            </button>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
