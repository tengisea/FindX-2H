import {
  CompleteRank,
  Header,
  Section,
  StudentRanking,
} from "@/components/landingPage";
import { OlympiadBackground } from "@/components/landingPage/LandingBackground";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <OlympiadBackground />
      <div className="relative z-10">
        <Header />
        <Section />
        <StudentRanking />
        <CompleteRank />
      </div>
    </div>
  );
};

export default LandingPage;