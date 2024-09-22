import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(9);
  const [allowedNumbers, setAllowedNumbers] = useState(false);
  const [allowedCharacters, setAllowedCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowedNumbers) str += "0123456789";
    if (allowedCharacters) str += "~!@#$%^&*{}[]/-+=;,.?";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      console.log(index);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, allowedNumbers, allowedCharacters, setPassword]); // any changes in the mentioned dependencies will cache a new function

  useEffect(() => {
    generatePassword();
  }, [length, allowedCharacters, allowedNumbers]); // any changes in the mentioned dependencies will call generatePassword()

  return (
    <div className="bg-black w-full h-screen py-8 px-4">
      <div className="w-full max-w-2xl bg-gray-700 mx-auto my-8 px-3 py-3 text-orange-500 rounded-lg">
        <h1 className="text-3xl text-center my-4 text-white">
          Password Generator
        </h1>
        <div className="text-2xl rounded-lg h-[48px] flex flex-nowrap mb-6">
          <input
            type="text"
            className="outline-none rounded-l-lg px-6 py-2 w-full "
            value={password}
            placeholder="Password"
            readOnly
          />
          <button className="rounded-r-lg bg-blue-500 text-white px-3 py-2 cursor-pointer">
            copy
          </button>
        </div>

        <div className="flex text-xl text-orange-500">
          <div>
            <input
              type="range"
              className="mx-4 cursor-pointer"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            Length {`(${length})`}
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={allowedNumbers}
              className="mx-2"
              onChange={() => setAllowedNumbers((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={allowedCharacters}
              className="mx-2"
              onChange={(prev) => setAllowedCharacters((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
