import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./search-bar";
import Friend from "./friend";
import Top from "./top";
import client from "../../api/build-client";
import { useEffect, useState } from "react";

const LeftPannel = () => {
  const [friends, setFriends] = useState([
    { friend: { id: 1 } },
    { friend: { id: 2 } },
    { friend: { id: 3 } },
    { friend: { id: 4 } },
    { friend: { id: 5 } },
  ]);

  useEffect(() => {
    client()
      .get("/friend")
      .then(({ data }) => {
        setFriends(data);
      });
  }, []);

  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
      <Top/>
      <SearchBar />
      <div
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "400px", overflowY: "scroll" }}
      >
        <ul className="list-unstyled mb-0">
          {friends.map(({ friend }) => (
            <li key={friend.id} className="p-2 border-bottom">
              <Friend data={friend} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftPannel;
