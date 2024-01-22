"use server";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const generateAccessToken = async (roomId: string) => {
  const accessToken = new AccessToken({
    apiKey: process.env.API_KEY || "",
    roomId: roomId,
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });

  const token = await accessToken.toJwt();

  return token;
};
