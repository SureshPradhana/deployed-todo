import { useState } from "react";
import { useRef, useEffect } from "react";
import { useCookies } from 'react-cookie'

const Modal = ({ mode, setShowModal, task, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === "edit" ? true : false;
  const inputRef = useRef(null);
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(data);
  };

  const postData = async (e) => {
    e.preventDefault();
    console.log(process.env.HELLO)

    try {
      const response = await fetch(`http://localhost:8000/todos`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        console.log("worked");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        console.log("worked");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>let's {mode} you task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="ypur task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
            ref={inputRef}
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            min="0"
            id="range"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
