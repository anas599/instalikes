import { useEffect } from "react";
import Form from "./component/form";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, selectData } from "./redux/apiSlice";
import Table from "./component/table";

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
function App() {
  // redux
  const dispatch = useDispatch();
  const dataRedux = useSelector(selectData);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const bCount = typeof Number(
    dataRedux.map((index: dataRedux) => index.count).toString()
  );
  console.log(bCount);
  //redux end

  return (
    <section className="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 h-screen ">
      <br />
      <div className="App text-white text-center ">
        {dataRedux === null ? (
          <p>loading...</p>
        ) : (
          dataRedux &&
          dataRedux.map((item: dataRedux, index: number) => (
            <section key={index} className="glass p-2 mx-2">
              <Table text="User name" details={item.name} />
              <Table
                text="Balance"
                details={item.count.toLocaleString("en-US")}
              />
              <Table text="Service" details={item.serivces} />
            </section>
          ))
        )}

        <br />
        <br />
      </div>
      <Form />
    </section>
  );
}

export default App;
