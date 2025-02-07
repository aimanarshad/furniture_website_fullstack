// schemas/user.js
export const User= {
    name: "user",
    title: "User",
    type: "document",
    fields: [
      { name: "email", type: "string", title: "Email" },
      { name: "password", type: "string", title: "Password" },
     
    ],
  };
  export default User;
  