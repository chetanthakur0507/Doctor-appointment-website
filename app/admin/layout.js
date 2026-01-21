import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Admin Panel - Medi.care",
  description: "Admin Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      {children}
      
    </>
  );
}
