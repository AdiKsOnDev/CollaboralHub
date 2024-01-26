import React from 'react';
import ImageUploading from 'react-images-uploading';
import { FiImage } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { LuUpload } from "react-icons/lu";
import { IconContext } from "react-icons";


function PhotoLibrary(){

    //image upload

    const [images, setImages] = React.useState([]);
    const maxNumber = 5;
  
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

  return (
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageUpdate,
                          onImageRemove,
                        }) => (
                          <div>
                            {/* img icon  */}
                          
                              <IconContext.Provider value={{ color: "white" }} >
                                <FiImage size={40} onClick={onImageUpload}/>
                              </IconContext.Provider>

                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />

                                <div className=" flex flex-row justify-between p-2">

                                      {/* img upload icon  */}
                                        <IconContext.Provider value={{ color: "white" }} >
                                            <LuUpload size={20}  onClick={() => onImageUpdate(index)}/>
                                        </IconContext.Provider>

                                      
                                      {/* img remove icon  */}
                                        <IconContext.Provider value={{ color: "white" }} >
                                            <RxCross2 size={24} onClick={() => onImageRemove(index)}/>
                                        </IconContext.Provider>


                                </div>

                              </div>
                            ))}
                          </div>
                        )}
                      </ImageUploading>

  );
}; 


export default PhotoLibrary;