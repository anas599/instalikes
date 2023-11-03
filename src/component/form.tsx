import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, selectData } from "../redux/apiSlice";
import "../App.css";
interface dataRedux {
  id: number;
  title: string;
  body: string;
  name: string;
  count: number;
  items: string;
  key: string;
  serivces: string;
}

const Form = () => {
  // redux
  const dispatch = useDispatch();
  const dataRedux = useSelector(selectData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const bCount = Number(
    dataRedux.map((index: dataRedux) => index.count).toString()
  );
  //redux end

  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(50); //50 likes
  const [runs, SetRuns] = useState(10); //10 times
  const [interval, SetInterval] = useState(60); //every 60 minutes
  const [apiquantity, setApiQuantity] = useState(0);
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLink(e.target.value);
  };
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
    setApiQuantity(Number(e.target.value));
  };
  const handleChangeRuns = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetRuns(Number(e.target.value));
  };
  const handleChangeInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetInterval(Number(e.target.value));
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("https://instalikes-server.onrender.com/api/postLink", {
        link: link,
        quantity: quantity,
        runs: runs,
        interval: interval,
      })
      .then((response) => {
        console.log("this is respond", response.data);
        setLink("");
        setQuantity(0);
        toast.success(`Success! You added ${quantity} likes to your post!`);
        axios
          .post(import.meta.env.VITE_API, {
            count: Number(bCount) - quantity,
          })
          .then((response) => {
            console.log("second response", response.data);
          })
          .catch((error) => {
            console.error("Second POST request error:", error);
          });
      })
      .catch((error) => {
        console.log("Error:", error.message);
        toast.error("Error! Please check your link again!");
      });
    console.log("this is respond", apiquantity);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <form onSubmit={handleSubmit} className="p-2 m-2 glass text-white">
        <label>
          Link:
          <input
            type="text"
            value={link}
            onChange={handleChange}
            className="shadow-sm p bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Past Link of the Image here!"
            required
          />
        </label>
        <label>
          Quantity:
          <input
            min="10"
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
            className="shadow-sm p bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </label>
        <label>
          Every (minutes):
          <input
            min="60"
            type="number"
            value={interval}
            onChange={handleChangeInterval}
            className="shadow-sm p bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </label>
        <label>
          For How many times?
          <input
            min="10"
            type="number"
            value={runs}
            onChange={handleChangeRuns}
            className="shadow-sm p bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </label>
        <label>
          Total Likes you get:
          <input
            value={runs * quantity}
            onChange={handleChangeRuns}
            className="shadow-sm p bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            readOnly
          ></input>
        </label>

        <div className="flex justify-center">
          <button
            type="submit"
            className="m-2 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
