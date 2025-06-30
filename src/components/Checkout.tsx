import React, { useState, useEffect } from "react";
import type { MenuItem } from "./OrderNow";
import { CartApi, Configuration } from "../api";
import "./Checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isForHere, setIsForHere] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  
useEffect(() => {
  const api = new CartApi(
    new Configuration({ basePath: "http://localhost:8000" })
  );

  api.menuCartList()
    .then((items) => {
      const simplified = items.map((cartItem) => {
        const quantity = cartItem.quantity ?? 1;
        const basePrice = Number(cartItem.menuItem?.price ?? 0);
        const toppings = cartItem.toppings ?? [];

        const toppingsPrice = toppings.reduce(
          (sum: number, topping: any) => sum + Number(topping.price ?? 0),
          0
        );

        return {
          id: cartItem.menuItem?.id ?? 0,
          name: cartItem.menuItem?.name ?? "",
          description: cartItem.menuItem?.description ?? "",
          price: basePrice,
          category: cartItem.menuItem?.category ?? "",
          quantity,
          toppings, // keep this for displaying
        };
      });
      setCart(simplified);
    })
    .catch(console.error);
}, []);

  return (
    <div className="checkout-container">
      {/* Left side - Cart Summary */}
      <div className="checkout-left">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul className="checkout-cart-list">
  {cart.map((item, index) => {
    const basePrice = item.price;
    const quantity = item.quantity ?? 1;
    const toppings = item.toppings ?? [];

    const toppingsTotal = toppings.reduce(
      (sum: number, t: any) => sum + Number(t.price ?? 0),
      0
    );

    const itemTotal = (basePrice + toppingsTotal) * quantity;

    return (
      <li key={index} className="checkout-cart-item">
        <div className="item-details">
          <strong>{item.name}</strong>
          <div>Base Price: ${basePrice.toFixed(2)}</div>

          {toppings.length > 0 && (
            <div>
              Toppings:
              <ul className="topping-list">
                {toppings.map((t: any, i: number) => (
                  <li key={i}>
                    {t.name} — ${Number(t.price ?? 0).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>Quantity: {quantity}</div>
          <div className="item-total">
            Item Total: ${itemTotal.toFixed(2)}
          </div>
        </div>

        <button
          className="remove-btn"
          onClick={() => {
            const updatedCart = cart.filter((_, i) => i !== index);
            setCart(updatedCart);
          }}
        >
          Remove
        </button>
      </li>
    );
  })}
</ul>

        )}

        <div className="cart-summary">
  <p>
    Total: $
    {cart.reduce((sum, item) => {
      const base = item.price;
      const quantity = item.quantity ?? 1;
      const toppings = item.toppings ?? [];

      const toppingsTotal = toppings.reduce(
        (toppingSum: number, t: any) => toppingSum + Number(t.price ?? 0),
        0
      );

      return sum + (base + toppingsTotal) * quantity;
    }, 0).toFixed(2)}
  </p>

  <p className="no-tax-joke">
    No tax. That’s our gift to you. Also our burden.
  </p>
</div>
      </div>

      {/* Right side - Form and Toggle */}
      <div className="checkout-right">
        <div className="toggle-switch">
          <span className={!isForHere ? "inactive-label" : ""}>For Here</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={!isForHere}
              onChange={() => setIsForHere((prev) => !prev)}
            />
            <span className="slider"></span>
          </label>
          <span className={isForHere ? "inactive-label" : ""}>To Go</span>
        </div>

        <div className="account-options">
          <p>
            Already have an account?{" "}
            <button
              className="link-button"
              onClick={() => {
                setShowLoginForm((prev) => !prev);
                setShowSignupForm(false);
              }}
            >
              Login
            </button>
          </p>
          {showLoginForm && (
            <form className="checkout-form">
              <label>Email:</label>
              <input type="email" />
              <label>Password:</label>
              <input type="password" />
              <button type="submit">Login</button>
            </form>
          )}

          <p>
            New here?{" "}
            <button
              className="link-button"
              onClick={() => {
                setShowSignupForm((prev) => !prev);
                setShowLoginForm(false);
              }}
            >
              Create an account
            </button>
          </p>
          {showSignupForm && (
            <form className="checkout-form">
              <label>First Name:</label>
              <input type="text" />
              <label>Last Name:</label>
              <input type="text" />
              <label>Phone Number:</label>
              <input type="tel" />
              <label>Email:</label>
              <input type="email" />
              <label>Password:</label>
              <input type="password" />
              <label>Confirm Password:</label>
              <input type="password" />
              <label>Birthday:</label>
              <input type="date" />

              <label className="checkbox-label">
                <input type="checkbox" />
                Sign me up for the <strong>"Burger Buzz Blast"</strong> — our
                monthly e-blast featuring pun-tastic specials, behind-the-grill
                gossip, and burger of the month spotlights! 🍔
                <br />
                You’ll also be added to the waitlist for{" "}
                <strong>Louise’s Loyalty Program</strong> (more to come on that
                soon… we’re working on some *diabolically good perks* 🐰).
              </label>

              <button type="submit">Create Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
