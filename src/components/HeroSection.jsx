import React, { useState } from "react";
import { toast } from "react-toastify";
import hero_1 from "../assets/hero_1.png";
import chain from "../assets/chain.png";
import { removebg } from "./APIManeger";
import loader from "../assets/i3.png";

const Header = () => {
  return (
    <div className="w-full py-4 bg-cyan-500 flex justify-center items-center fixed top-0">
      <nav className="px-6 h-full w-full flex justify-center items-center">
        <a href="#" className="text-center text-white text-2xl">
          BackGround Remover
        </a>
      </nav>
    </div>
  );
};

export default function HeroSection() {
  const [uploadImg, setUploadImg] = useState(null);
  const [processedImg, setProcessedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadClick = (e) => {
    const file = e.target.files[0];
    console.log(typeof file);
    if (file) {
      setUploadImg(file);
      setProcessedImg(null);
      toast.success("Image uploaded!", { theme: "colored" });
    }
  };

  const handleRemoveBg = async () => {
    if (!uploadImg) return toast.error("Image not uploaded!", { theme: "colored" });
    try {
      setLoading(true);
      const data = new FormData();
      data.append("image_file", uploadImg);
      data.append("size", "auto");
      const res = await removebg(data);
      const blob = new Blob([res]);
      // const array = [...typedArray];
      setProcessedImg(blob);
      toast.success("Background removed!", { theme: "colored" });
      setLoading(false);
    } catch (error) {
      toast.error(`Failed to remove background Reason Behind ${error} `, {
        theme: "colored",
      });
      setLoading(false);
    }
  };

  const downloadhandle = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(processedImg);
    a.download = "image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-center gap-5 mx-auto max-w-7xl h-screen items-center">
        <div className="w-[90%] text-3xl gap-3 md:text-5xl mt-[4rem] md:mt-[0rem] flex uppercase flex-col justify-center md:w-1/2">
          <h1 className="text-white">Remove Image</h1>
          <span className="text-cyan-500">Background</span>
          <p className="text-xl text-white/50">
            Get a transparent background for any image
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={hero_1}
            alt="hero_1"
            className="bg-cyan-500 p-5 md:rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center  gap-5 mx-auto max-w-7xl items-center">
        <div className="w-full md:w-1/2">
          <div className=" h-[60vh] flex justify-center ">
            <img
              src={uploadImg ? URL.createObjectURL(uploadImg) : chain}
              alt="chain"
              className="p-5 h-full w-full object-contain md:rounded-xl"
            />
          </div>
        </div>
        <div className="w-full text-2xl gap-3 md:text-3xl mt-[4rem] items-center md:mt-[0rem] flex uppercase flex-col justify-center md:w-1/2">
          <div className="h-[60vh] ">
            <img
              src={
                processedImg
                  ? URL.createObjectURL(processedImg)
                  : loading
                  ? loader
                  : chain
              }
              alt="processed img"
              className="p-5 h-full object-contain w-full md:rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 max-w-7xl justify-between items-center mx-auto mt-4 mb-10 ">
        <div className="cursor-pointer flex justify-center w-full sm:w-1/2 mx-auto">
          <label
            htmlFor="forimg"
            className="bg-white mx-auto w-[90%] px-5 flex justify-center items-center text-cyan-500 cursor-pointer  py-2 rounded-full"
          >
            Upload Image
          </label>
          <input
            onChange={handleUploadClick}
            type="file"
            id="forimg"
            className="absolute bg-white hidden text-teal-800 rounded-full text-md cursor-pointer border border-gray-300 outline-none text-center px-4 py-2  hover:bg-gray-100 focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className=" sm:w-1/2 w-full  flex justify-center">
          {!processedImg ? (
            <button
              onClick={handleRemoveBg}
              className="bg-cyan-500 mx-auto w-[90%] px-5  text-white py-2 rounded-full"
            >
              Remove Background
            </button>
          ) : (
            <button
              onClick={downloadhandle}
              className="bg-cyan-500 mx-auto w-[90%] px-5  text-white py-2 rounded-full"
            >
              DownLoad Image
            </button>
          )}
        </div>
      </div>
    </>
  );
}
