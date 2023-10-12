import { Chat } from "@/components/Chat";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";

export default async function PageMain() {
  return (
    <>
      <Page className="flex-1" containerProps={{ className: "flex-1" }}>
        <div className="flex flex-1 items-stretch justify-start gap-4">
          <Sidebar />
          <Chat className="flex-1" />
        </div>
      </Page>
    </>
  );
}
