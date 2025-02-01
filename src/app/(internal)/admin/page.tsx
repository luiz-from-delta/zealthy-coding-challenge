import {
  InternalDataLayout,
  OnboardingCustomization,
  OnboardingCustomizationProps,
} from "@/app/components";
import { firestore } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";
import { redirect } from "next/navigation";

async function rearrange(
  documentId: string,
  fieldId: string,
  fieldValue: string,
  otherField: string
) {
  "use server";

  const docRef = doc(firestore, "onboarding", documentId);
  await updateDoc(docRef, {
    [fieldId]: deleteField(),
  });
  await setDoc(docRef, {
    "first-component": otherField,
  });

  const nextDocRef = doc(
    firestore,
    "onboarding",
    documentId === "second-page" ? "third-page" : "second-page"
  );
  await updateDoc(nextDocRef, {
    "second-component": fieldValue,
  });

  redirect("/admin");
}

export default async function UserAdminPage() {
  const config: OnboardingCustomizationProps["config"] =
    {} as OnboardingCustomizationProps["config"];
  const querySnapshot = await getDocs(
    query(collection(firestore, "onboarding"))
  );
  querySnapshot.forEach((snapshot) => {
    config[snapshot.id as "second-page" | "third-page"] =
      snapshot.data() as OnboardingCustomizationProps["config"][
        | "second-page"
        | "third-page"];
  });

  return (
    <InternalDataLayout
      title="Admin Panel"
      description="Control which data components appear on each step of the registration flow. Ensure every page has the right information by assigning components where they belong. Adjust settings anytime to keep things organized and efficient."
    >
      <OnboardingCustomization config={config} rearrange={rearrange} />
    </InternalDataLayout>
  );
}
