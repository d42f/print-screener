export const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

export const base64ToBlob = (base64Blob: string): Promise<Blob> =>
  new Promise((resolve, reject) => {
    return fetch(base64Blob).then(response => {
      response.blob().then(resolve, reject);
    }, reject);
  });

export const dataURItoBlob = (dataUrl: string): Blob => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataUrl.split(',')[1]);

  // separate out the mime component
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  return blob;
};
