import React from 'react';
import ImageUploading from 'react-images-uploading';
import { FiImage } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { LuUpload } from "react-icons/lu";
import { IconContext } from "react-icons";
//name of firestore collection
import {storage} from '../firebase';
import {ref, uploadBytes,listAll,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import { useState , useEffect} from 'react';

function PhotoLibrary(){

    //image upload

    const [images, setImages] = React.useState([]);
    const maxNumber = 5;
  
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    

    const uploadImage = () => {
      if (imageUpload === null) return;
    
      const imageRef = ref(storage, `posts/${v4()}`);
      
      uploadBytes(imageRef, imageUpload).then(() => {
        alert("Image Uploaded");
      });

      
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
                             {/* add image icon  */}
                            <input type="file" onChange={(event)=> {setImageUpload(event.target.files[0])
                            }}/>

                            <IconContext.Provider value={{ color: "white" }} >
                              <FiImage size={40} onClick={uploadImage}/>
                            </IconContext.Provider>

                            <button onClick={uploadImage}> upload image </button>


                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />

                                <div className=" flex flex-col justify-between p-2">

                                      {/* img upload icon  */}
                                        <IconContext.Provider value={{ color: "white" }} >
                                            <LuUpload size={20}  onClick={() => uploadImage}/>
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

