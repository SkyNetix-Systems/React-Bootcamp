import { useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "./userListSlice";
import { useDispatch } from "react-redux";
import { selctedUser } from "../userDetails/userDetailsSlice";

function UserList() {
  const users = useSelector((state) => state.userList.users);
  const dispatch = useDispatch();

  return (
    <div className="user-list">
      <h2>User List</h2>

      {/* Кнопка загрузки */}
      <button className="load-btn" onClick={() => dispatch(fetchUsers())}>
        Load Users
      </button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} - {user.email}
            </span>

            <div className="btn-group">
              <button className="select-btn" onClick={() => dispatch(selctedUser(user.id))}>
                Select
              </button>

              <button className="delete-btn" onClick={() => dispatch(deleteUser(user.id))}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
