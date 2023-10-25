import { useState, useEffect } from "react";
import * as AWS from "aws-sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { toast, ToastContainer } from "react-toastify";

import { Form } from "./component/form";
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
        const response = await fetch(
          "https://anasdevbucket.s3.eu-north-1.amazonaws.com/data.json"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  // S3 upload
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  // Function to upload file to s3
  const uploadFile = async () => {
    const s3 = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: "AKIA26KRV4DMO5JL2GXC",
        secretAccessKey: "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",
      },
    });
    const params = {
      Bucket: "anasdevbucket",
      Key: file?.name,

      Body: file?.body,
    };
    // Uploading file to s3
    const upload = s3.send(new PutObjectCommand(params));
    //critical part of uploading to s3 depends on the name of the CORS configuration start
    await upload
      .then(() => {
        setUrl(`https://anasdevbucket.s3.eu-north-1.amazonaws.com/data.json`);
        //critical part end check in Firefox if CORS fails
        console.log(`File uploaded successfully at ${url}`);

        toast.success("File uploaded successfully.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      })
      .catch((err: AWS.AWSError) => {
        console.log(err);
        alert("Error uploading file.");
      });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFile({ name: file.name, body: file });
  };
  // s3 upload end

  return (
    <>
      <div className="App">
        <h1>JSON Data</h1>
        {data && (
          <ul>
            <li>Name: {data.name}</li>
            <li>Age: {data.balance}</li>
            <li>City: {data.city}</li>
          </ul>
        )}
      </div>
      {/* <p>{process.env.REACT_APP_SECRET_NAME}</p> */}
      <Form onClick={uploadFile} />
    </>
  );
}

export default App;
