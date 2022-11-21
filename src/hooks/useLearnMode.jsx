import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react"

export default function useLearnMode() {
    let timeoutId = 0;

    const volumeUpIcon = <FontAwesomeIcon icon={faVolumeUp} />
    const volumeOffIcon = <FontAwesomeIcon icon={faVolumeOff} />
    const [volumeIcon, setVolumeIcon] = useState(volumeUpIcon)


    const [current, setCurrent] = useState(0);
    const [num, setNum] = useState(1);
    
    const setNextKana = () => {
        clearInterval(timeoutId)
        setCurrent(prev => prev+1)
        setNum(num + 1)
    }

    const resetQuiz = () => {
        setNum(1)
        setCurrent(0)
    }

    
    function playSound() {
      clearInterval(timeoutId)
      setVolumeIcon(volumeUpIcon)
      let sound = document.getElementById("audio");
      sound.play();
      timeoutId = setTimeout(() => {
        setVolumeIcon(volumeOffIcon)

    }, 1000);
    return () => clearInterval(timeoutId);

    }

    return {
            volumeUpIcon,
            volumeIcon,
            current,
            num,
            setNextKana,
            resetQuiz,
            playSound
            };

}