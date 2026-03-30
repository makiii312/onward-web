type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="flex flex-col w-full max-w-md rounded-3xl bg-white px-10 py-12 shadow space-y-4 gap-y-8">
      <h1 className="text-center text-3xl font-bold text-grey-700">{title}</h1>

      <div className="flex flex-col gap-y-12">{children}</div>
    </div>
  );
};

export default AuthCard;
