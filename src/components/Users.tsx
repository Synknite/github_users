import React, { useEffect } from "react";
import Spinner from "./Spinner";
import UserItem from "./UserItem";
import { useGithub } from "./context/customHooks";
function Users() {
  const { users, loading, fetchUsers } = useGithub();
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user: any) => {
          return <UserItem key={user.id} {...user} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user: any) => {
          return <Spinner key={user.id} />;
        })}
      </div>
    );
  }
}

export default Users;
