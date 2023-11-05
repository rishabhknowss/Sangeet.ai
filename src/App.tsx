import { useState } from "react";
import "./App.css";
import HomePage from "./routes/Home.route";

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  return (
      <main className="flex font-space overflow-hidden relative bg-black">
        <h1 className="text-white absolute text-3xl left-1/2 translate-x-[-50%] font-bold">Sangeet AI</h1>
        <section className="flex flex-col-reverse w-full min-h-screen md:max-h-screen md:flex-row">
            <HomePage />
        </section>
      </main>
  );
}

export default App;
