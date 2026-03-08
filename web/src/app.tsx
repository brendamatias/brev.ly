import { CreateLinkForm } from "./components/create-link-form";
import logo from "@/assets/logo.svg";
import { LinksList } from "./components/links-list";

export function App() {
  return (
    <div className="bg-gray-200 h-screen flex justify-center md:pt-22 pt-0">
      <div className="md:max-w-341.5 w-full px-3 py-8 md:py-0 md:px-8">
        <img
          src={logo}
          alt="brev.ly logo"
          className="h-6 w-24 mb-6 mx-auto md:mx-0"
        />

        <div className="flex md:flex-row flex-col gap-3 md:gap-5">
          <CreateLinkForm />
          <LinksList />
        </div>
      </div>
    </div>
  );
}
