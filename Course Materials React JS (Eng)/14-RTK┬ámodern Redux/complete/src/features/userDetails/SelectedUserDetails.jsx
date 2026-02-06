import { useDispatch } from "react-redux";
import { clearSelectedUser } from "./userDetailsSlice";
import { useSelector } from "react-redux";

function SelectedUserDetails() {
  const dispatch = useDispatch();

  const selectedUserId = useSelector((state) => state.userDetails.selectedUserId);

  const users = useSelector((state) => state.userList.users);

  if (!selectedUserId) {
    return <p>No user selected</p>;
  }

  const user = users.find((user) => user.id === selectedUserId);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="selected-user-details">
      <h2>Selected User</h2>
      <p>
        <strong>Name: </strong>
        {user.name}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>

      <button className="clear-btn" onClick={() => dispatch(clearSelectedUser())}>
        Clear Selection
      </button>
    </div>
  );
}

export default SelectedUserDetails;
