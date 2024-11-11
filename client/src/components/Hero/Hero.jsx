import { useState } from "react";
import axios from "axios";
import Preloader from "../Preloader/Preloader";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const fetchThumbnail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Fetching thumbnail for URL:", url);

      const response = await axios.post(
        "http://localhost:5000/thumbnail",
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
      className="w-full flex justify-center flex-col items-center"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <div>
        <h3 className="text-4xl">
          <span className="text-blue-500 font-semibold">Daniolla</span> Video
          Downloader
        </h3>
        <p className="text-center mt-[1rem]">Download videos from Daniolla</p>
      </div>
      <div className="max-w-[600px] w-full">
        <form onSubmit={fetchThumbnail}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Please enter the YouTube URL..."
            className="w-full h-[40px] border border-neutral-300 px-[10px] py-[5px]"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-sm h-[36px] text-white mt-[2rem]"
          >
            Fetch Thumbnail
          </button>
        </form>
      </div>
      {loading && <Preloader />}
    </div>
  );
};

export default Hero;
