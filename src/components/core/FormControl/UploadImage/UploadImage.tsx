import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import CoreAvatar from "~/components/core/Avatar";
import Button from "~/components/core/Button/Button";
import { cn } from "@nextui-org/react";
import "./styles.css";

export default function UploadImage() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <div className="upload__image-wrapper">
            {isDragging}
            {imageList.length == 0 ? <div className="flex space-x-4 items-center">
              <CoreAvatar
                name="TS"
                withBadge={false}
                {...dragProps}
                className={cn("w-20 h-20 text-large bg-lucid-blue-100 text-lucid-blue-500 text-xl point-events", {
                  'bg-lucid-green-100': isDragging
                })}
                classNames={{
                  name: "font-semibold"
                }}
              />
              <Button variant="bordered" size="small" type="button" onClick={onImageUpload}>Upload Photo</Button>
            </div> : null }
            {imageList.map((image, index) => (
              <div key={`imgage-list-${index}`} className="image-item flex space-x-4 items-center">
                <img src={image.dataURL} alt="profile-pic" className="w-20 h-20 rounded-full" />
                <Button variant="bordered" size="small" type="button" onClick={() => onImageUpdate(index)}>Upload Photo</Button>
                <Button variant="bordered" size="small" type="button" onClick={() => onImageRemove(index)}>Remove Delete</Button>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
