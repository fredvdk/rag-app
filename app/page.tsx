
import NavigateButton from "./components/button";
import Question from "./components/question";
import Sources from "./components/sources";

const HomePage = async () => {

  return (
    <main className="flex flex-col p-8 justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center">AI agent</h1>
        <Question />
        <NavigateButton text="Manage Sources" href="/ManageSources" />
      </div>
    </main>
  );
}
export default HomePage;
