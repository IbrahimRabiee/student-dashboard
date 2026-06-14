const AuthButton = ({ loading, children, loadingText }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full rounded-xl bg-primary-700 py-3 font-semibold text-white shadow-md transition ${
        loading
          ? "cursor-not-allowed opacity-60"
          : "hover:bg-primary-800 hover:shadow-lg"
      }`}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default AuthButton;
