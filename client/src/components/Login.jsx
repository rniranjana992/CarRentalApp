import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();
  const [state, setState] = useState("login"); // login or register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added loading state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        navigate('/');
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
        toast.success("Logged in successfully!");
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-500 bg-black/50'
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        <p>
          {state === "register" ? (
            <>Already have an account?{" "}
              <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
            </>
          ) : (
            <>Create an account?{" "}
              <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
            </>
          )}
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? "Please wait..." : (state === "register" ? "Create Account" : "Login")}
        </button>
      </form>
    </div>
  );
};

export default Login;
