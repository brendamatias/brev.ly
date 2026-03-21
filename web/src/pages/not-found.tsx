import notFoundImage from "@/assets/404.svg";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center p-3">
      <div className="bg-gray-100 rounded-lg px-5 py-12 md:py-16 md:px-16 text-center">
        <img src={notFoundImage} className="w-41 h-18 mx-auto" alt="404" />
        <h1 className="text-xl text-gray-600 my-6">Link não encontrado</h1>

        <p className="text-gray-500 text-md max-w-121">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <Link to="/" className="text-blue-base underline">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
