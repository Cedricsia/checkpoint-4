import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import expressApi from "../services/ExpressApi";
import BookingModal from "../components/BookingModal";
import left from "../../public/images/arrow-left.svg";
import right from "../../public/images/arrow-right.svg";

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
      <div className=" sm:mx-0 max-w-7xl lg:mx-auto md:mx-3 bg-secondary">
        <div className=" ">
          {all && (
            <div className="flex flex-col bg-secondary md:text-2xl   ">
              <div className="hidden md:flex my-5 text-2xl ">
                <h1 className="text-center w-full font-bold">
                  {all.property.name}
                </h1>
              </div>
              <div className="flex  lg:gap-5">
                <div id="caroussel" className="relative  lg:w-1/2">
                  <img
                    src={`${backendUrl}/uploads/property/${all.property.description.image[num]}`}
                    alt=""
                    className="w-full md:rounded-xl"
                  />
                  <button
                    type="button"
                    className="absolute bg-primary rounded-full text-secondary bottom-1/2 left-0 w-6 md:h-12 md:w-12 "
                    onClick={() => {
                      handlePrev(all.property.description.image);
                    }}
                  >
                    <img src={left} alt="" />
                  </button>
                  <button
                    type="button"
                    className="absolute bg-primary rounded-full text-secondary bottom-1/2 right-0 w-6  md:h-12 md:w-12 "
                    onClick={() => {
                      handleNext(all.property.description.image);
                    }}
                  >
                    <img src={right} alt="" />
                  </button>
                </div>
                <div className="lg:w-1/2">
                  <div className="hidden lg:grid lg:grid-cols-2 gap-3  h-full">
                    <div className="rounded-xl">
                      <img
                        src={`${backendUrl}/uploads/property/${all.property.description.image[1]}`}
                        alt="w-30"
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <img
                        src={`${backendUrl}/uploads/property/${all.property.description.image[2]}`}
                        alt=""
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <img
                        src={`${backendUrl}/uploads/property/${all.property.description.image[3]}`}
                        alt=""
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <img
                        src={`${backendUrl}/uploads/property/${all.property.description.image[4]}`}
                        alt=""
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:flex">
                <div className="lg:w-2/3">
                  <div
                    id="title"
                    className=" sm:mx-3 lg:mx-0  my-2 text-center"
                  >
                    <h1 className="  m-5 text-xl font-bold md:hidden">
                      {all.property.name}
                    </h1>
                    <p className=" text-primary">{all.property.localisation}</p>
                    <p className="italic">{all.property.pieces} Pièces</p>
                  </div>
                  <div
                    id="description "
                    className="mx-3 py-5 border-y border-primary"
                  >
                    <p className="italic">{all.property.information}</p>
                  </div>
                  <div className="my-5 mx-3">
                    <h1 className="font-bold text-center ">Équiment</h1>
                    <div className="grid grid-cols-2 lg:grid-cols-3 p-3 mx-auto">
                      {all.equipments.map((equip) => (
                        <li key={equip.name}>{equip.name}</li>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  id="resa"
                  className="sticky bottom-0 bg-secondary lg:hidden"
                >
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

                <div
                  id="resa lg"
                  className=" hidden lg:flex  lg:flex-col  justify-center w-1/3 "
                >
                  <div className=" bg-secondary  rounded-xl  border border-primary">
                    <h1 className=" text-center text-primary font-bold">
                      Reservation
                    </h1>
                    <div className="flex flex-col p-6 justify-center items-center gap-3">
                      <div className="flex flex-row gap-3">
                        <p>Arrivé:</p>
                        <input
                          type="date"
                          name=""
                          id=""
                          onChange={(e) => handleArrival(e)}
                        />
                      </div>
                      <div className="flex flex-row gap-3">
                        <p>Départ:</p>
                        <input
                          type="date"
                          name=""
                          id=""
                          onChange={(e) => handleDepart(e)}
                        />
                      </div>
                    </div>
                    <div className="text-center p-2 w-">
                      <p>Prix par nuit: {all.property.price} €</p>
                    </div>
                    {night && (
                      <p className="text-center  p-2">
                        nombre de nuit :{night}
                      </p>
                    )}
                    <div className="text-center  p-2">
                      <div className="flex-row flex justify-center  p-2">
                        <p className="">Total:</p>
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
              </div>
            </div>
          )}
        </div>
        <BookingModal all={all} />
      </div>
    </div>
  );
}

export default Property;
