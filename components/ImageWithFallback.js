import { CldImage } from "next-cloudinary";

import { useState } from "react";

export default function ImageWithFallback({
  src: srcProp,
  fallback = "v1688425710/oyteam/y9vkg2c0im9l8eul5oa2.jpg",
  width,
  height,
  className,
}) {
  const [srcc, setSrc] = useState(srcProp);
  return (
    <CldImage
      src={srcc}
      alt="profile image"
      width={width}
      height={height}
      className={className}
      onError={() => {
        setSrc(fallback);
      }}
    />
  );
}
