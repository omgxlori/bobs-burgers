import React, { useEffect, useState } from "react";
import "./Marquee.css";

const messages = [
  "🍔 Welcome to Bob's Burgers! 🍔",
  "Check out our Burger of the Day!",
  "I just buttered my abs. For SCIENCE!",
  "Gene, don't put that on the marquee.",
  "I may have bet the fryer on a horse named MeatSweats.",
  "Louise, you can't gamble kitchen appliances. Again.",
  "If Jimmy Jr. were a horse, I'd let him graze in the pasture of my heart.",
  "Okay, that's enough horse metaphors for one marquee.",
  "Wooooooooow! This marquee is like a conga line for words! Cha-cha-cha!💃💃💃💃💃💃💃💃💃",
  "Alright, conga’s over. Let’s try this from the top.",
];

const Marquee = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % messages.length);
  }, 12500);

  return () => clearInterval(interval);
}, []);


  return (
    <div className="marquee-wrapper">
      <div key={index} className="marquee-text">
        {messages[index]}
      </div>
    </div>
  );
};

export default Marquee;
