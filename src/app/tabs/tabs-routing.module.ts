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
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab3/tab3.module").then((m) => m.Tab3PageModule),
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
