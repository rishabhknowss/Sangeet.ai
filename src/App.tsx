import { useState } from "react";
import "./App.css";
import HomePage from "./routes/Home.route";

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  return (
      <main className="flex font-space overflow-hidden relative bg-black">
        <section className="flex flex-col-reverse w-full min-h-screen md:max-h-screen md:flex-row">
            <HomePage />
        </section>
      </main>
  );
}

export default App;
