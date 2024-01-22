import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roomId = searchParams.get("roomId");
  const apiKey = searchParams.get("apiKey");
  const role = searchParams.get("role");

  if (!apiKey) return new Response("apiKey is required", { status: 400 });
  if (!roomId) return new Response("roomId is required", { status: 400 });
  if (!role) return new Response("role is required", { status: 400 });

  const accessToken = new AccessToken({
    apiKey: apiKey,
    roomId: roomId,
    role: role as Role,
    // permissions: {
    //   admin: true,
    //   canConsume: true,
    //   canProduce: true,
    //   canProduceSources: {
    //     cam: true,
    //     mic: true,
    //     screen: true,
    //   },
    //   canRecvData: true,
    //   canSendData: true,
    //   canUpdateMetadata: true,
    // },
  });

  const token = await accessToken.toJwt();

  return new Response(token, { status: 200 });
}
