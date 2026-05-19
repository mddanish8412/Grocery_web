import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Auth = () => {

  const {
    setShowUserLogin,
    setUser,
    axios,
  } = useContext(AppContext);

  const [state, setState] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const url =
        state === "login"
          ? "/api/user/login"
          : "/api/user/register";

      const payload =
        state === "login"
          ? { email, password }
          : { name, email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {

        setUser(data.user);

        setShowUserLogin(false);

        toast.success(data.message);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(error.message);

    }
  };

  return (

    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >

      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl w-[350px] shadow-xl flex flex-col gap-4"
      >

        <h2 className="text-2xl font-bold text-center">
          User {state === "login" ? "Login" : "Register"}
        </h2>

        {state === "register" && (
          <input
            type="text"
            placeholder="Enter name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-indigo-500 text-white py-2 rounded">
          {state === "login" ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center">

          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setState(
                state === "login"
                  ? "register"
                  : "login"
              )
            }
            className="text-indigo-500 cursor-pointer ml-1"
          >
            {state === "login"
              ? "Register"
              : "Login"}
          </span>

        </p>

      </form>

    </div>
  );
};

export default Auth;