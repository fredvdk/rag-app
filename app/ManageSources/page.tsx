import AddFile from "../components/addFile";
import AddURL from "../components/addURL";
import NavigateButton from "../components/button";
import Sources from "../components/sources";

const ManageSourcesPage = async () => {

  return (
    <main className="flex items-center justify-center p-8">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-center">Manage sources</h1>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    Upload files, import sources, or manage existing ones below.
                </p>
            </div>

           <AddURL />
           <AddFile />
            <Sources />

           <hr className="my-6 border-gray-300 dark:border-gray-600" />
        <NavigateButton text="Back" href="/" />
        </div>
       
    </main>
  );
}
export default ManageSourcesPage;