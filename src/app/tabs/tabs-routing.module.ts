import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "list",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../list/list.module").then((m) => m.ListPageModule),
          },
        ],
      },
      {
        path: "add-item",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../add-item/add-item.module").then(
                (m) => m.AddItemPageModule
              ),
          },
        ],
      },
      {
        path: "chats",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../chats/chats.module").then((m) => m.ChatsPageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/list",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/list",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
