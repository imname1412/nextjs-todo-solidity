import React, { useState } from "react";
import Head from "next/head";
import ButtonConnect from "../components/ButtonConnect";
import TodoList from "../components/TodoList";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    
  };

  const getAllTask = async () => {

  };

  const addTask = async () => {

  };
  
  const delTask = async () => {

  };

  return (
    <div className="bg-slate-200 min-h-[100vh] flex items-center justify-center">
      <Head>
        <title>TODO</title>
      </Head>
      <div className="border">
        {isConnected ? (
          <TodoList />
        ) : (
          <ButtonConnect setIsConnected={setIsConnected} />
        )}
      </div>
    </div>
  );
}
