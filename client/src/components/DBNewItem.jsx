import React, { useState } from 'react';
import { statuses } from '../utils/styles';
import {Spinner} from '../components';
import { FaCloudUploadAlt, MdDelete } from '../assets/icons';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { alertDanger, alertNULL, alertSuccess } from '../context/actions/alertAction';
import {motion} from "framer-motion";
import { buttonClcik } from '../animations';
import { addNewProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setisLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed", 
      (snapshort) => {
        setProgress((snapshort.bytesTransferred / snapshort.totalBytes) * 100);
      },  
      (error) => {
          dispatch(alertDanger(`Error : ${error}`));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
      }, 
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageDownloadURL(downloadURL)
            setisLoading(false)
            setProgress(null)
            dispatch(alertSuccess("Image Uploaded to the cloud"));
            setTimeout(() => {
              dispatch(alertNULL());
            }, 3000);
          });
        }
      );
  };

  const deleteImageFromFirebase = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);
    
    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setisLoading(false);
      dispatch(alertSuccess("Image Remove from the cloud"));
        setTimeout(() => {
        dispatch(alertNULL());
        }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL,
    }
    addNewProduct(data).then((res) => {
      console.log(res); 
      dispatch(alertSuccess('New Product Added '));
      setTimeout(() => {
        dispatch(alertNULL());
        }, 3000);
        setImageDownloadURL(null);
        setItemName("");
        setPrice("");
        setCategory(null);
    });
    getAllProducts().then(data => {
      dispatch(setAllProducts(data));
    })
  };

  return <div className="flex items-center justify-center flex-col px-24 pt-6 w-full">
      <div className="border border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField 
            type="text"
            placeHolder={"Product Name Here"}
            stateFunc={setItemName}
            stateValue={itemName}
        />

    <div className="w-full flex items-center justify-around gap-3 flex-wrap">
        {statuses && statuses?.map(data => (
          <p 
            key={data.id} 
            onClick={() =>setCategory(data.category)}
            className={`px-4 py-3 rounded-lg text-xl text-textColor font-semibold cursor-pointer hover:shadow-lg border-gray-200 backdrop-blur-md ${data.category === category ? "bg-blue-400 text-white" : "bg-transparent"}`}>
            {data.title}
          </p>
        ))}
      </div>

      <InputValueField 
            type="number"
            placeHolder={"Product Price Here"}
            stateFunc={setPrice}
            stateValue={price}
        />

    <div 
      className="w-full bg-card backdrop-blur-md h-370 rounded-lg border-2 border-dotted border-gray-300 cursor-pointer shadow-lg">
          {isLoading ? (
          <div 
            className="w-full h-full flex flex-col items-center justify-evenly px-24">
            <Spinner />
            {Math.round(progress > 0) && (
              <div className="w-full flex flex-col items-center justify-center gap-2">
                <div className="flex justify-between w-full">
                  <span className="text-base font-medium text-textColor">
                      progress
                  </span>
                  <span className="text-sm font-medium text-textColor"> 
                  {Math.round(progress) > 0 && (
                    <>{`${Math.round(progress)}%`}</>
                  )}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${Math.round(progress)}%`,
                    }}
                    ></div>
                </div>
              </div>
            )}
          </div> 
          ) : ( 
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                          <p className="font-bold font-4xl">
                            <FaCloudUploadAlt className="-rotate-0 text-[35px]" />
                          </p>
                          <p className="text-lg text-textColor">
                            Click To upload An image
                          </p>
                      </div>
                    </div>
                    <input 
                      type="file"
                      name='upload-image' 
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                      />
                  </label>
                </> 
                ) : ( 
                <>
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <motion.img 
                    whileHover={{scale : 1.15}}
                    src={imageDownloadURL}
                    className="w-full h-full object-cover"
                  />

                  <motion.div
                  {...buttonClcik}
                  type="button"
                  className="absolute top-3 right-3 p-3 rounded-full bg-blue-500 text-xl cursor-pointer outline-none hover:shadow-lg duration-500 transition-all ease-in-out"
                  onClick={() => deleteImageFromFirebase
                  (imageDownloadURL)}
                  >
                    <MdDelete className="-rotate-0" />
                  </motion.div>
                </div>
                </>
              )}
            </> 
          )}
    </div>

    <motion.button onClick={submitNewData} {...buttonClcik} 
      className="w-9/12 py-4 rounded-lg bg-blue-400 text-primary hover:bg-blue-500 cursor-pointer text-lg ">
              Save
    </motion.button>
    </div>
    </div>
}

export const InputValueField = ({type, placeHolder, stateValue, stateFunc}) => {
  return <>
    <input 
      type={type} 
      placeholder={placeHolder} 
      className="w-full px-4 py-3 bg-[rgba(256,256,256,0.4)] shadow-lg outline-none rounded-md border border-gray-200 " 
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}
    />
  </>;
};

export default DBNewItem;
