import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GithubIcon from "@mui/icons-material/GitHub";
import OrgIcon from "@mui/icons-material/PersonPin";
import { nanoid } from "nanoid";

import { Organization, Repo, User } from "../../lib/types";

interface ProfileProps {
  name: string;
  avatar_url: string;
  public_gists: number;
  followers: number;
  orgs: Organization[] | undefined;
  repos: Repo[] | undefined;
  follows: User[] | undefined;
}

const UserProfile = ({
  name,
  avatar_url,
  public_gists,
  followers,
  orgs,
  repos,
  follows,
}: ProfileProps) => {
  console.log({ orgs });
  return (
    <div data-testid="user-profile">
      <Box p={2} bgcolor="#1f35a1" sx={{ alignItems: "center" }}>
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Avatar
                src={avatar_url}
                alt={name}
                sx={{ width: 110, height: 110 }}
              />
            </Grid>

            <Grid item flexGrow={1} padding={5}>
              <Grid container direction="column" sx={{ color: "white" }}>
                <Typography textAlign="start" variant="h3">
                  {name}
                </Typography>
                <Typography textAlign="start" variant="h5">
                  {followers ? followers : "no" + " followers"}{" "}
                  {public_gists ? public_gists : "no" + " repos"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box padding={5}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h5">Repositories</Typography>
              <List>
                {repos && repos.length > 0 ? (
                  <>
                    {repos.map((repo) => (
                      <Link
                        key={nanoid()}
                        style={{ textDecoration: "none" }}
                        to={repo.html_url}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <GithubIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={repo.full_name}
                            secondary={`Starred: ${repo.stargazers_count}, Forks: ${repo.forks_count}`}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </>
                ) : (
                  "no repos"
                )}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ padding: 2, marginBottom: 4 }}>
              <Typography variant="h5">Organizations</Typography>
              <List>
                {orgs && orgs.length > 0 ? (
                  <>
                    {orgs.map((org) => (
                      <ListItem disablePadding key={org.login}>
                        <ListItemButton>
                          <ListItemIcon>
                            <OrgIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={org.login}
                            secondary={org.description}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </>
                ) : (
                  "no organization"
                )}
              </List>
            </Paper>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h5">Followers</Typography>
              <List>
                {follows && follows.length > 0 ? (
                  <>
                    {follows.map((user) => (
                      <Link
                        key={nanoid()}
                        to={user.html_url}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={user.login} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                  </>
                ) : (
                  "no follows"
                )}

                <Link to="#" style={{ float: "right" }}>
                  {followers} more
                </Link>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default UserProfile;
