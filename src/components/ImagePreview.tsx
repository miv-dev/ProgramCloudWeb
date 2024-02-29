import React from "react";

interface ImagePreviewProps {
    url: string,
    alt: string
}


const ImagePreview = ({url, alt}: ImagePreviewProps) => {
    const [open, setOpen] = React.useState(false);


    return (
        <>
        <div
            
            className=" "
            >
            <img
                alt={alt}
                height="100%"
                width="100%"
                className="h-full min-w-[350px] min-h-0 object-contain object-center"
                src={url}
            />
        </div>

        </>
    )
}

export default ImagePreview