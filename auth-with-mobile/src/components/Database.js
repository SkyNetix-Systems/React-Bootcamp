import React, { useState } from "react";
import { db } from "./firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Database = () => {
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);

    const addUser = async () => {
        try {
            await addDoc(collection(db, "users"), { name });
            alert("User added!");
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const fetchUsers = async () => {
        const snapshot = await getDocs(collection(db, "users"));
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    return (
        <div>
            <h2>Firestore Database</h2>
            <input type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
            <button onClick={addUser}>Add User</button>
            <button onClick={fetchUsers}>Fetch Users</button>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    );
};

export default Database;
