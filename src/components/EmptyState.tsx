type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="flex min-h-40 w-full items-center justify-center">
    <p className="font-bold text-gray-500">{message}</p>
  </div>
);

export default EmptyState;
