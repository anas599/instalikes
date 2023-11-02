import { useState, useEffect } from "react";
import Form2 from "./component/form2";
interface Data {
  name: string;
  balance: number;
  city: string;
}

function App() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(import.meta.env.VITE_API);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // console.log(import.meta.env.VITE_API);

  return (
    <>
      <div className="App">
        <h1>JSON Data</h1>
        {data === null ? (
          <p>loading...</p>
        ) : (
          data &&
          data.map((item, index) => (
            <ul key={index}>
              <li>User name: {item.name}</li>
              <li>Balance: {item.count}</li>
              <li>Service: {item.serivces}</li>
            </ul>
          ))
        )}

        <br />
        <br />
        <br />
      </div>
      <Form2 />
    </>
  );
}

export default App;
