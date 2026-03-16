import { IconButton } from "./icon-button";

export function LinkItem() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-b-gray-200 pb-4 last:border-b-0 last:pb-0">
      <div className="flex flex-col gap-1 min-w-0">
        <a href="" className="text-md text-blue-base truncate">
          brev.ly/Portfolio-Dev
        </a>

        <span className="text-gray-500 text-sm truncate">
          devsite.portfolio.com.br/devname-123456
        </span>
      </div>

      <div className="flex items-center gap-5 flex-none">
        <span className="text-sm font-normal text-gray-500">30 acessos</span>

        <div className="flex items-center gap-1">
          <IconButton icon="copy" />
          <IconButton icon="trash" />
        </div>
      </div>
    </div>
  );
}
