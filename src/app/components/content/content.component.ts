import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RewardResponse } from '../../models/reward';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit{

  allProducts: RewardResponse = { data: [] };
  placeHolderImage:string = 'assets/images/elementor-placeholder-image.webp';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.dataService.getProductsData().subscribe((response:RewardResponse)=>{
      this.allProducts = response;
      console.log(
        "allProducts" , this.allProducts
      );

    });
  }
}
