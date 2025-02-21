import React from "react";
import PropTypes from "prop-types";

//Renders two buttons choose which type of quiz to take (Hiragana or Katakana)
export default function ChooseQuizMode({ quizType, handleQuizType }) {
  return (
    <div className="flex items-center mb-4 mt-4 overflow-auto">
      <input
        id="hiragana"
        type="radio"
        name="quiz-type"
        onChange={handleQuizType}
        value=""
        defaultChecked={quizType === "hiragana"}
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
      />
      <label
        htmlFor="hiragana"
        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
      >
        Hiragana
      </label>

      <input
        id="katakana"
        type="radio"
        name="quiz-type"
        onChange={handleQuizType}
        value=""
        defaultChecked={quizType === "katakana"}
        className="w-4 h-4 ml-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
      />

      <label
        htmlFor="katakana"
        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
      >
        Katakana
      </label>

      <input
        id="custom"
        type="radio"
        name="quiz-type"
        onChange={handleQuizType}
        onClick={handleQuizType}
        value="custom-checkbox"
        defaultChecked={quizType === "custom"}
        className="w-4 h-4 ml-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
      />

      <label
        htmlFor="custom"
        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
      >
        Custom
      </label>
    </div>
  );
}

ChooseQuizMode.propTypes = {
  handleQuizType: PropTypes.func.isRequired,
};
