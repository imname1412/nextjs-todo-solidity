import React, { useState, useEffect } from "react";
import Head from "next/head";
import ButtonConnect from "../components/ButtonConnect";
import TodoList from "../components/TodoList";
import TaskAbi from "../../sm-contract/build/contracts/TodoContract.json";
import { TaskContractAddress } from "../config";
import { ethers } from "ethers";

export default function Home() {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({
        method: "eth_chainId",
      });
      console.log("connected to chain:", chainId);

      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("you are not connected to the rinkeby testnet");
        setCorrectNetwork(false);
        return;
      } else {
        setCorrectNetwork(true);
      }

      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found account", account[0]);
      setIsUserLoggedIn(true);
      setCurrentAccount(account[0]);
    } catch (error) {
      throw error;
    }
  };

  const getAllTask = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provide = new ethers.providers.Web3Provider(ethereum);
        const signer = provide.getSigner();
        const TodoContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        let allTask = await TodoContract.getMyTask();
        setTasks(allTask);
        console.log("get all tasks");
      } else {
        console.log("ethreum object does not exist!");
      }
    } catch (error) {
      throw error;
    }
  };

  const addTask = async () => {
    let task = {
      taskText: input,
      isDelete: false,
    };

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provide = new ethers.providers.Web3Provider(ethereum);
        const signer = provide.getSigner();
        const TodoContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        //* addTask(string memory _taskText, bool isDeleted)
        const request = await TodoContract.addTask(
          task.taskText,
          task.isDelete
        ).catch((err) => console.log(err));
        setTasks((prev) => [...prev, task]);
        console.log("Added task");
      } else {
        console.log("ethreum object does not exist!");
      }
    } catch (error) {
      throw error;
    }
    setInput("");
  };

  const delTask = async (id) => {
    const decimalId = +id._hex;
    console.log(decimalId)
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provide = new ethers.providers.Web3Provider(ethereum);
        const signer = provide.getSigner();
        const TodoContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        const delTaskTx = await TodoContract.delTask(decimalId, true);
        console.log("successfully deleted: ", delTaskTx);

        let allTask = await TodoContract.getMyTask();
        setTasks(allTask);
      } else {
        console.log("ethreum object does not exist!");
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    connectWallet();
    getAllTask();
  }, []);

  return (
    <div className="bg-slate-700 min-h-[100vh] flex items-center justify-center">
      <Head>
        <title>Web3 Todo</title>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsLU5F1MnuyOQu8L3-aU8QfenXYVn10ZXqDedd-FulPrTyNkwXwVvIyDiAOiLHe_ymYJM&usqp=CAU"
        />
      </Head>
      <div>
        {isUserLoggedIn ? (
          <>
            {correctNetwork ? (
              <TodoList
                currentAccount={currentAccount}
                input={input}
                setInput={setInput}
                addTask={addTask}
                myTask={tasks}
                delTask={delTask}
              />
            ) : (
              <h1>Wrong Network 💡</h1>
            )}
          </>
        ) : (
          <>
            <ButtonConnect connectWallet={connectWallet} />
          </>
        )}
      </div>
    </div>
  );
}
