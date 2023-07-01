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
            {uploadInfo?.path && (
                <Preview
                    path={uploadInfo.path}
                    width={previewWidth}
                    height={previewHeight}
                ></Preview>
            )}
            {uploadError && <p>{uploadError.status}</p>}
        </>
    );
}

function Preview({ path, width = 512, height = 512 }) {
    return (
        <>
            <LogoBox>
                <CldImage
                    src={path}
                    alt="Uploaded image"
                    width={width}
                    height={height}
                    className="w-full h-full object-cover"
                />
            </LogoBox>
            <div>
                <button></button>
            </div>
        </>
    );
}

const LogoBox = styled.div`
  border-radius: 300px;
  overflow: hidden;
  width: 128px;
  height: 128px;
  margin-left: auto;
  margin-right: auto;
`;

export { Preview, UploadWidget };