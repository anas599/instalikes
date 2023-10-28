import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import MyForm from "./component/myForm";
import { Form } from "./component/form";
import Balance from "./component/balancetest";
interface Data {
  name: string;
  balance: number;
  city: string;
}
interface File {
  name: string;
  body: Blob;
}
function App() {
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
  />;
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

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };
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
        <Form onClick={handelSubmit} />
      </div>
      <MyForm />
      <Balance />
    </>
  );
}

export default App;
