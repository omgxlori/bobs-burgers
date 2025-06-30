import React from "react";
import Checkout from "../components/Checkout";
import type { Cart } from "../api/models";

type CheckoutViewProps = {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  user: { email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ email: string } | null>>;
};

const CheckoutView = ({ cart, setCart, user, setUser }: CheckoutViewProps) => {
  return (
    <div>
      <Checkout cart={cart} setCart={setCart} user={user} setUser={setUser} />
    </div>
  );
};


export default CheckoutView;
