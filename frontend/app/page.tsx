import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/terms?callbackUrl=${encodeURIComponent(`/dashboard`)}`);
}
