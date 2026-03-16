import { Button } from "./button";
import { Input } from "./input";

export function CreateLinkForm() {
  return (
    <div className="bg-gray-100 p-6 md:p-8 rounded-lg w-full md:w-95 md:min-w-95 self-start">
      <h1 className="text-lg text-gray-600">Novo link</h1>
      <form className="flex flex-col gap-4 mt-5 md:mt-6">
        <Input label="Link original" placeholder="www.exemplo.com.br" />
        <Input label="Link encurtado" placeholder="brev.ly/" />

        <Button className="mt-1">Salvar link</Button>
      </form>
    </div>
  );
}
