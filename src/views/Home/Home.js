import React, { useState, useEffect } from "react";
import { Alert } from "antd";
import User from "../User/User";
import {
  cloneObject,
  loadStateFromLocalStorage,
  saveStateIntoLocalStorage,
} from "../../utils/localStorage";
import UserModal from "../User/UserModal";
import "./home.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [curUser, setCurUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateUsersStateAndLocalStorage = (users) => {
    setUsers(users);
    saveStateIntoLocalStorage({ users: users });
  };

  // like user
  const likeUser = (user) => {
    if (!user || !user.username) {
      return;
    }
    const newUsers = cloneObject(users);
    for (let idx in newUsers) {
      if (newUsers[idx].username === user.username) {
        newUsers[idx] = { ...newUsers[idx], isLiked: !newUsers[idx].isLiked };
        break;
      }
    }
    updateUsersStateAndLocalStorage(newUsers);
  };
  // update user details using modal
  const updateUserDetails = (user) => {
    if (!user || !user.username) {
      return;
    }
    const newUsers = cloneObject(users);
    for (let idx in newUsers) {
      if (newUsers[idx].username === user.username) {
        newUsers[idx] = { ...user };
        break;
      }
    }
    updateUsersStateAndLocalStorage(newUsers);
  };

  // delete user
  const deleteUser = (user) => {
    if (!user || !user.username) {
      return;
    }
    const newUsers = users.filter((usr) => usr.username !== user.username);
    updateUsersStateAndLocalStorage(newUsers);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    const result = await loadStateFromLocalStorage();
    setUsers(result.users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Alert message="Loading..." type="info" />
      ) : (
        <div className="users-list">
          {users && users.length ? (
            users.map((user) => {
              return (
                <User
                  key={user.username}
                  user={user}
                  openModal={() => setIsModalVisible(true)}
                  setCurUser={setCurUser}
                  deleteUser={deleteUser}
                  likeUser={likeUser}
                />
              );
            })
          ) : (
            <Alert
              message="No Data is present refesh page to fetch data"
              type="info"
            />
          )}
          <UserModal
            key={curUser && curUser.username}
            user={curUser}
            isModalVisible={isModalVisible}
            handleCancel={() => setIsModalVisible(false)}
            updateUserDetails={updateUserDetails}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
