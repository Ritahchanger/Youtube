import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Download, AlertTriangle } from 'lucide-react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DownloadFile = () => {
  const navigate = useNavigate();
  const [resolution, setResolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoData = JSON.parse(localStorage.getItem("video"));
    if (videoData) {
      setThumbnail(videoData.thumbnail);
      setUrl(videoData.url);
    }
  }, []);

  const format = useSelector((state) => state.downloadFormat.format);

  const handleDownload = () => {
    if (!resolution) {
      setError("Please select a resolution.");
      return;
    }
    setLoading(true);
    setError("");

    fetch("https://ritahchanger.pythonanywhere.com/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        format: format,
        resolution: resolution,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Download Complete!",
          text: "Your video has been successfully downloaded.",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.clear();
          navigate("/");
        });
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred while downloading.");
      });
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white"
      style={{ backgroundSize: "cover", backgroundAttachment: "fixed" }}
    >
      {format === "video" ? (
        <h2 className="text-2xl font-bold ">Download MP4</h2>
      ) : (
        <h2 className="text-2xl font-bold ">Download MP3</h2>
      )}
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-700 p-4">
          <h2 className="text-2xl font-bold">YouTube Video Downloader</h2>
        </div>

        <div className="flex flex-col sm:flex-row p-6 space-x-0 sm:space-x-6">
          <div className="w-full sm:w-1/3">
            <img
              src={thumbnail || "https://via.placeholder.com/400"}
              alt="Video Thumbnail"
              className="w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
            />
          </div>

          <div className="w-full sm:w-2/3 flex flex-col justify-center mt-6 sm:mt-0">
            <h3 className="text-xl font-semibold text-orange-300 mb-4">
              Select Resolution
            </h3>

            {format === "video" && (
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="p-3 bg-gray-700 border border-neutral-600 text-white rounded-md mb-6 transition duration-200 hover:border-orange-500"
              >
                <option value="">Select Resolution</option>
                <option value="1080">1080p</option>
                <option value="720">720p</option>
                <option value="480">480p</option>
              </select>
            )}

            {error && (
              <div className="flex items-center text-red-500 mb-4">
                <AlertTriangle size={20} className="mr-2" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleDownload}
              className={`bg-orange-500 text-white py-3 px-8 rounded-md font-semibold hover:bg-orange-400 transition-all duration-300 transform ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                  <span>Downloading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Download size={20} />
                  <span>Download</span>
                </div>
              )}
            </button>

            {loading && (
              <div className="mt-4 w-full h-2 bg-gray-600 rounded-full">
                <div
                  className="h-2 bg-orange-400 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadFile;
