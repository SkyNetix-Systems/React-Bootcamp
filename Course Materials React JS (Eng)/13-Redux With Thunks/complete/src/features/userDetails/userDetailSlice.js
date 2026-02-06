const initialState = {
  selectedUserId: null,
};

export default function userDetailReducer(state = initialState, action) {
  switch (action.type) {
    case "userDetail/selectUser": {
      return { ...state, selectedUserId: action.payload };
    }
    case "userDetail/clearSelectedUser": {
      return { ...state, selectedUserId: null };
    }
    default: {
      return state;
    }
  }
}

export function selectUser(userId) {
  return { type: "userDetail/selectUser", payload: userId };
}

export function clearSelectedUser() {
  return { type: "userDetail/clearSelectedUser" };
}
