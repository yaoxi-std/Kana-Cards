/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function useMenu() {
  // Load configuration from local storage, or use default values
  const storedConfig = JSON.parse(localStorage.getItem("quizConfig") || "{}");
  console.log("storedConfig");
  console.log(storedConfig);

  // Function to save the quiz configuration to localStorage
  const saveConfig = () => {
    const config = {
      quizType: quizType,
      dakutan: isDakutan,
      customCharacterArray: customCharacterArray,
      difficulty: difficulty,
      randomFont: isRandomFont,
    };
    console.log(config);
    localStorage.setItem("quizConfig", JSON.stringify(config));
  };

  //TODO: Put the top two into one function
  const [startQuiz, setStartQuiz] = useState(false);
  const [learn, setLearn] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [difficulty, setDifficulty] = useState(
    storedConfig.difficulty !== undefined ? storedConfig.difficulty : 10
  );
  const [isDakutan, setIsDakutan] = useState(
    storedConfig.dakutan !== undefined ? storedConfig.dakutan : false
  );
  const [isCustom, setIsCustom] = useState(false); // isCustom is not stored
  const [quizType, setQuizType] = useState(
    storedConfig.quizType !== undefined ? storedConfig.quizType : "hiragana"
  );
  const [customCharacterArray, setCustomCharacterArray] = useState(
    storedConfig.customCharacterArray !== undefined
      ? storedConfig.customCharacterArray
      : []
  );
  const [isRandomFont, setIsRandomFont] = useState(
    storedConfig.randomFont !== undefined ? storedConfig.randomFont : false
  );
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    saveConfig();
  }, [difficulty, isDakutan, quizType, customCharacterArray, isRandomFont]);

  function handleDifficulty(event) {
    setDifficulty(event.target.value);
  }

  function handleDakutan(event) {
    setIsDakutan(event.target.checked);
  }

  function handleQuizType(event) {
    setQuizType(event.target.id);
    if (event.target.id == "custom") {
      setIsCustom(event.target.checked);
    }
  }

  function handleRandomFont(event) {
    setIsRandomFont(event.target.checked);
  }

  function handleQuizStart() {
    if (quizType == "custom" && customCharacterArray.length < 1) {
      toast("Custom quiz needs at least 1 character", {
        icon: "❗",
      });
    } else {
      setShowMenu(false);
      setStartQuiz(true);
    }
  }

  function handleLearnChoice(learnType) {
    setShowMenu(false);
    setLearn(learnType);
  }

  function closeCharacterModal(customCharacterArray) {
    setCustomCharacterArray(customCharacterArray);
    console.log(customCharacterArray);
    setIsCustom(false);
  }

  return {
    startQuiz,
    learn,
    showMenu,
    difficulty,
    isDakutan,
    isCustom,
    isRandomFont,
    showCredits,
    customCharacterArray,
    quizType,
    handleDifficulty,
    handleDakutan,
    handleRandomFont,
    handleQuizStart,
    handleLearnChoice,
    handleQuizType,
    closeCharacterModal,
  };
}
