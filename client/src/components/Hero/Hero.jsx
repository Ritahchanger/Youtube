const Hero = () => {
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
        <form>
          <input
            type="text"
            id="youtube-url"
            placeholder="Please enter the YouTube URL..."
            className="w-full h-[40px] border border-neutral-300 px-[10px] py-[5px]"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-sm h-[36px] text-white mt-[2rem]"
          ></button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
