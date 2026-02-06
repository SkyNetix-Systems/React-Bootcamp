// React hooks for state management and DOM access
import { useState, useRef } from "react";

// API function to create a new blog post
import { createPost } from "../api";

// UI components (shadcn/ui style)
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateBlog() {
  // State for blog title
  const [title, setTitle] = useState("");

  // State for short blog description
  const [description, setDescription] = useState("");

  // State for full blog content
  const [content, setContent] = useState("");

  // State to store uploaded image file
  const [file, setFile] = useState();

  // Maximum allowed file size (15 MB)
  const MAX_FILE_SIZE = 15000000;

  // Reference to file input element (used to reset it manually)
  const inputFile = useRef(null);

  // Handles form submission
  async function handleSubmit(e) {
    // Prevent page reload
    e.preventDefault();

    // Construct blog post payload
    let submitObject = {
      title: title,
      description: description,
      content: content,
      author: null, // Can be filled from auth context later
      dateCreated: new Date(), // Timestamp of blog creation
      file: file, // Header image file
    };

    // Call API to create the blog post
    await createPost(submitObject);
  }

  // Handles file selection and validation
  function handleFileUpload(e) {
    // Get the first selected file
    const file = e.target.files[0];

    // Extract file extension
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));

    // Validate file type
    if (
      fileExtension != ".jpg" &&
      fileExtension != ".jpeg" &&
      fileExtension != ".png"
    ) {
      alert("Files must be jpg or png");

      // Reset file input
      inputFile.current.value = "";
      inputFile.current.type = "file";
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the limit (15 Mb)");

      // Reset file input
      inputFile.current.value = "";
      inputFile.current.type = "file";
      return;
    }

    // Store valid file in state
    setFile(file);
  }

  return (
    // Blog creation form
    <form onSubmit={handleSubmit} className="w-1/3">
      {/* Blog title input */}
      <Label className="flex left-0 p-2">Blog Post Title:</Label>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        name="title"
      />

      {/* Blog description input */}
      <Label className="flex left-0 p-2">Blog Description:</Label>
      <Input
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
        required
        name="description"
      />

      {/* Blog content textarea */}
      <Label className="flex left-0 p-2">Blog Content:</Label>
      <Textarea
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
      />

      {/* Submit button */}
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
}
