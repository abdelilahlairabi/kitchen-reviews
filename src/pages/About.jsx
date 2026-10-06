import AboutHeader from '../components/about/AboutHeader';
import AboutHero from '../components/about/AboutHero';
import AboutMission from '../components/about/AboutMission';
import AboutProcess from '../components/about/AboutProcess';

const About = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen pb-10">
      <AboutHeader />
      <AboutHero />
      <AboutMission />
      <AboutProcess />
    </div>
  );
};

export default About;
