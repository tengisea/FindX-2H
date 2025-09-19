import {
  CompleteRank,
  Header,
  Section,
  StudentRanking,
} from "@/components/landingPage";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Section />
      <StudentRanking />
      <CompleteRank />
    </div>
  );
};

export default LandingPage;
