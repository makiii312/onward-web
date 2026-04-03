type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="w-full min-h-40 flex items-center justify-center">
    <p className="text-gray-500 font-bold">{message}</p>
  </div>
);

export default EmptyState;
