"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import styles from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div className={`${styles.page}`}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>All messages will appear here</h1>
        </div>
        <div>
          {messages.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </div>
        <div className={styles.ctas}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="message..."
            className={styles.input}
          />
          <button
            onClick={(e) => sendMessage(message)}
            className={styles.secondary}
          >
            Send
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        {/* Footer content can be added here */}
      </footer>
    </div>
  );
}
