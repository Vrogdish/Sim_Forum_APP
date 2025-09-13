import { Component } from '@angular/core';
import { Menu } from "./components/menu/menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Menu, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
