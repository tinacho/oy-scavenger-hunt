import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./Button";

function UploadWidget({ options, uploadPreset, setUploadInfo, buttonText }) {
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
                            <Button
                                onClick={handleOnClick}
                                text={buttonText}
                                small
                            />
                        );
                    }}
                </CldUploadWidget>
            )}
            {uploadError && <p>{uploadError.status}</p>}
        </>
    );
}

export { UploadWidget };
