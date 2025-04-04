import React, { useState } from "react";
import { storage } from "./firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const handleUpload = async () => {
        if (!file) return;

        const storageRef = ref(storage, `uploads/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setUrl(downloadURL);
    };

    return (
        <div>
            <h2>File Upload</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {url && <p>Download URL: <a href={url} target="_blank" rel="noopener noreferrer">View File</a></p>}
        </div>
    );
};

export default FileUpload;
