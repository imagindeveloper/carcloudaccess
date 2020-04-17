```typescript
import { Component, OnInit } from '@angular/core';
import { getImage, setBaseUrl } from "@imagindeveloper/carcloudaccess";

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    imageUrl: string;

    ngOnInit() {
        this.run();
    }

    async run() {
        setBaseUrl('https://client.imagin.studio');

        const imgParams = {
            make: 'Alfa Romeo',
            model: 'Giulia',
            ...
        };
        const imageData = <{ url: string; }>await getImage(imgParams);
        this.imageUrl = imageData.url;
    }
}

```
