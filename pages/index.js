import { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let newChat = chats.map((item) => item);
    if (input.length <= 0) return alert("provide a input value");
    newChat.push({ user: "me", message: input });
    setChats(newChat);
    setInput("");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newChat.map((chat) => chat.message).join("\n"),
      }),
    };

    let res = await fetch("/api/chat", options);
    let data = await res.json();
    setChats(() => [...newChat, { user: "ai", message: `${data.message}` }]);
  }

  function clearChat() {
    setChats([]);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Enhance Ai Web App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        {/* responsive aside */}
        <div
          className='center'
          onClick={() => {
            const aside = document.querySelector(".aside");
            document.body.classList.toggle("mrLeft");
            aside.classList.toggle("open");
          }}>
          <div></div>
        </div>
        <aside className='aside'>
          <div className={styles.newChat} onClick={clearChat}>
            + New Chat
          </div>
        </aside>

        <div className={styles.chat}>
          <div className={styles.messages}>
            {chats.map((chat, i) => (
              <div key={i}>
                <div className={styles.logo}>
                  {chat.user === "me" ? "Me" : "Ai"}
                </div>
                <div
                  className={styles.message}
                  style={{
                    backgroundColor: chat.user === "ai" ? "rebeccapurple" : "",
                  }}>
                  {chat.message}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </main>
    </>
  );
}
