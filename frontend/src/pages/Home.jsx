import React, { useEffect, useState } from "react";
import expressApi from "../services/ExpressApi";
import PropertyCard from "../components/PropertyCard";
import ModalSearch from "../components/ModalSearch";

function Home() {
  const [properties, setPorperties] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    expressApi
      .get(`/property`)
      .then((res) => {
        setPorperties(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="  ">
      <div className="flex justify-center my-5">
        <button
          type="button"
          className="btn btn-primary text-secondary"
          onClick={() => document.getElementById("search").showModal()}
        >
          rechercher
        </button>
      </div>
      <div className="lg:max-w-7xl md:max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
        {properties &&
          properties
            .filter((elem) =>
              elem.localisation
                .toLocaleLowerCase()
                .includes(city.toLocaleLowerCase())
            )
            .map((property) => <PropertyCard property={property} />)}
      </div>
      <ModalSearch properties={properties} setCity={setCity} />
    </div>
  );
}

export default Home;
