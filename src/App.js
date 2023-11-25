import React, { useState } from "react";
import axios from "axios";

function LoadingModal({ express }) {
  if (!express) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        Loading...
      </div>
    </div>
  );
}

function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === "id"){
      setId(value);
    }else if(name === "password"){
      setPassword(value);
    }
  };

  const handleClick = (e) => {
    if (id === "" || password === "") {
      alert("이벤트가 중단되었습니다.");
      e.preventDefault();
    }

    setIsLoading(true);
    
    const response = axios.post("http://localhost:8000/user/login", {
      id: id,
      pw: password,
    });
    try {
      console.log("data");
      console.log(response.data.id);
      console.log(response.data.pw);

    } catch (e) {
      console.log("error");
      console.log(e);
    }finally{
      setTimeout(() => setIsLoading(false), 1500);
    }

    const data = response.data;

    if(response.data.id != "umcweb"){
      data.cod = "401";
      setId(data);
      console.log(id);
    }
    if(response.data.pw != "1234"){
      data.cod = "402";
      setPassword(data);
      console.log(password);
    }

  };

  return (
    <div>
      <input name="id" value={id} onChange={handleChange} />
      <input name="password" value={password} type="password" onChange={handleChange}/>
      <input type="submit" value={"로그인"} onClick={handleClick}/>
      <LoadingModal express={isLoading} />
    </div>
  );
}

export default App;