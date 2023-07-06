import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./Button";
import { useFeedback } from "./Feedback";

function UploadWidget({ options, uploadPreset, setUploadInfo, buttonText }) {
  const [uploadInfo, updateUploadInfo] = useState();

  const feedback = useFeedback();

  const handleOnUpload = ({ event, info }, widget) => {
    console.log("handleOnUpload", event, info);
    if (event === "success") {
      updateUploadInfo(info);
      setUploadInfo(info);
    }
    widget.close({
      quiet: true,
    });
  };

  const handleOnUploadError = (error) => {
    // console.error("handleOnUploadError", error);
    feedback.open({
      message: error.statusText,
      mode: "ERROR",
    });
  };

  return (
    <>
      {!uploadInfo?.path && (
        <CldUploadWidget
          options={options}
          uploadPreset={uploadPreset}
          onUpload={handleOnUpload}
          onError={handleOnUploadError}
        >
          {({ error, open, isLoading }) => {
            function handleOnClick(e) {
              e.preventDefault();
              if (!isLoading && !error) {
                open();
              }
            }
            return <Button onClick={handleOnClick} text={buttonText} small />;
          }}
        </CldUploadWidget>
      )}
    </>
  );
}

export { UploadWidget };
