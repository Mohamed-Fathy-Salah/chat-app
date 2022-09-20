import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./search-bar";
import Friend from "./friend";

const LeftPannel = () => {
  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
      <SearchBar />
      <div
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "400px", overflowY: "scroll"}}
      >
        <ul className="list-unstyled mb-0">
          <li className="p-2 border-bottom"> <Friend /> </li>
          <li className="p-2 border-bottom"> <Friend /> </li>
          <li className="p-2 border-bottom"> <Friend /> </li>
          <li className="p-2 border-bottom"> <Friend /> </li>
          <li className="p-2 border-bottom"> <Friend /> </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftPannel;
