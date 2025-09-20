import {
  CompleteRank,
  Header,
  Section,
  Footer,
  // StudentRanking,
} from "@/components/landingPage";
import { OlympiadBackground } from "@/components/landingPage/LandingBackground";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        {/* <Header /> */}
        <Section />
        {/* <StudentRanking /> */}
        <CompleteRank />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
