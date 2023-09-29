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
      <div className="  flex flex-wrap lg:mx-6 justify-center gap-6 ">
        {properties &&
          properties
            .filter((elem) =>
              elem.localisation
                .toLocaleLowerCase()
                .includes(city.toLocaleLowerCase())
            )
            .map((property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
      </div>
      <ModalSearch properties={properties} setCity={setCity} />
    </div>
  );
}

export default Home;
