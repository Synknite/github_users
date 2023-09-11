import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

import { BASE_URL } from "../../lib/fetch";
import { Profile } from "../../lib/types";
import UserProfile from "../../components/UserProfile";

const ProfilePage = () => {
  const { title } = useParams();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const url = BASE_URL + "/" + title;
      const [profileRes, reposRes, followsRes, organizationRes] =
        await Promise.all([
          (await fetch(url)).json(),
          (await fetch(url + "/repos")).json(),
          (await fetch(url + "/followers?per_page=5")).json(),
          (await fetch(url + "/orgs")).json(),
        ]);
      const profile = {
        ...profileRes,
        repos: reposRes,
        follows: followsRes,
        organizations: organizationRes,
      };
      setProfile(profile);
      setLoading(false);
    };

    fetchProfile();
  }, [title]);

  return (
    <div>
      {loading ? (
        <Skeleton variant="rectangular" height={118} width="100%" />
      ) : (
        <UserProfile
          name={profile ? profile.name : ""}
          avatar_url={profile ? profile.avatar_url : ""}
          public_gists={profile ? profile.public_gists : 0}
          followers={profile ? profile.followers : 0}
          orgs={profile ? profile.organizations : []}
          repos={profile ? profile.repos : []}
          follows={profile ? profile.follows : []}
        />
      )}
    </div>
  );
};

export default ProfilePage;
