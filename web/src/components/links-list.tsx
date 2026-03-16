import { LinkIcon, SpinnerIcon } from "@phosphor-icons/react";
import { Button } from "./button";
import { LinkItem } from "./link-item";
import { motion } from "framer-motion";

export function LinksList() {
  const links = 10;
  const isEmpty = links === 0;
  const loading = false;

  return (
    <div className="bg-gray-100 md:p-8 p-6 rounded-lg flex flex-col md:gap-5 gap-4 w-full self-start relative overflow-hidden">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-[2px]">
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
        <Button icon="downloadSimple" theme="secondary" disabled={loading}>
          Baixar CSV
        </Button>
      </div>

      <div className="border-t-gray-200 border-t" />

      {isEmpty || loading ? (
        <div className="pt-4 pb-6 mt-4">
          <div className="flex flex-col items-center gap-3">
            {loading ? (
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
              {loading
                ? "Carregando links"
                : "Ainda não existem links cadastrados"}
            </span>
          </div>
        </div>
      ) : (
        <div className="md:max-h-100 max-h-75 overflow-y-auto pr-4 -mr-4 md:pr-6 md:-mr-6">
          <div className="flex flex-col gap-4">
            {Array.from({ length: links }).map((_, index) => (
              <LinkItem key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
