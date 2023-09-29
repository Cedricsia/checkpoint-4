import React, { useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import left from "../../public/images/arrow-left.svg";
import right from "../../public/images/arrow-right.svg";

function PropertyCard({ property }) {
  // const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [num, setnum] = useState(0);
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
    <div className="mb-3 ">
      <div className="relative">
        <div className="avatar">
          <button
            type="button"
            className="absolute bg-primary rounded-full text-secondary bottom-1/2 left-0 w-6 "
            onClick={() => {
              handlePrev(property.description.image);
            }}
          >
            <img src={left} alt="" />
          </button>
          <div
            className=" h-80 md:h-[22rem] rounded-xl "
            // onClick={() => navigate(`property/${property.id}`)}
          >
            <img
              src={`${backendUrl}/uploads/property/${property.description.image[num]}`}
              alt=""
            />
          </div>
          <button
            type="button"
            className="absolute bg-primary rounded-full text-secondary bottom-1/2 right-0 w-6  "
            onClick={() => {
              handleNext(property.description.image);
            }}
          >
            <img src={right} alt="" />
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg ">{property.name}</h1>
        <div className="text-slate-500">
          <p>{property.localisation}</p>
          <p>{property.pieces} pieces</p>
        </div>
        <div className="flex-row gap-1 flex">
          <p className="font-bold">{property.price} € </p>
          <p> par nuit </p>
        </div>
      </div>
    </div>
  );
}
PropertyCard.defaultProps = {
  property: {
    description: {
      image: [],
    },
    localisation: "",
    price: 0,
  },
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.shape({
      image: PropTypes.arrayOf(PropTypes.string),
    }),
    localisation: PropTypes.string,
    price: PropTypes.number,
    pieces: PropTypes.number,
  }),
};

export default PropertyCard;
