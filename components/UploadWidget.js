import { useState } from "react";
import styled from "styled-components";
import { CldImage, CldUploadWidget } from "next-cloudinary";

function UploadWidget({ options, uploadPreset, setUploadInfo, previewWidth = 512, previewHeight = 512 }) {

    const [uploadInfo, updateUploadInfo] = useState();
    const [uploadError, updateUploadError] = useState();

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
        console.error("handleOnUploadError", error);
        updateUploadError(error);
    };

    return (
        <>
            {!uploadInfo?.path && (
                <>
                    <CldUploadWidget
                        options={options}
                        uploadPreset={uploadPreset}
                        onUpload={handleOnUpload}
                        onError={handleOnUploadError}
                    >
                        {({ open }) => {
                            function handleOnClick(e) {
                                e.preventDefault();
                                open();
                            }
                            return (
                                <button className="button" onClick={handleOnClick}>
                                    Upload a Team Picture
                                </button>
                            );
                        }}
                    </CldUploadWidget>
                </>
            )}
            {/* {uploadInfo?.path && (
                <PicPreview
                    path={uploadInfo.path}
                    width={previewWidth}
                    height={previewHeight}
                ></PicPreview>
            )} */}
            {uploadError && <p>{uploadError.status}</p>}
        </>
    );
}



export { UploadWidget };