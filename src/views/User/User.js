import React from "react";
import { Card, Col, Button } from "antd";
import {
  PhoneOutlined,
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteFilled,
  MailOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./user.css";
import { getAvatarURL } from "../../services/apiConfig";
const { Meta } = Card;

export default function User(props) {
  const { user, openModal, setCurUser, deleteUser, likeUser } = props;
  const { name, username, email, phone, website, isLiked } = user;

  const onLike = () => {
    likeUser(user);
  };
  const onEdit = () => {
    setCurUser(user);
    openModal();
  };
  const onDelete = () => {
    deleteUser(user);
  };
  return (
    <Col xs={20} sm={20} md={10} lg={8} xl={6}>
      <Card
        className="user-card"
        cover={
          <img
            alt="avatar"
            src={getAvatarURL(username)}
            className="card-image"
          />
        }
        actions={[
          <Button size="small" onClick={onLike}>
            {isLiked ? (
              <HeartFilled className="heart-icon" />
            ) : (
              <HeartOutlined className="heart-icon" onClick={onLike} />
            )}
          </Button>,
          <Button size="small" onClick={onEdit}>
            <EditOutlined key="edit" />
          </Button>,
          <Button size="small" onClick={onDelete}>
            <DeleteFilled key="delete" />
          </Button>,
        ]}
      >
        <Meta title={name} className="meta" />
        <div className="col">
          <div className="row card-item">
            <MailOutlined /> <span className="card-item-text">{email}</span>
          </div>
          <div className="row card-item">
            <PhoneOutlined /> <span className="card-item-text">{phone}</span>
          </div>
          <div className="row card-item">
            <GlobalOutlined /> <span className="card-item-text">{website}</span>
          </div>
        </div>
      </Card>
    </Col>
  );
}
