import React , {useState} from 'react';
import EmojiPicker from 'emoji-picker-react';
import { BiHappyBeaming } from "react-icons/bi";
import { IconContext } from "react-icons";

const Emoji = () => {

const [inputStr, setInputStr] = useState("");
const [showPicker, setShowPicker] = useState(false);

const onEmojiClick = (event, emojiObject) => {
    setInputStr(prevInput=> prevInput + emojiObject.emoji);
    setShowPicker(false);
};

    return (
        <div className="flex flex-row">
            <IconContext.Provider value={{ color: "white" }}>
                <BiHappyBeaming size={40} onClick={setShowPicker} />
            </IconContext.Provider>

            {showPicker ? (<EmojiPicker />) : (<div></div>)} 
        </div>
    );
  };
  
  export default Emoji;
  
