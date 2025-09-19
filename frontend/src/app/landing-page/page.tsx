import {
  CompleteRank,
  Header,
  Section,
  StudentRanking,
} from "@/components/landingPage";

import LiquidChrome from "@/components/landingPage/LiquidChrome";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Section />
      <StudentRanking />
      <CompleteRank />
    </div>
  );
};

export default LandingPage;
