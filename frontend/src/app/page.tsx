import {
  CompleteRank,
  Section,
  Footer,
  Olympiad,
  OlympiadBackground,
} from "@/components/landingPage";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <OlympiadBackground />
      <div id="landing-page-content" className="relative z-10">
        <Section />
        <CompleteRank />
        <Olympiad />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
