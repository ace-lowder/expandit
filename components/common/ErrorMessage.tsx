interface ErrorMessageProps {
  message: string;
  show: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show }) => {
  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded shadow-lg"
      style={{ zIndex: 1000 }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
