import IOSSLider from "./components/IOSSLider";
import TabSelect from "./components/TabSelect";

export default function App() {
  return (
    <div className="w-screen bg-neutral-950 h-screen flex flex-col gap-5 justify-center items-center">
      <TabSelect />
      <IOSSLider />
    </div>
  );
}
