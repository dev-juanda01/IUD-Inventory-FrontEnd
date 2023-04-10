import React, { useState } from "react";
import Spinnerloader from "./components/Spinnerloader";
import AppRouter from "./router/AppRouter";

function App() {
  const [isLoading, setisLoading] = useState(true);

  setTimeout(() => {
    setisLoading(false);
  }, 2000);

  return <>{isLoading ? <Spinnerloader /> : <AppRouter />}</>;
}

export default App;
