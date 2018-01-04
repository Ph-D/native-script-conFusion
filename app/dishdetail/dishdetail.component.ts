import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';
import { Toasty } from 'nativescript-toasty';
import { action } from "ui/dialogs";

@Component({
  selector: 'app-dishdetail',
    moduleId: module.id,
  templateUrl: './dishdetail.component.html'
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  comment: Comment;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(private dishservice: DishService,
    private favoriteService: FavoriteService,
    private fontIcon: TNSFontIconService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => {
          this.dish = dish
          this.favorite = this.favoriteService.isFavorite(this.dish.id);
          this.numcomments = this.dish.comments.length;

          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating);
          this.avgstars = (total / this.numcomments).toFixed(2);
        },
        errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  addToFavorites() {
    if (!this.favorite) {
      console.log('Adding to Favorites', this.dish.id);
      this.favorite = this.favoriteService.addFavorite(this.dish.id);
      const toast = new Toasty("Added Dish " + this.dish.id, "short", "bottom");
      toast.show();
    }
  }

  goBack(): void {
    this.routerExtensions.back();
  }


  displayActionDialog(){
    let options = {
      title: "Actions",
      cancelButtonText: "Cancel",
      actions: ["Add to Favorites", "Add Comment"]
  };
  
  action(options).then((result) => {
    
    if(result == "Add to Favorites"){
        this.addToFavorites();
  }else if(result == "Add Comment"){
        console.log('add a comment');
  }


  });


  }

}