## ILovePDF-Freedom

Use ilovepdf.com API without API Key

## TODO:

- Add `Task.process()`, and `Task.download()` methods
- Add signatures method on `ILovePDF` class (see https://developer.ilovepdf.com/docs/api-reference#create-signature)

## Basic Usage:
For `Task.process()`, see https://developer.ilovepdf.com/docs/api-reference#process
```ts
import {ILovePDF} from 'ilovepdf-freedom';
const instance = new ILovePDF();

(async() => {
    const task = await instance.newTask('officepdf');
    await task.addFileLocal('./file.docx');

    const response = await task.process({});
    console.log(response);
})();
```