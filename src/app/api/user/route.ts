import { db } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const params = url.searchParams;

  const pageNumber = params.get("pageNumber");
  const pageSize = params.get("pageSize");

  const take = pageSize ? parseInt(pageSize) : 10;
  const skip = pageNumber ? parseInt(pageNumber) * take : 0;

  try {
    const users = await db.user.findMany({
      include: {
        address: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take,
    });

    return new Response(
      JSON.stringify({ data: users, error: null, success: true }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: null,
        error: (error as Error).message,
        success: false,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
