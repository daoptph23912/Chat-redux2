import React, { useState, useEffect } from "react";
import { Image } from "antd";
import iconUser from "../../../assets/images/user_face.png";
import apiRoute from "../../helpers/api";
import { convertToBase64 } from "../convertBase64/convertToBase64";

const UserAvatarMenu = ({ avatar, onClick }) => {
  const [avatarSrc, setAvatarSrc] = useState(iconUser);

  useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar_${avatar}`);
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
    } else {
      const url = apiRoute.getAvatarUrl(avatar);
      convertToBase64(url, (base64Image) => {
        localStorage.setItem(`avatar_${avatar}`, base64Image);
        setAvatarSrc(base64Image);
      });
    }
  }, [avatar]);

  return (
    <Image
      onClick={onClick}
      src={avatarSrc}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
      }}
      preview={false}
      onError={(e) => {
        e.target.onerror = null;
        setAvatarSrc(iconUser);
      }}
    />
  );
};

export default UserAvatarMenu;
