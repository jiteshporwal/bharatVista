import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export const dynamic = "force-dynamic";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifyAdminSession(sessionToken);

  // If unauthenticated, redirect server-side immediately
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient adminEmail={session.email}>
      {children}
    </AdminLayoutClient>
  );
}

