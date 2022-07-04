import React from "react";
import "../styles/components/imagePicker.css";
import { Icon } from "@iconify/react";

const ImagePicker = (): JSX.Element => {
  return (
    <>
      <div className="ImagePicker_Page">
        <div className="ImagePicker_Content_Container">
          <div className="ImagePicker_Image_Url_Container">
            <input
              type="text"
              className="ImagePicker_Image_Url_Field"
              placeholder="image url"
            />
            <h2>
              NOTE : Consider using image url rather then uploading files
              because cloud database have limited Storage
            </h2>
          </div>

          <div className="ImagePicker_File_Picker_Container">
            <div className="ImagePicker_File_Picker_Label_Container">
              <Icon icon="fa:upload" />
              <label htmlFor="image-picker-file-picker">upload file</label>
            </div>
            <input
              type="file"
              id="image-picker-file-picker"
              className="ImagePicker_File_Picker_Field"
            />
          </div>
          <div className="ImagePicker_Content_Preview">
            <h3>Preview</h3>
          </div>
          <button className="ImagePicker_Submit_Button">Submit</button>
        </div>
      </div>
    </>
  );
};

export default ImagePicker;
