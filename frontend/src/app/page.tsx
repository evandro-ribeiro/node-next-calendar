import { Suspense } from "react";
import LoginFormComponent from "./components/LoginForm";

export default function Home() {
  return (
    <main>
      <Suspense>
        <LoginFormComponent />
      </Suspense>
    </main>
  );
}
