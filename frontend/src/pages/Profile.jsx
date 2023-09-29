import React, { useEffect, useState } from "react";
import ExpressApi from "../services/ExpressApi";
import PropertyCard from "../components/PropertyCard";
import avatar from "../../public/images/avatar.svg";

function Profile() {
  const [user, setUser] = useState(null);
  const [property, setProperty] = useState(null);
  const [modify, setModify] = useState(false);
  const [file, setFile] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handlechangeInput = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };

  const handlesubmit = () => {
    const id = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    formData.append("file", file[0]);

    ExpressApi.put(`/user/${id}`, formData)
      .then(() => {
        setModify(!modify);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    ExpressApi.delete(`/property/${id}`)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));

    ExpressApi.get(`/user-all/${id}`)
      .then((res) => {
        const { data } = res;
        setUser(data.user);
        setProperty(data.property);
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <div className="mx-2">
      {user && (
        <div>
          <div>
            <h1 className="text-center">{user.pseudo}</h1>
          </div>
          <div>
            {modify ? (
              <div>
                <div className="flex flex-col items-center">
                  {file.length ? (
                    <div className="avatar">
                      <div className="rounded-full h-20 mx-auto">
                        <img
                          src={URL.createObjectURL(file[0])}
                          className=""
                          alt="plat"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      {user.image ? (
                        <div className="avatar">
                          <div className="rounded-full h-20 mx-auto">
                            <img
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/uploads/user/${user.image}`}
                              alt="plat"
                              className=""
                            />
                          </div>
                        </div>
                      ) : (
                        <img src={avatar} alt="" className="h-20 mx-auto" />
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    name=""
                    id=""
                    className=""
                    onChange={(e) => setFile(e.target.files)}
                  />
                </div>

                <div className="flex flex-row justify-between">
                  <p>Nom:</p>
                  <input
                    type="text"
                    defaultValue={user.firstname}
                    className="bg-slate-200"
                    onChange={(e) => handlechangeInput(e, "firstname")}
                  />
                </div>

                <div className="flex flex-row justify-between">
                  <p>Prenom:</p>
                  <input
                    type="text"
                    defaultValue={user.lastname}
                    className="bg-slate-200"
                    onChange={(e) => handlechangeInput(e, "lastname")}
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <p>Pseudo :</p>
                  <input
                    type="text"
                    defaultValue={user.pseudo}
                    className="bg-slate-200"
                    onChange={(e) => handlechangeInput(e, "pseudo")}
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <p>mail: </p>
                  <input
                    type="text"
                    defaultValue={user.mail}
                    className="bg-slate-200"
                    onChange={(e) => handlechangeInput(e, "mail")}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center">
                  {user.image ? (
                    <div className="avatar">
                      <div className="rounded-full h-20 mx-auto">
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/uploads/user/${user.image}`}
                          alt="plat"
                          className=""
                        />
                      </div>
                    </div>
                  ) : (
                    <img src={avatar} alt="" className="h-20 mx-auto" />
                  )}
                </div>

                <p>Nom: {user.firstname}</p>
                <p>Prenom:{user.lastname}</p>
                <p>Pseudo: {user.pseudo}</p>
                <p>mail: {user.mail} </p>
              </div>
            )}
            <div className="flex flex-row justify-center">
              {modify ? (
                <button
                  type="button"
                  className="btn btn-primary m-3"
                  onClick={handlesubmit}
                >
                  Validé
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary m-3"
                  onClick={() => setModify(!modify)}
                >
                  Modifier
                </button>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-center">propriété</h1>
            <div className="grid grid-cols-2">
              {property &&
                property.map((elem) => (
                  <div className="flex flex-col items-center">
                    <PropertyCard property={elem} />
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleDelete(elem.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
