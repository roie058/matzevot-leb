import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/UI/LoadingSpinner";
export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  });

  return <LoadingSpinner />;
}
