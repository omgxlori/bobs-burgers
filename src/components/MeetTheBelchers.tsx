import bobImg from '../assets/bob-belcher.webp';
import lindaImg from '../assets/linda-belcher.webp';
import tinaImg from '../assets/tina-belcher.webp';
import geneImg from '../assets/gene-belcher.webp';
import louiseImg from '../assets/louise-belcher.jpg';

type Belcher = {
  name: string;
  quote: string;
  image: string;
  recommends: string;
};

const belchers = [
  {
    name: "Bob",
    quote: "I'm making burgers, not friends.",
    image: bobImg,
    recommends: "All-Beef Classic",
  },
  {
    name: "Linda",
    quote: "Alright! Time for wine!",
    image: lindaImg,
    recommends: "Bacon Bliss",
  },
  {
    name: "Tina",
    quote: "I’m a smart, strong, sensual woman.",
    image: tinaImg,
    recommends: "Picklemania",
  },
  {
    name: "Gene",
    quote: "Everything is burgers and nothing hurts!",
    image: geneImg,
    recommends: "4 Cheese, Please",
  },
  {
    name: "Louise",
    quote: "I smell fear. And maybe ketchup.",
    image: louiseImg,
    recommends: "Jam Out",
  },
];

const BelcherCard = ({ name, quote, image, recommends }: Belcher) => (
  <div className="belcher-card">
    <img src={image} alt={name} className="belcher-img" />
    <h3>{name}</h3>
    <p className="quote">“{quote}”</p>
    <p className="recommends">Recommends: <strong>{recommends}</strong></p>
  </div>
);

const MeetTheBelchers = () => {
  return (
    <div className="meet-the-belchers">
      <h2>Meet the Belchers</h2>
      <div className="belcher-scroll">
        {belchers.map((b) => (
          <BelcherCard key={b.name} {...b} />
        ))}
      </div>
    </div>
  );
};

export default MeetTheBelchers;
