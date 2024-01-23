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
        <div >
            <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
                <BiHappyBeaming  size={40} className="left-[120px] top-[345px] absolute" />
            </IconContext.Provider>

            <EmojiPicker pickerStyle={{width:'50%'}}className="left-[180px] top-[150px] absolute "/> 
        </div>
    );
  };
  
  export default Emoji;
  