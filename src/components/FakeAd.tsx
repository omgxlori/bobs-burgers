import jimmyPestoImg from '../assets/jimmy-pesto.webp';
import jimmyPestoPizzeriaImg from '../assets/jimmy-pestos-pizzeria.png';

const FakeAd = () => {
  return (
    <div className="boycott-jimmy">
        <img src={jimmyPestoImg} alt="Jimmy Pesto" className="jimmy-pesto" />
  <div className="text-section">
    <h2>🚨 Boycott Jimmy Pesto’s Pizzera! 🚨</h2>
    <p>
      Do not — we repeat, DO NOT — visit Jimmy Pesto’s Pizzeria across the street. <br />
      It has way too many breadsticks. The garlic knots? <em>Dangerously</em> delicious.
    </p>
    <p className="fine-print">
      This message 100% not brought to you by Jimmy Pesto himself. <br />
      <em>(But if you *do* go… try the deep-dish. You didn’t hear it from us.)</em>
    </p>
  </div>
  <img
    src={jimmyPestoPizzeriaImg}
    alt="Jimmy Pesto's Pizzeria"
    className="pesto-image"
  />
</div>
  );
};

export default FakeAd;
