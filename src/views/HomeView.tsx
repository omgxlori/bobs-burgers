import Marquee from '../components/Marquee';
import MeetTheBelchers from '../components/MeetTheBelchers';
import VisitUs from '../components/Location';
import FakeAd from '../components/FakeAd';

const HomeView = () => {
  return (
    <div>
      <Marquee />
      <MeetTheBelchers />
      <VisitUs />
      <FakeAd />
    </div>
  );
};

export default HomeView;
