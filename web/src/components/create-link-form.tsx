import { Button } from "./button";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateLink } from "@/services";
import toast from "react-hot-toast";

const schema = z.object({
  originalUrl: z
    .url("Informe uma URL válida")
    .min(1, "Informe o link original"),
  shortUrl: z
    .string()
    .min(1, "Informe o link encurtado")
    .min(3, "O link encurtado deve ter pelo menos 3 caracteres"),
});

type CreateLinkFormData = z.infer<typeof schema>;

export function CreateLinkForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      originalUrl: "",
      shortUrl: "",
    },
  });

  const { mutateAsync } = useCreateLink();

  const onSubmit = async (data: CreateLinkFormData) => {
    await mutateAsync({
      ...data,
      shortUrl: `brev.ly/${data.shortUrl}`,
    });

    reset();
    toast.success("Link criado com sucesso!");
  };

  return (
    <div className="bg-gray-100 p-6 md:p-8 rounded-lg w-full md:w-95 md:min-w-95 self-start">
      <h1 className="text-lg text-gray-600">Novo link</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-5 md:mt-6"
      >
        <Input
          label="Link original"
          placeholder="www.exemplo.com.br"
          {...register("originalUrl")}
          error={errors?.originalUrl?.message}
        />
        <Input
          label="Link encurtado"
          {...register("shortUrl")}
          prefix="brev.ly/"
          error={errors?.shortUrl?.message}
        />

        <Button className="mt-1" type="submit">
          Salvar link
        </Button>
      </form>
    </div>
  );
}
