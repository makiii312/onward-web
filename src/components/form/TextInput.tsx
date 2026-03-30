type TextInputProps = {
  label: string;
  required?: boolean;
};

const TextInput = ({ label, required = false }: TextInputProps) => {
  const placeholderMessage = `Enter ${label.toLowerCase()}`;

  return (
    <div className="w-full">
      <label className="w-full text-xs font-semibold text-gray-800">
        {label}
        {required && <span>*</span>}
      </label>

      <input
        type="text"
        placeholder={placeholderMessage}
        className="w-full bg-grey-25 border-2 border-gray-100 rounded-md px-2 py-1"
      />
    </div>
  );
};

export default TextInput;
