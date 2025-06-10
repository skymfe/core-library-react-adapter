import React from "react";

export const HttpClientTest: React.FC = () => {
  // const httpClient = new HttpClient("https://api.example.com");

  // const handleGet = () => {
  //   httpClient.get("/data");
  // };

  // const handlePost = () => {
  //   httpClient.post("/data", { test: "data" });
  // };

  return (
    <div className="http-client-test">
      <h2>HTTP Client Test</h2>
      <div className="buttons">
        {/* <button onClick={handleGet}>GET Request</button> */}
        {/* <button onClick={handlePost}>POST Request</button> */}
      </div>
    </div>
  );
};
