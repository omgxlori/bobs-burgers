import React from "react";
import Checkout from "../components/Checkout";
import type { Cart } from "../api/models";

type CheckoutViewProps = {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
};

const CheckoutView = ({ cart, setCart }: CheckoutViewProps) => {
  return (
    <div>
      <Checkout cart={cart} setCart={setCart} />
    </div>
  );
};

export default CheckoutView;
