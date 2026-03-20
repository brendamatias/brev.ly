import { LinkIcon, SpinnerIcon } from "@phosphor-icons/react";
import { Button } from "./button";
import { LinkItem } from "./link-item";
import { motion } from "framer-motion";
import { useLinks } from "@/services";

export function LinksList() {
  const { data, isPending, isFetching } = useLinks({ page: 1, pageSize: 10 });

  const isLoading = isPending || isFetching;

  return (
    <div className="bg-gray-100 md:p-8 p-6 rounded-lg flex flex-col md:gap-5 gap-4 w-full self-start relative overflow-hidden">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-0.5">
          <motion.div
            className="absolute top-0 h-full w-40 bg-blue-base"
            initial={{ left: "-10rem" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "linear",
            }}
          />
        </div>
      )}

      <div className="flex justify-between gap-4 items-center">
        <h1 className="text-lg text-gray-600">Meus links</h1>
        <Button
          icon="downloadSimple"
          theme="secondary"
          size="sm"
          disabled={isLoading}
        >
          Baixar CSV
        </Button>
      </div>

      <div className="border-t-gray-200 border-t" />

      {data?.data?.length === 0 || isLoading ? (
        <div className="pt-4 pb-6 mt-4">
          <div className="flex flex-col items-center gap-3">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: "linear",
                }}
              >
                <SpinnerIcon size={32} className="text-gray-500" />
              </motion.div>
            ) : (
              <LinkIcon size={32} className="text-gray-500" />
            )}

            <span className="uppercase text-xs font-normal text-gray-500">
              {isLoading
                ? "Carregando links"
                : "Ainda não existem links cadastrados"}
            </span>
          </div>
        </div>
      ) : (
        <div className="md:max-h-100 max-h-75 overflow-y-auto pr-4 -mr-4 md:pr-6 md:-mr-6">
          <div className="flex flex-col gap-4">
            {data?.data?.map((link) => (
              <LinkItem key={link.id} {...link} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
