import React from "react";

function ModalConnexion() {
  const openCreateAccountModal = () => {
    document.getElementById("login").close();
    document.getElementById("creationModal").showModal();
  };
  const closeModal = () => {
    document.getElementById("login").close();
  };
  return (
    <dialog id="login" className="bg-transparent drop-shadow-lg modal">
      <form
        // onSubmit={handleSubmit}
        method="dialog"
        className="modal-box shadow-none bg-secondary text-base-content md:w-[56rem]"
      >
        <h2 className="font-bold text-xl text-center">Connectez-vous</h2>
        <div>
          <p className="pt-4 pb-1 text-left font-bold">Email</p>
          <input
            id="mail"
            // value={fields.mail}
            name="mail"
            // onChange={handleChange}
            type="mail"
            className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="pt-4 pb-1 text-left font-bold">Mot de passe</p>
          <input
            id="password"
            // value={fields.password}
            name="password"
            // onChange={handleChange}
            type="password"
            className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-primary px-8 py-1 text-secondary rounded-md mt-8 w-56 lg:mt-14"
          >
            Se connecter
          </button>
        </div>
        <p className="border-b-2 mt-6" />
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={openCreateAccountModal}
            className="text-base-content px-8 py-1 font-bold rounded-md mt-4 hover:text-primary"
          >
            Créer un compte
          </button>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost  bg-primary text-secondary hover:text-base-content absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button type="button">Fermer</button>
      </form>
    </dialog>
  );
}

export default ModalConnexion;
