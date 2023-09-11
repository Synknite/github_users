import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/useUser";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { fetchFollows, fetchRepos } from "../../lib/fetch";

export default function Users() {
  const { id } = useParams();
  const { users } = useUser();
  const [repos, setRepos] = useState<any[]>([]);
  const [follows, setFollows] = useState<any>([]);
  const currentUser = users.filter((user: any) => user.id === Number(id))[0];
  let topFollows;
  useEffect(() => {
    (async () => {
      setRepos(await fetchRepos(currentUser.repos_url));
    })();
    (async () => {
      setFollows(await fetchFollows(currentUser.followers_url));
      topFollows = follows.slice(0, 5).forEach((follow): any => {});
    })();
  }, [currentUser]);
  return (
    <Card>
      <CardHeader
        title={currentUser.login}
        subheader={currentUser.login}
        avatar={<Avatar src={currentUser.avatar_url} />}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Follows: {follows.topFollows}
        </Typography>
        <List>
          {repos.map((repo: any) => (
            <ListItem key={repo.id}>
              <ListItemText primary={repo.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
