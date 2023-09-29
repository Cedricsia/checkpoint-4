import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {
  const navigate = useNavigate();
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
    <div className=" m-5 w-32 ">
      <div className="relative">
        <button
          type="button"
          className="absolute bg-primary rounded-full text-secondary bottom-1/2 left-0 w-6"
          onClick={() => {
            handlePrev(property.description.image);
          }}
        >
          &lt;
        </button>
        <div className="avatar">
          <div className=" rounded-xl">
            <img
              src={`${backendUrl}/uploads/property/${property.description.image[num]}`}
              alt=""
              className=" w-full rounded-lg"
            />
            <button
              type="button"
              className="absolute bg-primary rounded-full text-secondary bottom-1/2 right-0 w-6  "
              onClick={() => {
                handleNext(property.description.image);
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => navigate(`property/${property.id}`)}>
        <p className="font-bold">{property.localisation}</p>
        <div>{property.price} € par nuit </div>
      </button>
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
    description: PropTypes.shape({
      image: PropTypes.arrayOf(PropTypes.string),
    }),
    localisation: PropTypes.string,
    price: PropTypes.number,
  }),
};

export default PropertyCard;
