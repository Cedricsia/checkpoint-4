import React, { useState } from "react";
import PropTypes from "prop-types";

function ModalSearch({ setCity }) {
  const [champs, setChamps] = useState("");
  const handleSearch = () => {
    setCity(champs);
    document.getElementById("search").close();
  };

  return (
    <dialog id="search" className="modal">
      <div className="modal-box bg-secondary">
        <div id="recherche" className="flex flex-col">
          <div>
            <p>Localisation</p>
            <input
              type="text"
              className="bg-slate-200"
              onChange={(e) => setChamps(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Date D'arrivé:</p>
            <input type="date" name="" id="" className="bg-slate-200" />
            <p>Date de Depart</p>

            <input type="date" name="" id="" className=" bg-slate-200" />
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
ModalSearch.propTypes = {
  setCity: PropTypes.func.isRequired,
};

export default ModalSearch;
