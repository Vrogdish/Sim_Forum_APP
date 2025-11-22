import { Component } from '@angular/core';
import { Banner } from "../../../../shared/components/banner/banner";
import { ForumNav } from "../../components/forum-nav/forum-nav";
import { RouterOutlet } from '@angular/router';
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb";

@Component({
  selector: 'app-forum-page',
  imports: [Banner, ForumNav, RouterOutlet, Breadcrumb],
  templateUrl: './forum-page.html',
  styleUrl: './forum-page.scss'
})
export class ForumPage {

}
