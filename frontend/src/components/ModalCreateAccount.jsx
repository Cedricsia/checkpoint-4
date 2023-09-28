/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";
import expressAPI from "../services/ExpressApi";

function ModalCreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const closeModal = () => {
    document.getElementById("login").close();
    document.getElementById("creationModal").close();
  };

  const onSubmit = (data) => {
    expressAPI
      .post("/auth/sign-up", data)
      .then(() => {
        document.getElementById("creationModal").close();
        document.getElementById("connectionModal").showModal();
      })
      .catch(() => {
        console.error("Une erreur est survenue");
      });
  };

  return (
    <div>
      <dialog
        id="creationModal"
        className="bg-transparent drop-shadow-lg modal"
      >
        <div
          method="dialog"
          className="md:w-[56rem] modal-box shadow-none bg-secondary text-base-content"
        >
          <h2 className="font-bold text-xl mb-4 text-center">
            Créer un compte
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:grid md:grid-cols-2 md:gap-7 text-left">
              <div>
                <label htmlFor="firstname" className="pt-4 pb-1  font-bold">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("firstname", {
                    required: true,
                  })}
                  aria-invalid={errors.firstname ? "true" : "false"}
                />
                {errors.firstname && (
                  <span>Le champs prénom est obligatoire</span>
                )}
              </div>
              <div className="">
                <label htmlFor="lastname" className="pt-4 pb-1 font-bold">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("lastname", {
                    required: true,
                  })}
                  aria-invalid={errors.lastname ? "true" : "false"}
                />
                {errors.lastname && <span>Le champ nom est obligatoire</span>}
              </div>
              <div>
                <label htmlFor="username" className="pt-4 pb-1  font-bold">
                  Pseudo
                </label>
                <input
                  type="text"
                  name="pseudo"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("pseudo", {
                    required: true,
                  })}
                  aria-invalid={errors.pseudo ? "true" : "false"}
                />
                {errors.pseudo && <span>Le champ pseudo est obligatoire</span>}
              </div>
              <div>
                <label htmlFor="email" className="pt-4 pb-1  font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="creationMail"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("creationMail", {
                    required: true,
                  })}
                  aria-invalid={errors.creationMail ? "true" : "false"}
                />
                {errors.creationMail && (
                  <span>Le champ email est invalide</span>
                )}
              </div>
              <div>
                <label htmlFor="password" className="pt-4 pb-1  font-bold">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="creationPassword"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("creationPassword", {
                    required: true,
                  })}
                  aria-invalid={errors.creationPassword ? "true" : "false"}
                />
                {errors.creationPassword && (
                  <span>
                    Le champ mot de passe est obligatoire et doit contenir entre
                    3 et 30 caractères et uniquement des lettres et des chiffres
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="pt-4 pb-1  font-bold"
                >
                  Confirmer mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (password) =>
                      password === watch("confirmPassword") ||
                      "Les mots de passes ne sont pas similaires",
                  })}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary px-8 py-1 text-secondary text-md md:text-lg rounded-md mt-10 w-48 md:w-56 h-10"
              >
                Créer un compte
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost bg-primary text-secondary hover:text-base-content absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default ModalCreateAccount;
