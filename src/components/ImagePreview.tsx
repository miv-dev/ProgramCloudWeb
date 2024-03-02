import { XMarkIcon } from "@heroicons/react/24/outline";
import React, {useEffect} from "react";

interface ImagePreviewProps {
    url: string,
    alt: string
}


const ImagePreview = ({url, alt}: ImagePreviewProps) => {
    const [open, setOpen] = React.useState(false);


    useEffect(()=> {

    }, [window])


    return (
        <>
            { open &&
                <div
                    className="top-0 bottom-0 fixed inset-0 z-50 outline-none focus:outline-none bg-slate-900/30 p-10">
                    <div className="flex flex-col bg-white rounded-lg h-full relative">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-5 top-5  grid place-items-center rounded-md p-1 font-sans text-xs font-bold uppercase text-slate-400 transition-all hover:bg-slate-500/10 active:bg-slate-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                            <XMarkIcon className="h-8 w-8"/>

                        </button>
                        <img
                            alt={alt}
                            className="h-full w-full min-h-0 min-w-0 object-contain object-center m-2"
                            src={url}
                        />
                    </div>
                </div>


            }
            <div className="relative ">
                <div className="absolute w-full h-full hover:bg-gray-500/10 rounded-md transition-all"                     onClick={() => setOpen(true)}
                    >

                </div>
                <img
                    alt={alt}
                    height="100%"
                    width="100%"
                    className="h-full min-w-[150px] w-full min-h-0 object-contain object-center"
                    src={url}
                />
            </div>

        </>
    )
}

export default ImagePreview