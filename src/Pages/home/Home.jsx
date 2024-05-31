import React from "react";
import { ScaleLoader } from "react-spinners";
import UseUser from "../../hooks/UseUser";
import ClintBanner from "./clintSection/ClintBanner";
import Gallary from "./gallary/Gallary";
import HeroContainer from "./hero/HeroContainer";
import KnowOurTeacher from "./knowOurTeacher/KnowOurTeacher";
import MidBanner from "./MidBanner/MidBanner";
import MostEnrolledCourses from "./MostEnrolled/MostEnrolledCourses";

const Home = () => {
  const { isLoading } = UseUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center align-middle h-screen">
        <ScaleLoader
          color="#f7a5b9"
          height={60}
          margin={3}
          radius={3}
          width={5}
        />
      </div>
    );
  }
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <MostEnrolledCourses />
        <MidBanner />
        <Gallary />
        <KnowOurTeacher />
      </div>
      <ClintBanner />
    </section>
  );
};

export default Home;
