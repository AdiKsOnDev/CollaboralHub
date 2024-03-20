import {
  T,
  TLRecord,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export default function () {
  let changes = {};
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState("a");

  const store = createTLStore({
    shapeUtils: defaultShapeUtils,
  });

  useEffect(() => {
    // create the socket connection only once
    const socket = io.connect("http://localhost:8080");
    setSocket(socket);

    return () => socket.disconnect();
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
    socket?.on("board rec", (changes: any) => {
      const toRemove = [];
      const toPut = [];

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

  const setRoomfunc = (event, room) => {
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
