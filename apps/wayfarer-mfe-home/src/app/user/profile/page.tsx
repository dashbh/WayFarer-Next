import { getCurrentUser } from "@wayfarer/utils";
// import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
  const user: any = await getCurrentUser();

  if (!user) {
    return <p>Unauthorized. Please log in.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.email}!</h1>
      {/* <LogoutButton /> */}
    </div>
  );
}
