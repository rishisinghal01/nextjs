type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserProfile({ params }: Props) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10">

        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-5xl shadow-lg">
            👤
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-white">
          User Profile
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Dynamic Profile Page
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-8">

          <p className="text-gray-400 text-lg mb-3">
            User ID
          </p>

          <div className="rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 p-5 break-all text-center">

            <span className="text-cyan-400 text-xl font-semibold tracking-wide">
              {id}
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}