import { InternalDataLayout, UserDataTable } from "@/app/components";

export default async function UserDataPreviewPage() {
  const usersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
    {
      method: "GET",
    }
  );
  const { data: users, error, success } = await usersResponse.json();

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
