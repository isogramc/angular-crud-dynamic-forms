import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {ConfigServiceService} from '../../config-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  identity: string;
  updatedName: string;
  updatedUrl: string;
  description = 'Enter description (150 words max)';
  product = {id: '', productCode: '', title: '', price: '',
    description: '', rating: '', stockamount: '', photo: '', imageUrl: ''};

  @Input() userProductSelection: any;
  editProductForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ConfigServiceService) { }

  ngOnInit() {
    this.identity = window.location.hash;
    console.log(this.identity.substr(1, this.identity.length));
    this.productService.findById(this.identity.substr(1, this.identity.length)).subscribe(
      data => {
        this.product = data[0];
        console.log(this.product);
      },
      err => console.error(err),
      () => console.log('getProduct completed')
    );
    this.editProductForm = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      price: [null],
      description: [null, [Validators.maxLength(150), Validators.required]],
      rating: [null],
      stockamount: [null],
      photoUrl: [null],
      photo: [null]
    });
  }

  updateProduct() {
    if (this.editProductForm.status === 'VALID') {
      this.productService.editProduct(this.editProductForm.value).subscribe(
        data => {
          this.product = data[0];
          console.log(this.product);
        },
        err => console.error(err),
        () => console.log('getProduct completed')
      );
      window.location.href = 'list';
    } else {
      console.log('Form is not valid');
    }
  }

  getImageName(data) {
    this.updatedName = data.imageName;
    this.updatedUrl = data.imageUrl;
    console.log(this.updatedUrl);
  }

  deleteProduct() {
    if ( this.identity.substr(1, this.identity.length) === this.product.productCode ) {
      this.productService.deleteProduct(this.product._id).subscribe(
        data => {
        }, err => console.error(err), () => console.log('delete completed'));
        window.location.href = 'list';
      }
  }

}
