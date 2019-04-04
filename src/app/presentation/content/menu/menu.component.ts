import { Component } from '@angular/core';
import { ContentLoadedSignal, ContentUpdatedSignal, ToggleReviewModeSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';
import { map } from 'rxjs/operators';
import { parseContentOr } from 'app/core/content/content.utils';
import { toggleReview } from 'app/presentation/common/utils/content.utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
    providers : [
        EditorContentUpdatedSignal 
    ]
})
export class MenuComponent { 
    content:any = {};
    menu$:any;
    menuHeading$:any;

    constructor(public contentLoadedSignal:ContentLoadedSignal, public editorContentUpdatedSignal:EditorContentUpdatedSignal, public contentUpdatedSignal:ContentUpdatedSignal, public toggleReviewModeSignal:ToggleReviewModeSignal) {}


    ngOnInit() {
        this.menu$ = toggleReview(
            this.toggleReviewModeSignal,
            this.contentLoadedSignal,
            (data:any) => parseContentOr(this.content.menu, 'menu', data)
        );

        this.menuHeading$ = toggleReview(
            this.toggleReviewModeSignal,
            this.contentLoadedSignal,
            (data:any) => parseContentOr(this.content.menuHeading, 'menuHeading', data)
        );

        this.editorContentUpdatedSignal.add( (payload:any) => {
            this.contentUpdatedSignal.dispatch( <any>({ [payload.dataKey] : { content : payload.content } } ))
        });

        this.content.menuHeading = `<h1>
                                                    Daily Food <br>
                                                    Courses
                                            </h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                    consequat.</p>`;

        this.content.menu = `<div class="single-menu">
                                                    <h3>BREAKFAST COLD SELECTIONS</h3>
                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">Breakfast Bread Basket</p>
                                                                    <p>Assortment of Croissant, Mini-Danish, Chocolatine
                                                                    and Banana Bread</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Montreal Continental</p>
                                                                    <p>Fresh Bagel, Cream Cheese, Chocolatine, Croissant,
                                                                    Mini-Danish, Fruit Yogurt, Fresh Fruit Cocktail, Butter
                                                                    and Jam and Fresh Squeezed Orange Juice
                                                                    </p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">V.I.P. Classic</p>
                                                                    <p>Fresh Bagels with Smoked Salmon and Cream Cheese,
                                                                    Capers, Red Onion and Tomato, Croissant, Brie or
                                                                    Camembert Cheese, Mini-Danish, Yogurt, Fresh Fruit
                                                                    Cocktail, Butter and Jam, Banana Bread, Fresh
                                                                    Squeezed Orange Juice</p>
                                                            </li>
                                                    </ul>
                                            </div>
                                            <div class="single-menu">
                                                    <h3>BREAKFAST HOT SELECTIONS</h3>
                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">Omelet</p>
                                                                    <p> Four Egg Omelet with Choice of Filling,
                                                                    Hashbrowns, Yogurt, Fresh Fruit and Croissant, Butter and Jam and Fresh Squeezed Orange Juice With choice of one of the following fillings :
                                                                    </p>
                                                                    <br/>
                                                                    <div class="row text-left">
                                                                        <div class="col-md-6">
                                                                             <ul class="pl-30">
                                                                                 <li class="pb-10">a) Ham</li>
                                                                                 <li class="pb-10">b) Ham and Cheese</li>
                                                                                 <li class="pb-10">c) Bacon</li>
                                                                                 <li class="pb-10">d) Bacon and Cheese</li>
                                                                             </ul>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                             <ul class="pl-30">
                                                                                 <li class="pb-10">e) Spinach</li>
                                                                                 <li class="pb-10">f) Mushroom</li>
                                                                                 <li class="pb-10">g) Smoked Salmon</li>
                                                                                 <li class="pb-10">h) Western</li>
                                                                                 <li class="pb-10">i) Vegetarian</li>
                                                                             </ul>
                                                                        </div>
                                                                    </div>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Scrambled Eggs</p>
                                                                    <p>Scrambled Eggs (with Four Eggs) with Bacon,
                                                                    Sausages or Ham, Hashbrowns, Yogurt, Fruit Cocktail
                                                                    and Croissant, Butter and Jam, Mini-Danish and Fresh
                                                                    Squeezed Orange Juice
                                                                    </p>
                                                            </li>
                                                    </ul>
                                            </div>

                                            <div class="single-menu">
                                                    <h3>LUNCH SANDWICHES AND LUNCHBOXES</h3>
                                                    <p class="text-left pl-30">
                                                            <i>All of our sandwiches are made with the freshest of ingredients and rolls that are baked daily on the premises.</i>
                                                    </p>
                                                        <br/>
                                                        <div class="row text-left">
                                                            <div class="col-md-6">
                                                                 <ul class="pl-30">
                                                                     <li class="pb-10 text-uppercase">black forest ham</li>
                                                                     <li class="pb-10 text-uppercase">smoked turkey</li>
                                                                     <li class="pb-10 text-uppercase">egg salad</li>
                                                                     <li class="pb-10 text-uppercase">tuna salad</li>
                                                                     <li class="pb-10 text-uppercase">roast beef</li>
                                                                 </ul>
                                                            </div>
                                                            <div class="col-md-6">
                                                                 <ul class="pl-30">
                                                                     <li class="pb-10 text-uppercase">old-fashioned ham</li>
                                                                     <li class="pb-10 text-uppercase">smoked meat</li>
                                                                     <li class="pb-10 text-uppercase">chicken salad</li>
                                                                     <li class="pb-10 text-uppercase">grilled chicken</li>
                                                                     <li class="pb-10 text-uppercase">vegetarian</li>
                                                                 </ul>
                                                            </div>
                                                        </div>
                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">DINE-AIR SANDWICH PLATTER</p>
                                                                    <p>One and a Half Sandwiches Per Person on a
                                                                    Decorated Tray</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">FINGER SANDWICH PLATTER</p>
                                                                    <p>A Classic Array of Ingredients Made with that
                                                                    Special Touch of Elegance</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">CLASSIC LUNCHBOX</p>
                                                                    <p>One and a Half Sandwiches Per Person with Two
                                                                    Different Types of Salad and Dessert Garnished with
                                                                    Fruit and Cheese</p>
                                                            </li>
                                                    </ul>
                                            </div>

                                            <div class="single-menu">
                                                    <h3>LUNCH PLATTERS</h3>
                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">DINE-AIR CRUDITÉ PLATTER</p>
                                                                    <p>Seasonal Variety of Vegetables with Your Choice
                                                                    of Dip</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">DELI-MEAT PLATTER</p>
                                                                    <p>Montreal-Style Selection of Cold Cuts With a Side
                                                                    Platter of Olives and Pickles served with Mayonnaise
                                                                    and Mustard on the Side with Rye Bread and
                                                                    Fresh-Baked Rolls</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">OUR FAMOUS SEAFOOD PLATTER</p>
                                                                    <p>6 oz. Lobster Tail, Smoked Salmon, Lobster Salad,
                                                                    Marinated Scallops, Jumbo Shrimp with Cocktail
                                                                    Sauce on a Bed of Fresh Greens, Complimented
                                                                    with Lemon & Garnish</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">DESSERT AND COOKIE PLATTER</p>
                                                                    <p>Our Own Fresh-Baked and Home-Made Assortment
                                                                    of Dessert Squares & Cookies</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">DINE-AIR FRUIT PLATTER</p>
                                                                    <p>Hand-Picked Array of Fresh Seasonal Fruit</p>
                                                            </li>
                                                    </ul>
                                            </div>
                                            <div class="single-menu">
                                                    <h3>CANAPÉ ELEGANT ENTRÉES AND SAVOURY PLATTERS</h3>
                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">Jumbo Shrimp Cocktail</p>
                                                                    <p>Five Jumbo Shrimp (size 8-12), served with Tangy
                                                                    Cocktail Sauce and Garnishes. Available as single
                                                                    portion or platter</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Smoked Salmon Platter</p>
                                                                    <p>House-Smoked Atlantic Salmon with Bermuda
                                                                    Onion, Capers, Sliced Tomatoes, Cream Cheese
                                                                    and Fresh Bagels</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Antipasto Platter</p>
                                                                    <p>A Classic Assortment of Italian appetizers including
                                                                    Coldcuts, Olives and Peppers</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">European Canapé Platter</p>
                                                                    <p>An Assortment of Elegant Ingredients with that
                                                                    Dine-Air Touch of Class (Five Per Person)</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Classic Cheese and Cracker Tray</p>
                                                                    <p>Imported and Domestic Gourmet Cheeses served
                                                                    with a Variety of Crackers, Grapes and Dried Fruit</p>
                                                            </li>
                                                    </ul>
                                            </div>
                                            <div class="single-menu">
                                                    <h3>GARDREN SELECTION</h3>
                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">Small Caesar Salad Box</p>
                                                                    <p>With Roll and Butter</p>
                                                                    <p>Or with Grilled Chicked, Roll and Butter</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Large Caesar Salad Box</p>
                                                                    <p>With, Pasta Salad, Dessert, Roll and Butter</p>
                                                                    <p>Or with Grilled Chicken, Pasta Salad, Dessert, Roll and Butter</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Deluxe Grilled Chicken Caesar Salad</p>
                                                                    <p>Served with Shrimp Appetizer, Pasta Salad, Fresh
                                                                    Fruit, Cheesecake, Roll and Butter</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Small Fresh Garden Salad Box</p>
                                                                    <p>With Choice of
                                                                    Dressing, Roll and Butter</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Large Fresh Garden Salad Box</p>
                                                                    <p>With Grilled Chicken, Pasta Salad, Dessert, Roll and Butter</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Chef Salad</p>
                                                            </li>
                                                    </ul>
                                            </div>
                                            <div class="single-menu">
                                                    <h3>DINNER DINE-AIR COLD SELECTIONS</h3>
                                                    <p>All of our elegant dinner selections are served with shrimp appetizer, two
                                                    types of salad, dinner roll and butter, fruit and dessert.</p>

                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">Grilled Marinated Chicken Breast</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Grilled Salmon</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Oriental Salmon</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Filter Mignon</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Chefs' choice</p>
                                                            </li>
                                                    </ul>
                                            </div>
                                            <div class="single-menu">
                                                    <h3>DINNER DINE-AIR HOT SELECTIONS</h3>
                                                    <p>
                                                   Unless otherwise stated, all of our side boxes with hot dinner selections
                                                   contain shrimp appetizer, two types of salad, dinner roll and butter, fruit
                                                   and dessert.
                                                    </p>
                                                    <ul class="list">
                                                            <li>
                                                                    <p class="menu-item">Herb Crusted Chicken Breast</p>
                                                                    <p>With Roasted Peppers and Brie Fondue</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Grilled Atlantic Salmon</p>
                                                                    <p>With Chef's Seasonal Inspired Sauce, Served with Rice and
                                                                    Steamed or Grilled Vegetables</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Filet Mignon with Red Wine Reduction Sauce</p>
                                                                    <p>Served with Potatoes or Rice and Steamed or Grilled Vegetables</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Mediterranean Rack of Lamb</p>
                                                                    <p>With Calamata Olives</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Surf & Turf</p>
                                                                    <p>Filet Mignon and Lobster Tail (Shelled)</p>
                                                            </li>
                                                            <li>
                                                                    <p class="menu-item">Jumbo Sauteed Shrimp</p>
                                                                    <p>With a Warm Zesty Tomato Salsa</p>
                                                            </li>
                                                    </ul>
                                            </div>`;
    }
}
