const Navbar = () => {
  return (
    <div className="h-[40px] shadow-md w-ful flex items-center justify-between px-[3rem]">
      <div>
        <a href="#" className="text-orange-600 font-semibold tracking-widest">
          DOWNLOADER
        </a>
      </div>
      <div>
        <ul className="flex gap-10">
          <li className="bg-orange-500">
            <a
              href="#"
              className="text-sm  text-white py-1 px-[2rem] border border-orange-500 block "
            >
              MP4
            </a>
          </li>
          <li className="bg-orange-500">
            <a
              href="#"
              className="text-sm  text-white py-1 px-[2rem] border border-orange-500 block"
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
