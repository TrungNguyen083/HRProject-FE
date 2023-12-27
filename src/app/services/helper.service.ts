import { Injectable } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { NotificationService } from '../shared/message/notification.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private notificationService: NotificationService) {}
  base64ToBytes(base64String: string): Uint8Array {
    const base64WithoutPrefix = base64String.replace(
      /^data:image\/\w+;base64,/,
      '',
    );

    const decodedData = atob(base64WithoutPrefix);

    const outputArray = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      outputArray[i] = decodedData.charCodeAt(i);
    }

    return outputArray;
  }

  handleUploadFile(f: File, uploadRef: FileUpload) {
    const reader = new FileReader();
    let fileContent = '';

    uploadRef.clear();
    uploadRef.choose();

    reader.onload = () => {
      fileContent = reader.result as string;

      this.notificationService.successNotification(
        $localize`Uploaded new photo`,
      );
    };

    reader.readAsDataURL(f);

    return { fileContent };
  }
}
