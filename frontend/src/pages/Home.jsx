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
    <div className=" bg-secondary flex-col flex w-full h-[90vh]">
      <div className="max-w-7xl ">
        <div className="bg-blue-200 h-20 mt-10 "> </div>
        <div className=" ">
          {properties &&
            properties.map((property) => <PropertyCard property={property} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
