import React from "react";

type CardProps = {
  avatar: string;
  title: string;
  description: string;
};

export const Card: React.FC<CardProps> = ({ avatar, title, description }) => {
  return (
    <div>
      <img src={avatar} alt="avatar_img" style={{ width: "150px" }} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
