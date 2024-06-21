import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function App() {
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm();

  function removeUser(idxToRemove) {
    const newUsers = users.filter((_, idx) => idx !== idxToRemove);
    setUsers(newUsers);
  }

  function onSubmit(data) {
    setUsers([
      ...users,
      {
        firstname: data.UserFirstname,
        lastname: data.UserLastname,
        email: data.UserEmail,
      },
    ]);
    reset();
  }

  return (
    <main>
 
      <form
        className="flex flex-row gap-2 justify-evenly p-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Nombre"
          className={clsx(" text-center border rounded p-2 max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.UserFirstname,
          })}
          required
          {...register("UserFirstname", {
            required: { value: true, message: "Campo Requerido" },
            minLength: { value: 3, message: "Minimun 3 caraters" },
          })}
        />
        <input
          type="text"
          placeholder="Apellido"
          className={clsx("text-center  border rounded p-2 max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.UserLastname,
          })}
          required
          {...register("UserLastname", {
            required: { value: true, message: "Campo Requerido" },
            minLength: { value: 2, message: "Minimun 2 caraters" },
          })}
        />
        <input
          type="email"
          placeholder="email"
          className={clsx("text-center  border rounded p-2 max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.UserEmail,
          })}
          required
          {...register("UserEmail", {
            required: { value: true, message: "Campo Requerido" },
            minLength: { value: 15, message: "Minimun 15 caraters" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Correo inválido",
            },
          })}
        />
        <button
          className="border rounded text-black bg-white  w-[10%] font-semibold disabled:bg-stone-400"
          disabled={isSubmitted ? !isValid : false}
        >
          Registrate
        </button>
      </form>
      {errors.UserFirstname && (
        <p className="text-red-500 text-center text-sm  font-semibold">
          {errors.UserFirstname?.message}
        </p>
      )}
      {errors.UserLastname && (
        <p className="text-red-500 text-center text-sm  font-semibold">
          {errors.UserLastname?.message}
        </p>
      )}
      {errors.UserEmail && (
        <p className="text-red-500 text-center text-sm  font-semibold">
          {errors.UserEmail?.message}
        </p>
      )}
      <div className="max-w-screen-sm w-full mx-auto p-5 flex flex-col gap-1">
        {users.length == 0 && (
          <p className="text-white/50">sin registros</p>
        )}
        {users.length > 0 && (
          <div className="flex flex-row text-white justify-between">
            <h2 className=" justify-self-start">Full Name: </h2>
            <h2 className=" justify-self-end">Email:</h2>
            <h2 className=" justify-self-end">Delete User</h2>
          </div>
        )}
        {users.map((user, idx) => {
          console.log("Aqui", user);
          return (
            <div
              key={`user-${idx}`}
              className=" bg-white/10 rounded p-4 flex flex-row justify-between text-white"
            >
              <span className="select-none ">
                {`${user.firstname} ${user.lastname}`}
              </span>
              <span className="select-none ">{user.email}</span>
              <span
                onClick={() => removeUser(idx)}
                className="text-red-500 rounded-full p-1 size-4"
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
