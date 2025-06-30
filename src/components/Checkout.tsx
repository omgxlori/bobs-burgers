import React, { useState, useEffect } from "react";
import type { MenuItem } from "./OrderNow";
import { CartApi, Configuration } from "../api";
import "./Checkout.css";
import type { Cart } from "../api/models";

type CheckoutProps = {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  user: { email: string; firstName?: string } | null;
setUser: React.Dispatch<React.SetStateAction<{ email: string; firstName?: string } | null>>;
};

const Checkout = ({ cart, setCart, user, setUser }: CheckoutProps) => {
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
  const [loginData, setLoginData] = useState({
  email: "",
  password: "",
});
const [orderPlaced, setOrderPlaced] = useState(false);


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
            toppings,
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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setLoginData((prev) => ({ ...prev, [name]: value }));
};

const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const payload = {
  email: loginData.email,
  password: loginData.password,
};

  try {
    const response = await fetch("http://localhost:8000/login/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

    if (!response.ok) {
      const errData = await response.json();
      alert("Login failed: " + JSON.stringify(errData));
      return;
    }

    const user = await response.json();
    setUser({ email: user.email, firstName: user.first_name });
    localStorage.setItem("user", JSON.stringify(user));
    setShowLoginForm(false);
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Try again.");
  }
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
    first_name: formData.get("firstName") ?? "",
    last_name: formData.get("lastName") ?? "",
  };

  try {
    const response = await fetch("http://localhost:8000/users/", {
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
      form.reset(); 
      setShowSignupForm(false);

      setUser({
  email: payload.email as string,
  firstName: signupData.firstName,
});

localStorage.setItem(
  "user",
  JSON.stringify({
    email: payload.email,
    firstName: signupData.firstName,
  })
);


    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Signup failed. Please try again.");
  }
};

if (orderPlaced) {
  return (
    <div className="order-confirmation">
      <h2>Your Order’s In!</h2>
      <p>
        Thanks for ordering. Please stand awkwardly by the counter until someone calls your name.
      </p>
      <img
        src="https://images.steamusercontent.com/ugc/976605181074591227/96EB2FB1FBF1E57E723134A55E0254DB280A9E3A/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        alt="Tina dancing"
        className="tina-gif"
      />
      <button
        onClick={() => {
          setOrderPlaced(false);
        }}
      >
        Back to Menu
      </button>
    </div>
  );
}


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
            <br></br>
We’re a cash-only restaurant — sorry, it’s 2008 forever in here.
Once you place your order, please pay at the counter like it's the most important thing you'll do today.
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

{user ? (
  <div className="welcome-box">
    <h3>Welcome, {user.firstName || user.email}!</h3>
    <button
      onClick={() => {
        localStorage.removeItem("user");
        setUser(null);
      }}
      className="logout-btn"
    >
      Logout
    </button>

    <button
  className="place-order-btn"
  onClick={() => {
    setOrderPlaced(true);
    setCart([]);
  }}
>
  Place Order
</button>

  </div>
) : (
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
           <form className="checkout-form" onSubmit={handleLoginSubmit}>
  <label>Email:</label>
  <input
    type="email"
    name="email"
    value={loginData.email}
    onChange={handleLoginChange}
  />
  <label>Password:</label>
  <input
    type="password"
    name="password"
    value={loginData.password}
    onChange={handleLoginChange}
  />
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
              console.log("rendered user:", user);
            </form>
          )}
        </div>
)}
      </div>
    </div>
  );
};

export default Checkout;
