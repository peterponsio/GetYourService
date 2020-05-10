import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./start-page/start-page.module").then(
        (m) => m.StartPagePageModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "list",
    loadChildren: () =>
      import("./list/list.module").then((m) => m.ListPageModule),
  },
  {
    path: "service-info",
    loadChildren: () =>
      import("./service-info/service-info.module").then(
        (m) => m.ServiceInfoPageModule
      ),
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountPageModule),
  },

  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule),
  },
  {
    path: "my-favorites",
    loadChildren: () =>
      import("./my-favorites/my-favorites.module").then(
        (m) => m.MyFavoritesPageModule
      ),
  },
  {
    path: "terms-and-conditions",
    loadChildren: () =>
      import("./terms-and-conditions/terms-and-conditions.module").then(
        (m) => m.TermsAndConditionsPageModule
      ),
  },
  {
    path: "add-item",
    loadChildren: () =>
      import("./add-item/add-item.module").then((m) => m.AddItemPageModule),
  },
  {
    path: "filter",
    loadChildren: () =>
      import("./filter/filter.module").then((m) => m.FilterPageModule),
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'add-img',
    loadChildren: () => import('./add-img/add-img.module').then( m => m.AddImgPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'item-info',
    loadChildren: () => import('./item-info/item-info.module').then( m => m.ItemInfoPageModule)
  },
  {
    path: 'my-announcements',
    loadChildren: () => import('./my-announcements/my-announcements.module').then( m => m.MyAnnouncementsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'edit-announcement',
    loadChildren: () => import('./edit-announcement/edit-announcement.module').then( m => m.EditAnnouncementPageModule)
  },
  {
    path: 'mensagges',
    loadChildren: () => import('./mensagges/mensagges.module').then( m => m.MensaggesPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
