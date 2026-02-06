function AddUserForm() {
  return (
    <form className="add-user-form">
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;
