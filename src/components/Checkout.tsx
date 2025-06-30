import React, { useState, useEffect } from "react";
import type { MenuItem } from "./OrderNow";
import { CartApi, Configuration } from "../api";
import "./Checkout.css";
import type { Cart } from "../api/models";

type CheckoutProps = {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
};

const Checkout = ({ cart, setCart }: CheckoutProps) => {
  const [isForHere, setIsForHere] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    wantsNewsletter: false,
  });

  useEffect(() => {
    const api = new CartApi(
      new Configuration({ basePath: "http://localhost:8000" })
    );

    api
      .menuCartList()
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

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone") ?? "",
    birthday: formData.get("birthday") ?? null,
    opted_into_eblast: formData.get("opted_into_eblast") === "on",
  };

  try {
    const response = await fetch("http://localhost:8000/menu/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Signup error:", errData);
      alert("Something went wrong: " + JSON.stringify(errData));
    } else {
      alert("Account created successfully!");
      form.reset(); // optional: clear form
      setShowSignupForm(false); // hide form
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Signup failed. Please try again.");
  }
};


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
                    <div>${basePrice}</div>

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
            {cart
              .reduce((sum, item) => {
                const base = item.price;
                const quantity = item.quantity ?? 1;
                const toppings = item.toppings ?? [];

                const toppingsTotal = toppings.reduce(
                  (toppingSum: number, t: any) =>
                    toppingSum + Number(t.price ?? 0),
                  0
                );

                return sum + (base + toppingsTotal) * quantity;
              }, 0)
              .toFixed(2)}
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
            <form className="checkout-form" onSubmit={handleSignupSubmit}>
              <label>First Name:</label>
              <input
                name="firstName"
                value={signupData.firstName}
                onChange={handleSignupChange}
                type="text"
              />

              <label>Last Name:</label>
              <input
                name="lastName"
                value={signupData.lastName}
                onChange={handleSignupChange}
                type="text"
              />

              <label>Phone Number:</label>
              <input
                name="phone"
                value={signupData.phone}
                onChange={handleSignupChange}
                type="tel"
              />

              <label>Email:</label>
              <input
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                type="email"
              />

              <label>Password:</label>
              <input
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                type="password"
              />

              <label>Confirm Password:</label>
              <input
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                type="password"
              />

              <label>Birthday:</label>
              <input
                name="birthday"
                value={signupData.birthday}
                onChange={handleSignupChange}
                type="date"
              />

              <label className="checkbox-label">
                <input
                  name="wantsNewsletter"
                  type="checkbox"
                  checked={signupData.wantsNewsletter}
                  onChange={handleSignupChange}
                />
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
