"use client";

import AuthContext from "@/src/context/auth";
import UsersTable from "./UsersTable";

function page() {
  return (
    <AuthContext.Consumer>
      {(value) => <UsersTable token={value.accessToken || ""} />}
    </AuthContext.Consumer>
  );
}

export default page;
