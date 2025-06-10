import React from "react";
import { useIsAuthenticated } from "../../lib/auth";

export const AuthTest: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="auth-test">
      <h2>Auth Module Test</h2>

      <div className="status">
        <p>Auth Status: {isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
      </div>
    </div>
  );
};
