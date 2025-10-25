import Header from "./components/Header/Header";
import { AppRouter } from "./routes/AppRouter";


export default function App() {
  return (
    <div className="min-h-screen bg-[#1f2733] text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-[120px] px-4 pb-10 md:pt-[100px]">
        <AppRouter />
      </main>
    </div>
  );
}
