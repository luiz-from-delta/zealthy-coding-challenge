import { db } from "@/app/lib/prisma";
import { userPatchSchema } from "../validations";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const body = await request.json();

  const params = await context.params;
  const id = parseInt(params.id);

  const validation = userPatchSchema.safeParse(body);

  if (!validation.success) {
    return new Response(
      JSON.stringify({
        data: null,
        error: validation.error.errors[0].message,
        success: false,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  try {
    const { aboutMe, address, birthDate } = validation.data;

    const user = await db.user.update({
      data: {
        aboutMe,
        ...(address && {
          address: {
            upsert: {
              create: address,
              update: address,
            },
          },
        }),
        birthDate: birthDate ? new Date(birthDate) : undefined,
      },
      include: { address: true },
      where: {
        id,
      },
    });

    return new Response(
      JSON.stringify({ data: user, error: null, success: true }),
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
