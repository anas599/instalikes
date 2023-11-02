import React, { useState } from "react";
import axios from "axios";

const Form2 = () => {
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLink(e.target.value);
  };
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/postLink`, {
        link: link,
        quantity: quantity,
      })
      .then((response) => {
        console.log("this is respond", response.data);
        setLink("");
        setQuantity(0);
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
    console.log(typeof quantity);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
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
          type="number"
          value={quantity}
          onChange={handleChangeQuantity}
          className="shadow-sm p bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
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
  );
};

export default Form2;
