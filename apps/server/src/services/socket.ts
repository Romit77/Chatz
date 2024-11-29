import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    console.log("init socket server");
    this._io = new Server();
  }

  public initListeners() {
    console.log("init listeners");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);

      socket.on("event: message", async ({ message }: { message: string }) => {
        console.log("new msg receiveed", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
