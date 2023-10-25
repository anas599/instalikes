import React, { useState } from "react";

function MyForm() {
  const [action, setAction] = useState("");
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [key, setKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      action: action,
      service: service,
      link: link,
      quantity: quantity,
      key: key,
    };

    try {
      const response = await fetch("https://secsers.com/api/v2", {
        method: "POST",
        mode: "no-cors",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={"add"}
        onChange={(e) => setAction(e.target.value)}
        placeholder="Action"
      />
      <input
        type="text"
        value={4808}
        onChange={(e) => setService(e.target.value)}
        placeholder="Service ID"
      />
      <input
        type="text"
        value={
          "https://www.instagram.com/p/Cy53YwBi1J-/?igshid=MzRlODBiNWFlZA%3D%3D"
        }
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link to page"
      />
      <input
        type="text"
        value={20}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Needed quantity"
      />
      <input
        type="text"
        value={"34cdf3fc90e8331d5a727978619bfb09"}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Your API key"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
