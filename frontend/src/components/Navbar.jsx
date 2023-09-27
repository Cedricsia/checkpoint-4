import React, { useState } from "react";
import logo from "../../public/images/logo.svg";
import avatar from "../../public/images/avatar.svg";

function Navbar() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex h-[10vh]  items-center justify-between bg-secondary border-b-2 border-primary ">
        <div className="flex flex-row items-center gap-2 ml-2">
          <img src={logo} alt="" className="w-34 md:w-40 lg:w-40" />
          <h1 className=" hidden text-3xl text-primary font-extrabold w-full tracking-wider md:flex ">
            evasion
          </h1>
        </div>
        <div>
          <button
            type="button"
            className=" w-32 rounded-xl h-8 md:h-10 md:w-48 bg-primary   text-secondary flex items-center justify-center"
            onClick={() => setVisible(!visible)}
          >
            Rechercher
          </button>
        </div>
        <div className="mr-2">
          <img src={avatar} alt="" className="w-10 md:w-20 lg:w-20" />
        </div>
      </div>
      {visible && (
        <div
          id="recherche"
          className="flex flex-row items-center justify-center gap-2 m-5 p-2"
        >
          <div>
            <input type="text" className="bg-slate-600" />
          </div>
          <div className="flex flex-col">
            <input type="date" name="" id="" className="bg-primary" />

            <input type="date" name="" id="" className="bg-primary" />
          </div>
          <div>
            <button type="button" className="btn btn-primary ">
              Rechercher
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
