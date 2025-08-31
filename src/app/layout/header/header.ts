import { Component } from '@angular/core';
import { Menu } from "./components/menu/menu";

@Component({
  selector: 'app-header',
  imports: [Menu],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
