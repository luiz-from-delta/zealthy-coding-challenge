import {
  ComponentConfig,
  InternalDataLayout,
  OnboardingCustomization,
} from "@/app/components";
import { firestore } from "@/app/lib/firebase";
import {
  collection,
  deleteField,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { redirect } from "next/navigation";

async function rearrangeFields(
  documentId: string,
  from: { id: string; value: string },
  to: { value: string }
): Promise<void> {
  "use server";

  const fromDocRef = doc(firestore, "onboarding", documentId);
  await updateDoc(fromDocRef, {
    [from.id]: deleteField(),
  });
  await setDoc(fromDocRef, {
    "first-component": to.value,
  });

  const otherDocumentId =
    documentId === "second-page" ? "third-page" : "second-page";

  const toDocRef = doc(firestore, "onboarding", otherDocumentId);
  await updateDoc(toDocRef, {
    "second-component": from.value,
  });

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
        config={config}
        rearrangeFields={rearrangeFields}
      />
    </InternalDataLayout>
  );
}
