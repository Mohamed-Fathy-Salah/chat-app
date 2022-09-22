import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./search-bar";
import Friend from "./friend";
import Top from "./top";
import client from "../../api/build-client";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

const LeftPannel = ({ currentUser, onChooseFriend }) => {
  currentUser = JSON.parse(currentUser);
  const [friends, setFriends] = useState([
    {
      friend: {
        name: "1",
        email: "e1",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png",
      },
    },
    {
      friend: {
        name: "2",
        email: "e2",
        photo: "https://i.stack.imgur.com/ILTQq.png",
      },
    },
    {
      friend: {
        name: "3",
        email: "e3",
        photo:
          "https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium",
      },
    },
  ]);

  const update = () => {
    client()
      .get("/friend")
      .then(({ data }) => {
        setFriends(data);
      });
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
      <Top photo={currentUser.photo} update={update} />
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
                onChooseFriend(friend);
              }}
            >
              <Friend data={friend} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftPannel;
