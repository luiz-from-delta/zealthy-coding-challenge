import {
  InternalDataLayout,
  UserDataTable,
  UserWithAddress,
} from "@/app/components";

type ApiResponse =
  | {
      data: UserWithAddress[];
      error: null;
      success: true;
    }
  | {
      data: null;
      error: string;
      success: false;
    };

export default async function UserDataPreviewPage() {
  const {
    data: users,
    error,
    success,
  } = await new Promise<ApiResponse>(async (resolve) => {
    try {
      const usersResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const { data: users, error, success } = await usersResponse.json();

      resolve({ error, success, data: users });
    } catch (error) {
      resolve({ error: (error as Error).message, success: false, data: null });
    }
  });

  return (
    <InternalDataLayout
      title="User Data Preview"
      description="This is a simple table displaying user data from the database. As users progress through the flow, refreshing this page will show the latest entries and no authentication is required. This is just for testing how the app interacts with the backend."
    >
      {success ? (
        <UserDataTable data={users} />
      ) : (
        `It was not possible to load users' data. Error: ${error}`
      )}
    </InternalDataLayout>
  );
}
