import { useDispatch } from "react-redux";

import { setAudio, setVideo } from "../../Redux/Features.jsx/FileFormatSlice";
const Navbar = () => {
  const dispatch = useDispatch();

  const setFormat = (format) => {
    if (format.toLowerCase() === "audio") {
      dispatch(setAudio(format));
    } else {
      dispatch(setVideo(format));
    }
  };

  return (
    <div className="h-[60px] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg w-full flex items-center justify-between px-[3rem] text-white border-b-2 border-blue-400">
      <div>
        <a
          href="#"
          className="text-2xl font-semibold tracking-widest hover:text-orange-300 transition duration-300"
        >
          Daniolla
        </a>
      </div>
      <div>
        <ul
          className="flex gap-8"
          onClick={() => {
            setVideo("video");
          }}
        >
          <li
            className="bg-orange-500 hover:bg-orange-400 transition duration-200 rounded-lg shadow-md"
            onClick={() => {
              setFormat("video");
            }}
          >
            <a
              href="#"
              className="text-sm text-white py-2 px-[2rem] border border-orange-500 block rounded-lg hover:text-black"
            >
              MP4
            </a>
          </li>
          <li
            className="bg-orange-500 hover:bg-orange-400 transition duration-200 rounded-lg shadow-md"
            onClick={() => {
              setFormat("audio");
            }}
          >
            <a
              href="#"
              className="text-sm text-white py-2 px-[2rem] border border-orange-500 block rounded-lg hover:text-black"
            >
              MP3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
