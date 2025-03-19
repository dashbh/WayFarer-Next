import LoginForm from "@/components/LoginForm";

interface LoginPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return <LoginForm searchParams={params} />;
}
