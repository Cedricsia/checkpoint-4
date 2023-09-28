import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import expressApi from "../services/ExpressApi";
import BookingModal from "../components/BookingModal";

function Property() {
  const [night, setNight] = useState(null);
  const [all, setall] = useState(null);
  const [departDate, setDepartDate] = useState(null);
  const [arrivaltDate, setArrivaltDate] = useState(null);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [num, setnum] = useState(0);

  useEffect(() => {
    expressApi
      .get(`/property/${id}`)
      .then((res) => {
        setall(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleDiff = () => {
    if (arrivaltDate !== null && departDate !== null) {
      const dateArriveeObj = new Date(arrivaltDate);
      const dateDepartObj = new Date(departDate);
      const timeDiff = dateArriveeObj.getTime() - dateDepartObj.getTime();

      const differenceEnJours = (timeDiff / (1000 * 3600 * 24)) * -1;
      setNight(differenceEnJours);
    }
  };
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

  const handleNext = (arr) => {
    if (num < arr.length - 1) {
      setnum(num + 1);
    }
  };
  const handlePrev = () => {
    if (num > 0) {
      setnum(num - 1);
    }
  };

  return (
    <div className="w-full bg-secondary">
      <div className=" lg:flex lg:flex-row lg:max-w-7xl lg:mx-auto lg:justify-center ">
        {all && (
          <div className="flex flex-col bg-secondary md:text-2xl  lg:w-3/4 ">
            <div className="hidden md:flex my-5 text-2xl ">
              <h1 className="text-center w-full font-bold">
                {all.property.name}
              </h1>
            </div>
            <div id="caroussel" className="">
              <img
                src={`${backendUrl}/uploads/property/${all.property.description.image[num]}`}
                alt=""
                className="w-full"
              />
              <button
                type="button"
                className="absolute bg-primary rounded-full text-secondary bottom-1/2 left-1 w-6 md:h-12 md:w-12 "
                onClick={() => {
                  handlePrev(all.property.description.image);
                }}
              >
                &lt;
              </button>
              <button
                type="button"
                className="absolute bg-primary rounded-full text-secondary bottom-1/2 right-1 w-6  md:h-12 md:w-12 "
                onClick={() => {
                  handleNext(all.property.description.image);
                }}
              >
                &gt;
              </button>
            </div>
            <div>
              <div id="title" className=" mx-3  my-2 text-center">
                <h1 className="  m-5 text-xl font-bold md:hidden">
                  {all.property.name}
                </h1>
                <p className=" text-primary">{all.property.localisation}</p>
                <p className="italic">
                  {all.property.description.pieces} Pièces
                </p>
              </div>
              <div
                id="description "
                className="mx-3 py-5 border-y border-primary"
              >
                <p className="italic">{all.property.description.information}</p>
              </div>
              <div className="my-5 mx-3">
                <h1 className="font-bold text-center">Équiment</h1>
                {all.equipments.map((equip) => (
                  <p key={equip.name}>{equip.name}</p>
                ))}
              </div>
            </div>
            <div id="resa" className="sticky bottom-0 bg-secondary lg:hidden">
              <div className="flex flex-row justify-between items-center py-3 border border-t-primary px-4">
                <div className="flex flex-row gap-2">
                  <p className="font-bold">{all.property.price} €</p>
                  <p>par nuit</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        )}
        {all && (
          <div
            id="resa lg"
            className=" hidden lg:flex lg:items-center lg:justify-center w-1/4 "
          >
            <div className=" w-96 bg-secondary h-56 rounded-xl  border border-primary">
              <h1 className="p-3 text-center text-primary font-bold">
                Reservé{" "}
              </h1>
              <div className="flex flex-row justify-center gap-3">
                <div>
                  <p>Arrivé</p>
                  <input
                    type="date"
                    name=""
                    id=""
                    onChange={(e) => handleArrival(e)}
                  />
                </div>
                <div>
                  <p>Départ</p>
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
              {night && <p className="text-center">nombre de nuit :{night}</p>}
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
        )}
      </div>
      <BookingModal all={all} />
    </div>
  );
}

export default Property;
