import axios from "axios";
import React, { useState, useEffect } from "react";

function Balance() {
  const [balance, setBalance] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //   "https://cors-anywhere.herokuapp.com/https://secsers.com/api/v2",
          "https://dh6tww4x-3000.uks1.devtunnels.ms/jokes/random",
          {
            //   headers: {
            //     "Access-Control-Allow-Origin": "*",
            //   },
            // params: {
            //   key: "34cdf3fc90e8331d5a727978619bfb09",
            //   action: "balance",
            // },
          }
        );
        setBalance(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount
  console.log(balance);
  return (
    <div>
      {balance ? (
        <>
          <li>Balance: {balance.balance}</li>
          <li>Balance: {balance.currency}</li>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Balance;
