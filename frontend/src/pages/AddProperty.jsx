import React, { useEffect, useState } from "react";
import ExpressApi from "../services/ExpressApi";

function AddProperty() {
  const [equip, setEquip] = useState(null);
  const [files, setFiles] = useState([]);

  const [req, setReq] = useState({
    property: {
      id: 2,
      name: "",
      description: {
        image: [],
      },
      localisation: "",
      price: 90,
      information: "",
      pieces: 5,
    },
    equipments: [],
  });
  useEffect(() => {
    ExpressApi.get("/equipment")
      .then((res) => setEquip(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e, key) => {
    setReq({
      ...req,
      property: {
        ...req.property,
        [key]: e.target.value,
      },
    });
  };

  const submit = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("property", JSON.stringify(req.property));
    formData.append("equipments", JSON.stringify(req.equipments));

    ExpressApi.post("/property", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch((err) => console.error(err));
  };

  const handleOption = (elem) => {
    const equipmentExist = req.equipments.some(
      (equipment) => equipment.name === elem.name
    );

    if (equipmentExist) {
      const updatedEquipments = req.equipments.filter(
        (equipment) => equipment.name !== elem.name
      );
      setReq({ ...req, equipments: updatedEquipments });
    } else {
      setReq({ ...req, equipments: [...req.equipments, elem] });
    }
  };

  return (
    <div className=" flex flex-col mx-2 md:max-w-3xl lg:max-w-7xl md:mx-auto">
      <h1 className="text-center text-primary mt-10 font-bold text-xl">
        Mettre votre bien en ligne
      </h1>
      <div>
        <h1 className="mt-5 mb-3 text-center font-bold">Infos generale :</h1>

        <div className="flex flex-col mx-2 gap-3 my-3 ">
          <div className="flex-row justify-between flex">
            <label htmlFor="name">nom de l'annonce :</label>
            <input
              type="text"
              className="bg-slate-200"
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div className="flex-row justify-between flex">
            <label htmlFor="localisation">Ville de votre bien:</label>
            <input
              type="text"
              className="bg-slate-200"
              onChange={(e) => handleInputChange(e, "localisation")}
            />
          </div>
          <div className="flex-col flex">
            <label htmlFor="information">Resumé de l'annonce :</label>
            <textarea
              maxLength={170}
              type="text"
              className="bg-slate-200 h-28"
              onChange={(e) => handleInputChange(e, "information")}
            />
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-center font-bold">Equipements :</h1>

          <div className=" grid  grid-cols-2 md:grid-cols-4 gap-1 mx-3 my-3 ">
            {equip &&
              equip.map((elem) => (
                <li className="flex flex-row justify-between items-center border border-primary mx-1 p-2">
                  <p>{elem.name}</p>
                  <input
                    className="mx-2"
                    type="checkbox"
                    name={elem.name}
                    id=""
                    onChange={() => handleOption(elem)}
                  />
                </li>
              ))}
          </div>
        </div>

        <div className="mx-2">
          <h1 className="text-center font-bold mt-10 my-3">Photos:</h1>
          <p>Sélectionné vos photos :</p>
          <input
            className="p-3"
            type="file"
            name=""
            id=""
            multiple
            onChange={(e) => setFiles([...files, ...e.target.files])}
          />
          <div className="flex flex-col mx-3 gap-1 md:grid md:grid-cols-3">
            {files &&
              files.map((elem, index) => (
                <img
                  src={URL.createObjectURL(files[index])}
                  alt=""
                  className=" lg:h-56"
                />
              ))}
          </div>
        </div>
        <div className="flex  justify-center my-10">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => submit()}
          >
            Envoyez votre bien
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
