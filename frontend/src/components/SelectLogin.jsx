import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SelectLogin = () => {

  const {
    setShowUserLogin,
    navigate,
    setShowSelectLogin
  } = useContext(AppContext);

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-xl w-[350px] shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-8">
          Select Login Type
        </h2>

        <div className="flex flex-col gap-4">

          {/* USER LOGIN */}
          <button
            onClick={() => {

              setShowSelectLogin(false);

              setShowUserLogin(true);

            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg"
          >
            User Login
          </button>

          {/* SELLER LOGIN */}
          <button
            onClick={() => {

              setShowSelectLogin(false);

              navigate("/seller");

            }}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-lg"
          >
            Admin / Seller Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default SelectLogin;