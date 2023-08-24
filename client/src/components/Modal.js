import { useState } from "react";
const Modal = ({ mode,setShowModal ,task }) => {
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    user_email: editMode?task.user_email:'bob@test.com',
    title: editMode?task.title:null,
    progress: editMode?task.progress:50,
    date: editMode ? "" : new Date()
  });
  const handleChange = (e) => {
    console.log("changing", e);
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value
    }));
    console.log(data)
  };
const postData=async(e)=>{
    e.preventDefault()
    try{
        const response=await fetch('http://localhost:8000/todos',{
            method:"POST",
            headers:{'content-Type':'application/json'},
            body:JSON.stringify(data)
        })

    }catch(err){
        console.log(err)

    }
}

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>let's {mode} you task</h3>
          <button onClick={()=>setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="ypur task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label for="range">Draf=g to select your current progress</label>
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
          <input className={mode} type="submit" onClick={editMode?'':postData}/>
        </form>
      </div>
    </div>
  );
};

export default Modal;
