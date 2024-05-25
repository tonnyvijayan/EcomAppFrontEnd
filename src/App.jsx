import "./App.css";
import { TopNavBar } from "./components/TopNavBar/TopNavBar";
import { SideNavBar } from "./components/SideNavBar/SideNavBar";
// import { ProductListing } from "./components/Product/ProductListing";
import { Main } from "./components/Main";

function App() {
  return (
    <>
      <div className="app-container">
        <TopNavBar />
        <SideNavBar />
        <Main />
      </div>
    </>
  );
}

export default App;
