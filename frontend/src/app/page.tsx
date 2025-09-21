import {
  CompleteRank,
  Section,
  Footer,
  Olympiad,
} from "@/components/landingPage";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <Section />
        <CompleteRank />
        <Olympiad />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
