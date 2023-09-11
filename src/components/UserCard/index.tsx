import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

type CardProps = {
  avatar: string;
  title: string;
  description: string;
};
const UserCard: React.FC<CardProps> = ({
  avatar,
  title,
  description,
  ...rest
}) => {
  return (
    <div {...rest}>
      <Link to={`/users/${title}`} style={{ textDecoration: "none" }}>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={avatar}
              alt="avatar_img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default UserCard;
