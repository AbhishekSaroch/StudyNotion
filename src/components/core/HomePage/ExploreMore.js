import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";
const tabsNames = [
  "Free",
  "New To Coding",
  "Most Popular",
  "Skill Paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsNames[0]);
  //   we can make cards through this
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurretCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const setMyCards = (value) => {
    // current tag tab value update
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag == value);
    setCourses(result[0].courses);
    setCurretCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-4xl font-semibold text-center">
        Unlock The <HighlightText text={"Power Of Code"} />
      </div>

      <p className=" text-center text-richblack-300 text-[16px] font-semibold mt-2 ">
        Learn To Build Anything You Can Imagine
      </p>

      <div className="flex rounded-full bg-richblack-800 border-richblack-50 px-1 py-1 mt-4">
        {tabsNames.map((tab, index) => {
          return (
            <div
              className={`text-base flex items-center gap-2
        ${
          currentTab == tab
            ? "bg-richblack-900 text-bgrichblack-5 font-medium"
            : "text-richblack-200"
        } rounded-full
         transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
          `}
              key={index}
              onClick={() => setMyCards(tab)}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[150px]">
        {/* course card */}
        <div className="absolute flex flex-row gap-10 justify-between w-full">
            {
                courses.map((course,index)=>{
                    <CourseCard
                    key={index}
                    cardData={course}
                    currentCard={currentCard}
                    setCurretCard={setCurretCard}/>
                })
            }
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
