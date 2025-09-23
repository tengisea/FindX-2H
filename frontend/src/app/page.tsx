import {
  CompleteRank,
  Section,
  Footer,
  Olympiad,
} from "@/components/landingPage";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <div id="landing-page-content" className="relative z-10">
        <Section />
        <Olympiad />
        <CompleteRank />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
