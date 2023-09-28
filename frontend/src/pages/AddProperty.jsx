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
    <div className=" flex flex-col">
      <h1>Mettre votre bien en ligne</h1>
      <div>
        <h1>Infos generale :</h1>
        <form action="">
          <div>
            <label htmlFor="name">nom de l'annonce :</label>
            <input
              type="text"
              className="bg-slate-200"
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div>
            <label htmlFor="information">Resumé de l'annonce </label>
            <input
              type="text"
              className="bg-slate-200"
              onChange={(e) => handleInputChange(e, "information")}
            />
          </div>
          <div>
            <label htmlFor="localisation">Ville de votre bien </label>
            <input
              type="text"
              className="bg-slate-200"
              onChange={(e) => handleInputChange(e, "localisation")}
            />
          </div>
          <div>
            <h1>Equipements</h1>
            {equip &&
              equip.map((elem) => (
                <li className="flex flex-row">
                  <p>{elem.name}</p>

                  <input
                    type="checkbox"
                    name={elem.name}
                    id=""
                    onChange={() => handleOption(elem)}
                  />
                </li>
              ))}
          </div>
        </form>
        <div>
          <input
            type="file"
            name=""
            id=""
            multiple
            onChange={(e) =>
              setFiles([...files, ...Array.from(e.target.files)])
            }
          />
          <div>
            {files &&
              files.map((elem, index) => (
                <img
                  src={URL.createObjectURL(files[index])}
                  alt=""
                  className="h-10"
                />
              ))}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => submit()}
        >
          go
        </button>
      </div>
    </div>
  );
}

export default AddProperty;
