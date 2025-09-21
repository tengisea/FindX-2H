import {
  CompleteRank,
  Section,
  Footer,
  // StudentRanking,
} from "@/components/landingPage";

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
