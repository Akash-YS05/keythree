// src/pages/index.tsx
import AddEntryForm from "../components/add-entry-form";
import UpdateEntryForm from "../components/update-entry-form";
import FetchEntry from "../components/fetch-entry";

export default function Home() {
  return (
    <div>
      <h1>Keychain App</h1>
      <AddEntryForm />
      <UpdateEntryForm />
      <FetchEntry label="tst" />
    </div>
  );
}
