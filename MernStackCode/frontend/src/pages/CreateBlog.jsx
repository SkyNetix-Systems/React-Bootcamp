// React hooks for state management and DOM access
import { useState, useRef } from "react";

// API function to create a new blog post
import { createPost } from "../api";

// UI components (shadcn/ui style)
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const CreateBlog = () => {
  // State for blog title
  const [title, setTitle] = useState("");

  // State for short blog description
  const [description, setDescription] = useState("");

  // State for full blog content
  const [content, setContent] = useState("");

  // State to store uploaded image file
  const [file, setFile] = useState(null);

  // Maximum allowed file size (15 MB)
  const MAX_FILE_SIZE = 15 * 1024 * 1024;

  // Reference to file input element (used to reset it manually)
  const inputFile = useRef(null);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard: ensure file is selected
    if (!file) {
      alert("Please upload a header image");
      return;
    }

    const submitObject = {
      title,
      description,
      content,
      author: null,
      dateCreated: new Date(),
      file,
    };

    try {
      await createPost(submitObject);
      alert("Blog created successfully ✅");

      // Optional: reset form after success
      setTitle("");
      setDescription("");
      setContent("");
      setFile(null);
      if (inputFile.current) inputFile.current.value = "";
    } catch (err) {
      console.error("CREATE POST ERROR:", err?.response?.data || err.message);
      alert("Failed to create blog ❌");
    }
  };

  // Handles file selection and validation
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate filename extension safely
    const dotIndex = selectedFile.name.lastIndexOf(".");
    if (dotIndex === -1) {
      alert("Invalid file name");
      if (inputFile.current) inputFile.current.value = "";
      return;
    }

    const fileExtension = selectedFile.name.substring(dotIndex).toLowerCase();

    // Validate extension
    if (![".jpg", ".jpeg", ".png"].includes(fileExtension)) {
      alert("Only JPG / JPEG / PNG images are allowed");
      if (inputFile.current) inputFile.current.value = "";
      return;
    }

    // Validate MIME type (stronger check)
    if (!selectedFile.type.startsWith("image/")) {
      alert("Only image files are allowed");
      if (inputFile.current) inputFile.current.value = "";
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds 15 MB limit");
      if (inputFile.current) inputFile.current.value = "";
      return;
    }

    // Store valid file in state
    setFile(selectedFile);
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3">
      {/* Blog title input */}
      <Label className="flex left-0 p-2">Blog Post Title:</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        name="title"
      />

      {/* Blog description input */}
      <Label className="flex left-0 p-2">Blog Description:</Label>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
        required
        name="description"
      />

      {/* Blog content textarea */}
      <Label className="flex left-0 p-2">Blog Content:</Label>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
        required
        name="content"
      />

      {/* Header image upload */}
      <Label className="flex left-0 p-2">Insert Header Image:</Label>
      <Input
        type="file"
        onChange={handleFileUpload}
        ref={inputFile}
        className="cursor-pointer hover:bg-accent"
        required
        accept=".jpg,.jpeg,.png"
      />

      {/* Optional preview */}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="max-h-48 mt-3 rounded"
        />
      )}

      {/* Submit button */}
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};
