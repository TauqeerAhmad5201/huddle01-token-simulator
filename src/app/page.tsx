"use client";

import { generateRoomId } from "@/generateRoomID";
import { useState } from "react";
import { Button } from "./Button";

export const dynamic = "force-dynamic";

export default function Component() {
  const [roomID, setRoomID] = useState("");
  const [accessToken, setAccessToken] = useState("");

  return (
    <div className="w-full min-h-screen bg-black p-8 flex flex-col items-center justify-center text-black">
      <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-center w-full text-black font-bold">
            Token Simulator
          </h2>
        </div>
        <div className="mt-8">
          <Button
            onClick={async () => {
              const roomID = await generateRoomId();
              setRoomID(roomID);
            }}
          >
            Generate RoomID
          </Button>
        </div>
        <div className="mt-4 p-4 bg-gray-200 rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {roomID ? roomID : "RoomID"}
            </h3>
            <button
              className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-700 rounded-full"
              onClick={() => navigator.clipboard.writeText(roomID)}
            >
              <CopyIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Button
            onClick={async () => {
              const accessToken = await fetch(`/api?roomId=${roomID}`);
              setAccessToken(await accessToken.text());
            }}
          >
            Generate AccessToken
          </Button>
        </div>
        <div className="mt-4 p-4 bg-gray-200 rounded-md">
          <div className="flex">
            <h3 className="text-md font-medium w-full text-ellipsis overflow-hidden">
              {accessToken ? accessToken : "Access Token"}
            </h3>
            <button
              className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-700 rounded-full"
              onClick={() => navigator.clipboard.writeText(accessToken)}
            >
              <CopyIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
