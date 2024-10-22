import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const defaultPicture = "/default-picture.png"; // use your own default image path
    dispatch(setUser({ username, picture: picture || defaultPicture }));
    navigate("/tasks");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Enter Your Info</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 rounded"
      />
      <input type="file" accept="image/*" onChange={handlePictureChange} />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default UserForm;
