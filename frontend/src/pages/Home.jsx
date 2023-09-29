import React, { useEffect, useState } from "react";
import expressApi from "../services/ExpressApi";
import PropertyCard from "../components/PropertyCard";

function Home() {
  const [properties, setPorperties] = useState(null);
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
      <div className="max-w-7xl mx-auto grid grid-cols-5">
        {properties &&
          properties.map((property) => <PropertyCard property={property} />)}
      </div>
    </div>
  );
}

export default Home;
