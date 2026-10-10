import AboutHeader from '../components/about/AboutHeader';
import AboutHero from '../components/about/AboutHero';
import AboutMission from '../components/about/AboutMission';
import AboutProcess from '../components/about/AboutProcess';
import PageMeta from '../components/PageMeta';

const About = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen pb-10">
      <PageMeta
        title="About KitchenTrusted | Kitchen Product Research"
        description="Learn how KitchenTrusted organizes product information and creates practical kitchen comparisons, buying guides, and recommendations."
      />
      <AboutHeader />
      <AboutHero />
      <AboutMission />
      <AboutProcess />
    </div>
  );
};

export default About;
