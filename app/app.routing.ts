import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { ReservationComponent } from './reservation/reservation.component';
import { AboutComponent } from "./about/about.component";
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
    { path: "", redirectTo: "/about", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "favorites", component: FavoritesComponent },
    { path: "reservation", component: ReservationComponent },
    { path: "contact", component: ContactComponent },
    { path: "menu", component: MenuComponent },
    { path: "dishdetail/:id", component: DishdetailComponent}
   
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }