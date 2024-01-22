"use client";

import { generateRoomId } from "@/generateRoomID";
import { SVGProps, useEffect, useState } from "react";
import { Button } from "./Button";
import { Role } from "@huddle01/server-sdk/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/utils";

export const dynamic = "force-dynamic";

export default function Component() {
  const [roomID, setRoomID] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [role, setRole] = useState<Role>(Role.HOST);

  useEffect(() => {
    setApiKey(localStorage.getItem("apiKey") || "");
  }, []);

  return (
    <div className="w-full min-h-screen bg-black p-8 flex flex-col items-center justify-center text-black">
      <ToastContainer theme="dark" position="bottom-right" />
      <div className="w-full max-w-3xl p-4 bg-zinc-800 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-center w-full text-slate-300 font-bold">
            Token Simulator
          </h2>
        </div>

        <div className="mt-4 bg-zinc-600 text-slate-200 p-0 bg-blur-lg rounded-md">
          <input
            type="text"
            className="p-4 rounded-md w-full bg-transparent outline-none text-semibold text-slate-200"
            placeholder="Enter API Key"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              localStorage.setItem("apiKey", e.target.value);
            }}
          />
        </div>

        <hr className="my-4 border-t border-slate-400" />

        <div>
          <Button
            onClick={async () => {
              try {
                if (!apiKey) toast.error("Please enter your API Key");

                const rID = await generateRoomId(apiKey);
                setRoomID(rID);
                toast.success("RoomId generated & copied!");
              } catch (error) {
                toast.error("Error generating RoomID!");
              }
            }}
          >
            Generate RoomID
          </Button>
        </div>

        <div className="mt-4 p-4 bg-zinc-600 text-slate-200 bg-blur-lg rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {roomID ? roomID : "RoomID"}
            </h3>
            <button
              className="flex items-center justify-center w-8 h-8 bg-zinc-500 text-slate-300 rounded-full"
              onClick={() => {
                navigator.clipboard.writeText(roomID);
                toast.success("RoomId copied again!");
              }}
              type="button"
            >
              <CopyIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <hr className="my-4 border-t border-slate-400" />

        <div className="flex justify-between">
          {Object.values(Role).map((r) => (
            <button
              type="button"
              key={r}
              className={cn(
                "border border-slate-400 py-1 px-2 rounded-md text-slate-400",
                role === r && "bg-slate-400 text-black"
              )}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <Button
            onClick={async () => {
              try {
                if (!roomID)
                  return toast.error("Please generate RoomID first!");

                const accessToken = await fetch(
                  `/api?roomId=${roomID}&apiKey=${apiKey}&role=${role}`
                );
                const at = await accessToken.text();
                setAccessToken(at);
                navigator.clipboard.writeText(at);
                toast.success("AccessToken generated & copied!");
              } catch (error) {
                toast.error("Error generating AccessToken!");
              }
            }}
          >
            Generate AccessToken
          </Button>
        </div>
        <div className="mt-4 p-4 bg-zinc-600 text-slate-200 rounded-md">
          <div className="flex items-center">
            <h3 className="text-md font-medium w-full text-ellipsis overflow-hidden">
              {accessToken ? accessToken : "Access Token"}
            </h3>
            <button
              className="flex items-center justify-center w-8 h-8 bg-zinc-500 text-slate-300 rounded-full"
              onClick={() => {
                if (!accessToken)
                  return toast.error("AccessToken not generated!");

                navigator.clipboard.writeText(accessToken);
                toast.success("AccessToken copied again!");
              }}
              type="button"
            >
              <CopyIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
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
      <title>CopyIcon</title>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
