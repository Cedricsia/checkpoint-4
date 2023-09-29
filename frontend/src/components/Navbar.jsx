import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.svg";

import ModalConnexion from "./Modalconnexion";
import ModalCreateAccount from "./ModalCreateAccount";
import ExpressApi from "../services/ExpressApi";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    if (id) {
      ExpressApi.get(`/user/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const openConnectionModal = () => {
    document.getElementById("login").showModal();
  };

  return (
    <div className="">
      <div className="flex h-[10vh]  items-center justify-between bg-secondary border-b-2 border-primary ">
        <div className="flex flex-row items-center gap-2 ml-2">
          <button type="button" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="w-34 md:w-40 lg:w-40" />
          </button>
          <h1 className=" hidden text-3xl text-primary font-extrabold w-full tracking-wider md:flex ">
            evasion
          </h1>
        </div>
        <NavLink to="/add-property">Ajouter un bien</NavLink>

        <div className="mr-2">
          {user ? (
            <div className="avatar">
              <div className="rounded-full h-12 md:h-20 mx-auto">
                <NavLink to="/profile">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/user/${
                      user.image
                    }`}
                    alt="plat"
                    className=""
                  />
                </NavLink>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="text-primary"
              onClick={openConnectionModal}
            >
              Se connecter
            </button>
          )}
        </div>
      </div>

      <ModalCreateAccount />
      <ModalConnexion />
    </div>
  );
}

export default Navbar;
