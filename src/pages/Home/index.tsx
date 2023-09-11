import React, { useEffect } from "react";
import { fetchUserList } from "../../lib/fetch";
import { User } from "../../lib/types";
import UserCard from "../../components/UserCard";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function Home() {
  const [users, setUsers] = React.useState<User[]>([]);
  useEffect(() => {
    (async () => {
      const userList = await fetchUserList();
      setUsers(userList);
    })();
  }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Github Users
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <UserCard
                avatar={user.avatar_url}
                title={user.login}
                description=""
                key={user.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
