import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {ConfigServiceService} from '../../config-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createProductForm: FormGroup;
  imageName: String;
  imageUrl: String;
  photo: String;
  description = '';
  response = false;

  constructor(private fb: FormBuilder, private productService: ConfigServiceService) { }

  ngOnInit() {
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

  createNewProduct() {
    if (this.createProductForm.status === 'VALID') {
      console.log(this.createProductForm.value);
      this.productService.createProduct(this.createProductForm.value).subscribe(
        res => {
          console.log(res);
        }
      );
      window.location.href = '/list';
    } else {
      console.log('Form is not valid');
    }
  }

  getImageName(data) {
    this.imageName = data.imageName;
    this.imageUrl = data.imageUrl;
    console.log(this.imageName);
  }

}
