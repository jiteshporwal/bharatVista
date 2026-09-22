import { cookies } from "next/headers";
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

  // If authenticated, wrap with full Admin console sidebar & layout
  if (session) {
    return (
      <AdminLayoutClient adminEmail={session.email}>
        {children}
      </AdminLayoutClient>
    );
  }

  // If unauthenticated (e.g. visiting /admin/login), render page directly without sidebar
  // (Next.js middleware enforces protection on all /admin/* sub-routes)
  return <>{children}</>;
}
