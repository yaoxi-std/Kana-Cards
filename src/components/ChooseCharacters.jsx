import React, { useState, useEffect } from "react";
import useCharacters from "../hooks/useCharacters";

import PropTypes from "prop-types";

export default function ChooseCharacters({
  initialCharacterArray,
  closeCharacterModal,
}) {
  const {
    characterArray,
    setIsHiraganaChart,
    chart,
    isHiraganaChart,
    clearCharacters,
    toggleCharacterInArray,
  } = useCharacters({ initialCharacterArray });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <>
      <div
        data-aos="slide-up"
        className=" min-h-screen centerFlex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-non mobile-card"
      >
        <div className="text-black max-w-lg rounded-lg overflow-hidden shadow-lg bg-white soft-shadow pt-20 pr-12 pl-12 sm:pr-12 sm:pl-12 md:pl-24 md:pr-24 pb-16">
          <div className="flex justify-between mb-4">
            <button
              className="background-transparent text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => setIsHiraganaChart(!isHiraganaChart)}
            >
              {isHiraganaChart ? "Show Katakana" : "Show Hiragana"}
            </button>
          </div>
          <div className="grid grid-cols-5 grid-rows-10 gap-2 gap-x-8">
            {React.Children.toArray(chart).map((child) => {
              if (React.isValidElement(child) && child.props.value) {
                const kana = child.props.value;
                return React.cloneElement(child, {
                  onMouseDown: (e) => {
                    e.preventDefault();
                    setIsDragging(true);
                    toggleCharacterInArray(kana);
                  },
                  onMouseEnter: (e) => {
                    if (isDragging) {
                      e.preventDefault();
                      toggleCharacterInArray(kana);
                    }
                  },
                });
              }
              return child;
            })}
          </div>
          <div className="border-t border-solid border-slate-200 rounded-b p-4 mt-8">
            <div className="flex justify-between ">
              <button
                className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
                onClick={clearCharacters}
              >
                Clear
              </button>
              <button
                className="text-blue-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
                data-testid="close-credits-button"
                onClick={() => closeCharacterModal(characterArray)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

ChooseCharacters.propTypes = {
  closeCharacterModal: PropTypes.func.isRequired,
  initialCharacterArray: PropTypes.array,
};
