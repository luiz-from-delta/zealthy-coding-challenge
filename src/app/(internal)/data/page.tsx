import { InternalDataLayout } from "@/app/components";

export default function UserDataPreviewPage() {
  return (
    <InternalDataLayout
      title="User Data Preview"
      description="This is a simple table displaying user data from the database. As users progress through the flow, refreshing this page will show the latest entries and no authentication is required. This is just for testing how the app interacts with the backend."
    >
      Hi
    </InternalDataLayout>
  );
}
