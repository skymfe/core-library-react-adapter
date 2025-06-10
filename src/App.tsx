import React from "react";
import { AuthTest } from "./components/AuthTest";
import { HttpClientTest } from "./components/HttpClientTest";

export default function App() {
  return (
    <div className="app">
      <h1>Core Library Development Environment</h1>
      <div className="test-components">
        <AuthTest />
        <HttpClientTest />
      </div>
    </div>
  );
}
