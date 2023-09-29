import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.svg";
import menu from "../../public/images/Frame.svg";

import ModalConnexion from "./Modalconnexion";
import ModalCreateAccount from "./ModalCreateAccount";
import ExpressApi from "../services/ExpressApi";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [test, setTest] = useState(false);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    if (id) {
      ExpressApi.get(`/user/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [test]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setUser(null);
  };

  const openConnectionModal = () => {
    document.getElementById("login").showModal();
  };

  return (
    <div className="text-xl border-b-2 border-primary">
      <div className="flex h-[10vh]  items-center justify-between  bg-secondary  mx-2 ">
        <div className="flex-row flex items-center">
          <button type="button" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="h-24" />
          </button>
          <h1 className="hidden md:flex text-primary font-bold ">evasion</h1>
        </div>

        <div className="">
          {user && user !== null ? (
            <div>
              <div className="md:hidden">
                <div className="dropdown dropdown-end">
                  <button type="button" tabIndex={0} className="">
                    <img src={menu} alt="" className="h-10 mr-3" />
                  </button>
                  <button
                    type="button"
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2  bg-secondary rounded-box w-52 text-primary"
                  >
                    <li>
                      <Link to="/add-property" className="text-primary">
                        Ajouter un bien
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile">Profil</Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="text-primary"
                        onClick={handleLogout}
                      >
                        Déconnexion
                      </button>
                    </li>
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="flex flex-row">
                  {user !== null && (
                    <div className="hidden md:flex">
                      <NavLink to="/add-property" className="text-primary">
                        Ajouter un bien
                      </NavLink>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-primary mx-3 hidden md:flex "
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
                <div className="avatar hidden md:flex">
                  <div className="rounded-full h-12 md:h-20 mx-3">
                    <NavLink to="/profile">
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/uploads/user/${user.image}`}
                        alt="plat"
                        className=""
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <button
                type="button"
                className="text-primary "
                onClick={openConnectionModal}
              >
                Se connecter
              </button>
            </div>
          )}
        </div>
      </div>
      <ModalCreateAccount />
      <ModalConnexion setTest={setTest} />
    </div>
  );
}

export default Navbar;
