import { Button } from "./button";
import { Icon } from "./icon";
import { LinkItem } from "./link-item";

export function LinksList() {
  const isEmpty = false;

  return (
    <div className="bg-gray-100 md:p-8 p-6 rounded-lg flex flex-col md:gap-5 gap-4 w-full self-start">
      <div className="flex justify-between gap-4 items-center">
        <h1 className="text-lg text-gray-600">Meus links</h1>
        <Button icon="downloadSimple" theme="secondary">
          Baixar CSV
        </Button>
      </div>

      {isEmpty ? (
        <div className="pb-6 pt-8 border-t-gray-200 border-t">
          <div className="flex flex-col items-center gap-3">
            <Icon name="link" size="xl" className="text-gray-400" />
            <span className="uppercase text-xs font-normal text-gray-500">
              Ainda não existem links cadastrados
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <LinkItem />
          <LinkItem />
          <LinkItem />
          <LinkItem />
          <LinkItem />
          <LinkItem />
        </div>
      )}
    </div>
  );
}
