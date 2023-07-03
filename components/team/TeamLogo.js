import { useState } from "react";
import styled from "styled-components";
import { CldImage } from "next-cloudinary";


function LogoActions({ handlePicChange, handleFullScreen }) {
    return (
        <LogoActionBtnGrp>
            <LogoActionBtn onClick={handlePicChange}>
                Change Picture
            </LogoActionBtn>
            {/* <LogoActionBtn onClick={handleFullScreen}>
                Full Screen
            </LogoActionBtn> */}
        </LogoActionBtnGrp>
    );
}

function LogoPreview({ path, handlePicChange, width = 512, height = 512, withActions = false }) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <>
            {!isFullScreen && <LogoBox>
                <CldImage
                    src={path}
                    alt="Uploaded image"
                    width={width}
                    height={height}
                    className="w-full h-full object-cover"
                />
            </LogoBox>}
            {isFullScreen && <LogoFullScreen>
                <CldImage
                    src={path}
                    alt="Uploaded image"
                    width="auto"
                    height="auto"
                />
                <LogoActionBtn onClick={handleFullScreen}>Exit</LogoActionBtn>
            </LogoFullScreen>

            }
            {withActions && <LogoActions handlePicChange={handlePicChange} handleFullScreen={handleFullScreen}></LogoActions>}
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

const LogoActionBtnGrp = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoActionBtn = styled.button`
`;

const LogoFullScreen = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    flex: 1;
    justify-content: center;
}`;

export { LogoPreview };