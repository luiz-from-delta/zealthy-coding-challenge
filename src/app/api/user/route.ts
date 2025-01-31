import { db } from "@/app/lib/prisma";
import { userSchema } from "./validations";
import { cognitoService } from "@/app/lib/aws";
import { CognitoIdentityServiceProvider } from "aws-sdk";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const params = url.searchParams;

  const pageNumber = params.get("pageNumber");
  const pageSize = params.get("pageSize");

  const take = pageSize ? parseInt(pageSize) : undefined;
  const skip = pageNumber && take ? parseInt(pageNumber) * take : 0;

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

export async function POST(request: Request) {
  const body = await request.json();

  const validation = userSchema.safeParse(body);

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
    const { aboutMe, address, birthDate, email, password } = validation.data;

    const user = await db.$transaction(async (trx) => {
      try {
        const params: CognitoIdentityServiceProvider.AdminCreateUserRequest = {
          MessageAction: "SUPPRESS",
          TemporaryPassword: password,
          UserAttributes: [
            {
              Name: "email",
              Value: email,
            },
            {
              Name: "custom:aboutMe",
              Value: aboutMe || "Nothing here yet...",
            },
          ],
          Username: email,
          UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID || "",
        };

        const cognitoUser = await cognitoService
          .adminCreateUser(params)
          .promise();

        if (!cognitoUser.User) {
          throw new Error("User was not created correctly in Cognito!");
        }

        const subAttribute = cognitoUser.User?.Attributes?.find((attribute) => {
          return attribute.Name === "sub";
        });

        if (!subAttribute) {
          throw new Error("It was not possible to get the Cognito id!");
        }

        const cognitoId = String(subAttribute.Value);

        const passwordUpdatePromise = cognitoService
          .adminSetUserPassword({
            Password: password,
            Permanent: true,
            Username: email,
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID || "",
          })
          .promise();

        const userCreationPromise = trx.user.create({
          data: {
            aboutMe,
            ...(address && { address: { create: address } }),
            birthDate,
            cognitoId,
            email,
          },
        });

        const [_, user] = await Promise.all([
          passwordUpdatePromise,
          userCreationPromise,
        ]);

        return user;
      } catch (error) {
        try {
          await cognitoService
            .adminDeleteUser({
              Username: email,
              UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID || "",
            })
            .promise();
        } catch (error) {}

        throw error;
      }
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
