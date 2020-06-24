import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from '../../config-service.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: any;
  initProds: any;
  inputPrice: any;
  addNewProductMode = true;
  imageWidth = '78px';
  imageMargin = '2px';
  mstr: String;
  endpoint = 'http://localhost:8090/api/image/';

  constructor(private productService: ConfigServiceService) {}

  primitiveToBoolean(value: string | number | boolean | null | undefined): boolean {
    if (value === 'true') {
      return true;
    }

    return typeof value === 'string'
      ? !!+value   // we parse string to integer first
      : !!value;
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.listProducts().subscribe(
      data => {
        this.products = data;
      },
      err => console.error(err),
      () => console.log('getProducts completed')
    );
  }

  getAllByPrice(inputPrice) {
    this.productService.findByPrice(inputPrice).subscribe(
      data => {
        this.products = data;
      },
      err => console.error(err),
      () => console.log('getProducts completed')
    );
  }

  findByPrice(event) {
    this.inputPrice = event.target.value;
    if (this.inputPrice !== ' ') {
      this.getAllByPrice(this.inputPrice);
    }
  }

  createNewProduct() {
    window.location.href = '/create';
  }

  editProduct(id, key) {
    window.location.href = '/edit/' + id + '#' + key;
  }
}
