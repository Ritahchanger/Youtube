import React, { useState, useEffect } from "react";

const DownloadFile = () => {
  const [resolution, setResolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const videoData = JSON.parse(localStorage.getItem('video'));
    if (videoData) {
      setThumbnail(videoData.thumbnail);
      setUrl(videoData.url);
    }
  }, []);

  const handleDownload = () => {
    if (!resolution) {
      setError("Please select a resolution.");
      return;
    }
    setLoading(true);
    setError("");

    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url, 
        resolution: resolution,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        alert(`Download started! File path: ${data.filePath}`);
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred while downloading.");
      });
  };

  return (
    <div
      className="w-full flex justify-center flex-col items-center"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <div className="flex justify-between w-full max-w-[1200px] px-[3rem] gap-10">
        <div className="w-1/2">
          <img
            src={thumbnail || "https://via.placeholder.com/400"} // Fallback if thumbnail is unavailable
            alt="Video Thumbnail"
            className="w-full rounded-md border-6 border-neutral-400"
          />
        </div>
        <div className="flex flex-col w-1/2 justify-center">
          <h3 className="text-rose-600 text-sm font-semibold mb-4">
            SELECT RESOLUTION
          </h3>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="border border-neutral-300 p-2 mb-4 rounded-md"
          >
            <option value="">Select Resolution</option>
            <option value="1080">1080p</option>
            <option value="720">720p</option>
            <option value="480">480p</option>
          </select>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            onClick={handleDownload}
            className="bg-orange-500 text-white w-32 h-12 rounded-md"
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadFile;
