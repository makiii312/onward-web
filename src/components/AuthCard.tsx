type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow space-y-4">
      <h1 className="text-center text-lg font-semibold text-gray-800">
        {title}
      </h1>

      {children}
    </div>
  );
};

export default AuthCard;
