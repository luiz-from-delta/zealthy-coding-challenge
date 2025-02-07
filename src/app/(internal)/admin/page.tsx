import {
  ComponentConfig,
  InternalDataLayout,
  OnboardingCustomization,
} from "@/app/components";
import { firestore } from "@/app/lib/firebase";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function updateFields(components: ComponentConfig): Promise<void> {
  "use server";

  for (const [pageName, pageComponents] of Object.entries(components)) {
    const docRef = doc(firestore, "onboarding", pageName);

    await setDoc(docRef, {
      "first-component": pageComponents["first-component"],
      ...(pageComponents["second-component"] && {
        "second-component": pageComponents["second-component"],
      }),
    });
  }

  redirect("/admin");
}

export default async function UserAdminPage() {
  const config = {} as ComponentConfig;

  const querySnapshot = await getDocs(
    query(collection(firestore, "onboarding"))
  );

  querySnapshot.forEach((snapshot) => {
    const key = snapshot.id as "second-page" | "third-page";
    config[key] = snapshot.data() as ComponentConfig[
      | "second-page"
      | "third-page"];
  });

  return (
    <InternalDataLayout
      title="Admin Panel"
      description="Control which data components appear on each step of the registration flow. Ensure every page has the right information by assigning components where they belong. Adjust settings anytime to keep things organized and efficient."
    >
      <OnboardingCustomization
        initialConfig={config}
        updateFields={updateFields}
      />
    </InternalDataLayout>
  );
}
