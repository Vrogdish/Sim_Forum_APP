import { Component } from '@angular/core';
import { Spinner } from "../../../../shared/components/spinner/spinner";
import { Btn } from "../../../../shared/components/btn/btn";
import { Banner } from "../../../../shared/components/banner/banner";

@Component({
  selector: 'app-home-page',
  imports: [Spinner, Btn, Banner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
