import { GraduationCap } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <section className="min-h-lvh relative bg-linear-to-br from-neutral-50 to-primary-50 flex items-center justify-center px-4 py-10">
      {/* decorations */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary-100 blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-indigo-100 blur-3xl opacity-50" />
      <div className="absolute top-10 left-10 grid grid-cols-6 gap-2 opacity-30">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary-500" />
        ))}
      </div>

      {/* Content */}
      <div className="w-full relative z-10 max-w-lg rounded-3xl bg-white p-8 shadow-xl border border-neutral-200">
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="bg-primary-700 text-white p-2 rounded-xl">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-xl font-bold text-neutral-900">
            Student Dashboard
          </h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900">{title}</h2>
          <p className="text-neutral-500 mt-2">{subtitle}</p>
        </div>

        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
