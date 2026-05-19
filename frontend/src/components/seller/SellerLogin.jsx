import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {

  const {
    isSeller,
    setIsSeller,
    navigate,
    axios,
    setShowUserLogin,
    setUser
  } = useContext(AppContext);

  const [selectedRole, setSelectedRole] = useState("");

  // seller states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    if (isSeller) {

      navigate("/seller");

    }

  }, [isSeller]);

  // =========================
  // SELLER LOGIN
  // =========================
  const submitSellerHandler = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        "/api/seller/login",
        {
          email,
          password,
        }
      );

      if (data.success) {

        setIsSeller(true);

        toast.success(data.message);

        navigate("/seller");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(error.message);

    }
  };

  // =========================
  // USER LOGIN OPEN
  // =========================
  const openUserLogin = () => {

    setShowUserLogin(true);

  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-40 flex items-center justify-center bg-black/50">

      {/* ========================= */}
      {/* SELECT ROLE */}
      {/* ========================= */}

      {!selectedRole && (

        <div className="bg-white p-8 rounded-xl w-[350px] shadow-xl">

          <h2 className="text-2xl font-bold text-center mb-8">
            Select Login Type
          </h2>

          <div className="flex flex-col gap-4">

            <button
              onClick={() => {
                setSelectedRole("user");
                openUserLogin();
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg"
            >
              User Login
            </button>

            <button
              onClick={() => setSelectedRole("seller")}
              className="bg-black hover:bg-gray-800 text-white py-3 rounded-lg"
            >
              Admin / Seller Login
            </button>

          </div>
        </div>
      )}

      {/* ========================= */}
      {/* SELLER LOGIN FORM */}
      {/* ========================= */}

      {selectedRole === "seller" && !isSeller && (

        <form
          onSubmit={submitSellerHandler}
          className="flex flex-col gap-4 bg-white p-8 rounded-xl w-[350px] shadow-xl"
        >

          <h2 className="text-2xl font-bold text-center">
            <span className="text-indigo-500">
              Seller
            </span>{" "}
            Login
          </h2>

          <div>

            <p>Email</p>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter email"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>

            <p>Password</p>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("")}
            className="border py-2 rounded-lg"
          >
            Back
          </button>

        </form>
      )}

    </div>
  );
};

export default SellerLogin;