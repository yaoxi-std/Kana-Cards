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
        className="fixed inset-0 z-50 outline-none mobile-card bg-black bg-opacity-25"
      >
        <div className="flex items-start justify-center p-4">
          <div className="text-black rounded-lg shadow-lg bg-white soft-shadow pt-8 sm:pt-20 px-4 sm:px-12 md:px-20 pb-8 sm:pb-16 w-full max-w-lg">
            <div className="flex justify-between mb-4">
              <button
                className="background-transparent text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setIsHiraganaChart(!isHiraganaChart)}
              >
                {isHiraganaChart ? "Show Katakana" : "Show Hiragana"}
              </button>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-5 gap-2 gap-x-8 max-h-[calc(100vh-20rem)] overflow-x-auto overflow-y-auto w-full grow no-scrollbar scroll-blur">
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
        </div>
      </div>
    </>
  );
}

ChooseCharacters.propTypes = {
  closeCharacterModal: PropTypes.func.isRequired,
  initialCharacterArray: PropTypes.array,
};
