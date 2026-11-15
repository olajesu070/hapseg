import { redirect } from "next/navigation";

export default function ShopRedirectPage() {
  // Direct customers smoothly to the primary shopping feed
  redirect("/fashion");
}
