import "./SideNavBar.css";
import { useLocation, useSearchParams } from "react-router-dom";

export const SideNavBar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortHandler = (sortType) => {
    setSearchParams({ sort: sortType });
  };
  return (
    <>
      <div className="side-nav-bar-container">
        <div className="side-nav-bar-categories-container">
          <h3>Categories</h3>
          <a href="">Outdoor</a>
          <a href="">Indoor</a>
          <a href="">Succulents</a>
          <a href="">Hanging</a>
        </div>
        {location.pathname === "/" ? (
          <div className="side-nav-bar-filters-container">
            <div className="fieldsetDivContainer">
              <fieldset>
                <legend>Sort By</legend>
                <div>
                  <input
                    type="radio"
                    id="LOW-TO-HIGH"
                    name="sorting"
                    onClick={() => {
                      sortHandler("LOW-TO-HIGH");
                    }}
                  />
                  <label htmlFor="LOW-TO-HIGH">Low To High</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="HIGH-TO-LOW"
                    name="sorting"
                    onClick={() => {
                      sortHandler("HIGH-TO-LOW");
                    }}
                  />
                  <label htmlFor="HIGH-TO-LOW">High To Low</label>
                </div>
              </fieldset>
            </div>
            <div className="fieldsetDivContainer">
              <fieldset>
                <legend>Filter</legend>
                <div>
                  <input type="checkbox" id="Fast-Delivery" />
                  <label htmlFor="Fast-Delivery">Fast-Delivery</label>
                </div>
                <div>
                  <input type="checkbox" id="Out-Of-Stock" />
                  <label htmlFor="Out-Of-Stock">Out Of Stock</label>
                </div>
                <div>
                  <input type="checkbox" id="New-Item" />
                  <label htmlFor="New-Item">New</label>
                </div>
              </fieldset>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
