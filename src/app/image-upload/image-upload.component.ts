import {Component, EventEmitter, Output} from '@angular/core';
import {ImageService} from '../image.service';

class ImageSnippet {
  pending: Boolean = false;
  status: String = 'init';
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  @Output() ImageChangedEvent = new EventEmitter();

  selectedFile: ImageSnippet;
  filename: String;
  img: String;
  base64ImageData: any;
  base64Selected = false;

  constructor(private imageService: ImageService) {}

    private onSuccess() {
      this.selectedFile.pending = false;
      this.selectedFile.status = 'ok';
    }

    private onError() {
      this.selectedFile.pending = false;
      this.selectedFile.status = 'fail';
      this.selectedFile.src = '';
    }

    processFile(imageInput: any) {

      const file: File = imageInput.files[0];

      const reader = new FileReader();
      const date = new Date(file.lastModifiedDate);
      const timestamp = date.getTime();

        this.getFile(file).then((customJsonFile) => {
          // customJsonFile is your newly constructed file.
          this.base64ImageData = customJsonFile;
          console.log(this.base64ImageData);
        });

      reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.selectedFile.pending = true;

        const formData = new FormData();
        formData.append('photo', file);

          this.imageService.uploadImage(formData).subscribe(
          (res) => {
            this.onSuccess();
            console.log('Mongo saved image', res.imageUrl);
            if ( this.base64Selected ) {
              this.img = this.base64ImageData.base64StringFile;
            } else {
              this.img = '';
            }
            this.ImageChangedEvent.emit({ imageName: res.imageUrl,
              imageUrl: this.img });
          },
          (err) => {
            this.onError();
          });
      });
      reader.readAsDataURL(file);
  }

   getFile(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => { reader.abort(); reject(new Error('Error parsing file')); };
      reader.onload = function () {

        // This will result in an array that will be recognized by C#.NET WebApi as a byte[]
        const bytes = Array.from(new Uint8Array(this.result));

        // if you want the base64encoded file you would use the below line:
        const base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(''));

        // Resolve the promise with your custom file structure
        resolve({
          bytes: bytes,
          base64StringFile: base64StringFile,
          fileName: file.name,
          fileType: file.type
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }

}
