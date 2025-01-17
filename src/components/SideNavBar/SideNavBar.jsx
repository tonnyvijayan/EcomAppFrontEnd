import "./SideNavBar.css";
import { useLocation, useSearchParams, Link } from "react-router-dom";

export const SideNavBar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortHandler = (sortType) => {
    searchParams.set("sort", sortType);
    setSearchParams(searchParams);
  };

  const filterHandler = (event) => {
    if (event.target.checked) {
      searchParams.set(event.target.name, "true");
      setSearchParams(searchParams);
    } else {
      searchParams.delete(event.target.name);
      setSearchParams(searchParams);
    }
  };

  const categoryPath = new RegExp("categories");

  return (
    <>
      <div className="side-nav-bar-container">
        <div className="side-nav-bar-categories-container">
          <h3>Categories</h3>
          <Link to="/categories/creepers">Creepers</Link>
          <Link to="/categories/flowering">Flowering</Link>
          <Link to="/categories/succulent">Succulents</Link>
          <Link to="/categories/Hanging plants">Hanging</Link>
        </div>
        {location.pathname === "/" || categoryPath.test(location.pathname) ? (
          <div className="side-nav-bar-filters-container">
            <div className="fieldsetDivContainer">
              <fieldset>
                <legend>Sort By</legend>
                <div>
                  <input
                    type="radio"
                    id="LOW-TO-HIGH"
                    name="sorting"
                    checked={
                      searchParams.getAll("sort")[0] === "LOW-TO-HIGH"
                        ? true
                        : false
                    }
                    onClick={() => {
                      sortHandler("LOW-TO-HIGH");
                    }}
                    readOnly
                  />
                  <label htmlFor="LOW-TO-HIGH">Low To High</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="HIGH-TO-LOW"
                    name="sorting"
                    checked={
                      searchParams.getAll("sort")[0] === "HIGH-TO-LOW"
                        ? true
                        : false
                    }
                    onClick={() => {
                      sortHandler("HIGH-TO-LOW");
                    }}
                    readOnly
                  />
                  <label htmlFor="HIGH-TO-LOW">High To Low</label>
                </div>
              </fieldset>
            </div>
            <div className="fieldsetDivContainer" onClick={filterHandler}>
              <fieldset>
                <legend>Filter</legend>
                <div>
                  <input
                    type="checkbox"
                    id="Fast-Delivery"
                    name="fastDelivery"
                    checked={
                      searchParams.getAll("fastDelivery")[0] === "true"
                        ? true
                        : false
                    }
                    readOnly
                  />
                  <label htmlFor="Fast-Delivery">Fast-Delivery</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Out-Of-Stock"
                    name="inStock"
                    checked={
                      searchParams.getAll("inStock")[0] === "true"
                        ? true
                        : false
                    }
                    readOnly
                  />
                  <label htmlFor="Out-Of-Stock">In Stock</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="New-Item"
                    name="new"
                    checked={
                      searchParams.getAll("new")[0] === "true" ? true : false
                    }
                    readOnly
                  />
                  <label htmlFor="New-Item">New</label>
                </div>
              </fieldset>
            </div>
            <button
              className="reset-button"
              onClick={() => {
                setSearchParams({});
              }}
            >
              Reset
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};
