import React,{useState,useEffect} from 'react'
import { loadStateFromLocalStorage} from "../../utils/localStorage";
import { List,Avatar, Divider } from 'antd';

import "./likes.css"
import { getAvatarURL } from '../../services/apiConfig';
export default function Likes() {
    const [likedUsers,setLikedUsers] = useState([]);

    const countLikes = async ()=>{
        const result = await loadStateFromLocalStorage();
        let users = result.users;
        users = users.filter((user)=>user.isLiked);
        setLikedUsers(users);
    }

    useEffect(()=>{
       countLikes();
    },[])
    return (
        <div className="liked-users-list">
            <Divider orientation="left">Total liked users : {likedUsers.length}</Divider>
            <List
      bordered
      itemLayout="horizontal"
      dataSource={likedUsers}
      renderItem={user => (
        <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={getAvatarURL(user.username)} />}
          title={<p>{user.name}</p>}
        />
      </List.Item>
      )}
    />
        </div>
    )
}
