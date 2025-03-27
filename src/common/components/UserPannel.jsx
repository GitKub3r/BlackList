import "../../styles/components/User-Pannel.css";
import { UserPannelLayout } from "../layouts/UserPannelLayout";
import { UserPannelInput } from "./pannel/UserPannelInput";

export const UserPannel = ({ data }) => {
  return (
    <div className="user-pannel">
      <h1>Change your data</h1>
      <hr />

      <UserPannelLayout className="user-pannel-layout">
        <UserPannelInput
          label="Username"
          type="text"
          name="change-username"
          id="change-username-input"
          value={data.username}
        />

        <UserPannelInput
          label="Email"
          type="email"
          name="change-email"
          id="change-email-input"
          value={data.email}
        />

        <UserPannelInput
          label="Password"
          type="password"
          name="change-password"
          id="change-password-input"
          className="user-pannel-input password"
          value={data.password}
        />
      </UserPannelLayout>

      <button>Change Data</button>
    </div>
  );
};
