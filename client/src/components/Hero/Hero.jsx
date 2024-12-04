import { useState } from "react";
import axios from "axios";
import Preloader from "../Preloader/Preloader";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Hero = () => {
  const format = useSelector((state) => state.downloadFormat.format);

  console.log(format)

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const fetchThumbnail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Fetching thumbnail for URL:", url);

      if (url.trim() === "") {
        Swal.fire({
          icon: "error",
          text: "Enter url kindly",
          confirmButtonText: "OK",
        });
        return;
      }

      const response = await axios.post(
        "https://ritahchanger.pythonanywhere.com/thumbnail",
        { url: url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem(
        "video",
        JSON.stringify({ thumbnail: response.data.thumbnail, url: url })
      );

      setUrl("");
      navigate("/single");
    } catch (error) {
      console.error("Error fetching thumbnail:", error);
      alert("Failed to fetch thumbnail. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full flex justify-center items-center bg-gray-100 py-16 sm:py-24 md:py-32 hero"
      style={{
        height: "cal(100vh - 60px)",
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {format === "video" ? (
          <h3 className="text-center text-3xl mb-4 text-blue-500 border-b border-blue-500">
            DOWNLOAD MP4
          </h3>
        ) : (
          <h3 className="text-center text-3xl mb-4 text-blue-500 border-b border-blue-500">
            DOWNLOAD MP3
          </h3>
        )}
        <div className="text-center mb-8">
          <h3 className="text-4xl font-semibold text-blue-600 sm:text-3xl md:text-4xl">
            Daniolla Video Downloader
          </h3>
          <p className="text-lg text-gray-600 mt-2 sm:text-base">
            Download videos from Daniolla with ease
          </p>
        </div>

        <form onSubmit={fetchThumbnail} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Please enter the YouTube URL..."
              className="w-full h-[50px] border border-neutral-300 px-4 py-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500 text-xl">
              <i className="fas fa-link"></i>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300"
          >
            {loading ? "Fetching video..." : "Fetch video"}
          </button>
        </form>

        {loading && <Preloader />}
      </div>
    </div>
  );
};

export default Hero;
