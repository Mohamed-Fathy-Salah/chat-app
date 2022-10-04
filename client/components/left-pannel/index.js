import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./search-bar";
import Friend from "./friend";
import Group from "./group";
import Top from "./top";
import client from "../../api/build-client";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

const LeftPannel = ({ currentUser, onChooseRoom }) => {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  const updateFriends = async () => {
    client()
      .get("/friend")
      .then(({ data }) => {
        setFriends(data);
      });
  };

  const updateGroups = async () => {
    client()
      .get("/group")
      .then(({ data }) => {
        setGroups(data);
      });
  };

  useEffect(() => {
    updateFriends();
    updateGroups();
  }, []);

  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
      <Top
        data={currentUser}
        updateFriends={updateFriends}
        updateGroups={updateGroups}
      />
      <SearchBar />
      <div
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "400px", overflowY: "scroll" }}
      >
        <ul className="list-unstyled mb-0">
          {friends.map(({ friend }) => (
            <li
              key={uuid()}
              className="p-2 border-bottom"
              onClick={() => {
                onChooseRoom(friend);
              }}
            >
              <Friend data={friend} />
            </li>
          ))}
          {groups.map(({ group }) => (
            <li
              key={uuid()}
              className="p-2 border-bottom"
              onClick={() => {
                onChooseRoom(group);
              }}
            >
              <Group data={group} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftPannel;
