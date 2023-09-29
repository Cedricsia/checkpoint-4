import React, { useState } from "react";
import PropTypes from "prop-types";

function BookingModal({ all }) {
  const [night, setNight] = useState(null);

  const [departDate, setDepartDate] = useState(null);
  const [arrivaltDate, setArrivaltDate] = useState(null);
  const handleDepart = (e) => {
    setDepartDate(e.target.value);
    if (arrivaltDate !== null && e.target.value) {
      const dateArriveeObj = new Date(arrivaltDate);
      const dateDepartObj = new Date(e.target.value);
      const timeDiff = dateArriveeObj.getTime() - dateDepartObj.getTime();

      const differenceEnJours = (timeDiff / (1000 * 3600 * 24)) * -1;

      if (differenceEnJours > 0) {
        setNight(differenceEnJours);
      }
    }
  };
  const handleArrival = (e) => {
    setArrivaltDate(e.target.value);
    if (e.target.value && departDate !== null) {
      const dateArriveeObj = new Date(e.target.value);
      const dateDepartObj = new Date(departDate);
      const timeDiff = dateArriveeObj.getTime() - dateDepartObj.getTime();

      const differenceEnJours = (timeDiff / (1000 * 3600 * 24)) * -1 - 1;
      if (differenceEnJours > 0) {
        setNight(differenceEnJours);
      }
    }
  };
  const handleDiff = () => {
    if (arrivaltDate !== null && departDate !== null) {
      const dateArriveeObj = new Date(arrivaltDate);
      const dateDepartObj = new Date(departDate);
      const timeDiff = dateArriveeObj.getTime() - dateDepartObj.getTime();

      const differenceEnJours = (timeDiff / (1000 * 3600 * 24)) * -1;
      setNight(differenceEnJours);
    }
  };

  return (
    <div>
      {all && (
        <dialog id="my_modal_1" className="modal bg-opacity-25">
          <div className="modal-box bg-secondary">
            <div className="  bg-secondary rounded-xl  border border-primary p-5">
              <h1 className="p-3 text-center text-primary font-bold">
                Reservé{" "}
              </h1>
              <div className="flex flex-row justify-center gap-3">
                <div>
                  <p>Arrivé:</p>
                  <input
                    type="date"
                    name=""
                    id=""
                    onChange={(e) => handleArrival(e)}
                  />
                </div>
                <div>
                  <p>Départ:</p>
                  <input
                    type="date"
                    name=""
                    id=""
                    onChange={(e) => handleDepart(e)}
                  />
                </div>
              </div>
              <div className="text-center py-3">
                <p>Prix par nuit: {all.property.price} €</p>
              </div>
              {night && (
                <p className="text-center my-3">nombre de nuit :{night}</p>
              )}
              <div className="flex flex-row justify-between items-center  px-4">
                <div className="flex flex-row gap-2">
                  <p className="font-bold">Total:</p>
                  {night && <p> {all.property.price * night} €</p>}
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleDiff()}
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
BookingModal.propTypes = {
  all: PropTypes.shape({
    property: PropTypes.shape({
      price: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default BookingModal;
