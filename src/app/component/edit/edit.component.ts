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
  imageName: string;
  imageUrl: string;
  description = 'Enter description (150 words max)';
  product = {_id: '', productCode: '', title: '', price: '',
    description: '', rating: '', stockamount: '', photo: '', imageUrl: ''};

  @Input() userProductSelection: any;
  createProductForm: FormGroup;

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
    this.createProductForm = this.fb.group({
      title: [null, Validators.required],
      price: [null],
      description: [null, [Validators.maxLength(150), Validators.required]],
      rating: [null],
      stockamount: [null],
      imageUrl: [null],
      photo: [null]
    });
  }

  updateProduct() {
    if (this.createProductForm.status === 'VALID') {
      console.log(this.createProductForm.value);
      this.productService.editProduct(this.product).subscribe(
        data => {
          this.product = data[0];
          console.log(this.product);
        },
        err => console.error(err),
        () => console.log('getProduct completed')
      );
    } else {
      console.log('Form is not valid');
    }
  }

  getImageName(data) {
    this.imageName = data.imageName;
    this.imageUrl = data.imageUrl;
    console.log(this.imageUrl);
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
