import storefrontImg from "../assets/storefront.jpg";

const VisitUs = () => {
  return (
    <div className="visit-us">
      <h2>Visit Us IRL!</h2>
      <p>Find us tucked right near Wonder Wharf — we’re hard to miss!</p>
      <img src={storefrontImg} alt="Bob's Burgers restaurant" className="visit-image" />
      <p className="address">123 Ocean Avenue, Seymour’s Bay</p>
      <p className="hours">
        Open Daily: <br />
        Mon–Fri: 11AM – 9PM <br />
        Sat–Sun: 10AM – 10PM
      </p>
    </div>
  );
};

export default VisitUs;
