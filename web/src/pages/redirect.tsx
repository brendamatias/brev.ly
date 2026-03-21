import logo from "@/assets/logo-small.svg";
import { useLinkByShortUrl } from "@/services";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>();

  if (!shortUrl) return <Navigate to="/" />;

  const { data } = useLinkByShortUrl(shortUrl);

  useEffect(() => {
    if (data?.originalUrl) {
      window.location.href = data.originalUrl;
    }
  }, [data?.originalUrl]);

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg p-16 text-center">
        <img src={logo} className="w-12 h-12 mx-auto" alt="Logo" />
        <h1 className="text-xl text-gray-600 my-6">Redirecionando...</h1>

        <p className="text-gray-500 text-md">
          O link será aberto automaticamente em alguns instantes. <br />
          Não foi redirecionado? <a className="text-blue-base">Acesse aqui</a>
        </p>
      </div>
    </div>
  );
}
