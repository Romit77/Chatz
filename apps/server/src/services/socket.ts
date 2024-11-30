import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "sca-post-db.e.aivencloud.com",
  port: 10812,
  username: "default",
  password: "AVNS_pAop0FBdegCBjqDNd_Z",
});

const sub = new Redis({
  host: "sca-post-db.e.aivencloud.com",
  port: 10812,
  username: "default",
  password: "AVNS_pAop0FBdegCBjqDNd_Z",
});

class SocketService {
  private _io: Server;
  constructor() {
    console.log("init socket server");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    console.log("init listeners");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("new msg receiveed", message);
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
