import {
  T,
  TLRecord,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export default function () {
  let changes: any = {};
  const [socket, setSocket] = useState<Socket>();
  const [room, setRoom] = useState("a");

  const store = createTLStore({
    shapeUtils: defaultShapeUtils,
  });

  useEffect(() => {
    // creating the socket connection once
    const socketInstance = io("https://synergyserver-dev-eddj.1.us-1.fl0.io");
    setSocket(socketInstance);
  
    // cleaning up the connection when the component disconnect
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  

  store.listen((entry) => {
    changes = entry.changes;
    if (entry.source === "user") {
      sendBoard();
    }
  });

  const sendBoard = () => {
    socket?.emit("board sent", changes, room);
    console.log(room);
  };

  //use Effect if message recevied
  useEffect(() => {
    // handle the incoming messages
    socket?.on("board rec", (changes: {
      added: Record<string, TLRecord>,
      updated: Record<string, [unknown, TLRecord]>,
      removed: Record<string, TLRecord>,
    }) => {
      const toRemove: TLRecord["id"][] = [];
      const toPut: TLRecord[] = [];
  
      for (const [id, record] of Object.entries(changes.added)) {
        toPut.push(record);
      }
      for (const [id, record] of Object.entries(changes.updated)) {
        if (
          id != "instance:instance" &&
          id != "camera:page:page" &&
          id != "pointer:pointer"
        ) {
          toPut.push(record[1]);
        }
      }
  
      for (const [id, record] of Object.entries(changes.removed)) {
        toRemove.push(record.id);
      }
  
      store.mergeRemoteChanges(() => {
        if (toRemove.length) store.remove(toRemove);
        if (toPut.length) store.put(toPut);
      });
    });
  }, [socket]);

  const setRoomfunc = (event: any, room: string) => {
    event.preventDefault(setRoom(room));
  };

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(event) => setRoomfunc(event, event.target.value)}
        />
        <button onClick={() => socket?.emit("join room", room)}>
          {" "}
          Join Room
        </button>
      </div>
      <div style={{ position: "fixed", inset: 50 }}>
        <Tldraw store={store} />
      </div>
    </>
  );
}
