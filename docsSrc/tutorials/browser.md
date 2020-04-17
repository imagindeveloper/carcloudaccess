```html
<head>
    ...
    <script src="https://cdn.jsdelivr.net/gh/imagindeveloper/carcloudaccess@v2.0.0-alpha/dist/bundle.min.js"></script>
</head>
<body>
    ...
    <script>
        const demo = async () => {
            carcloudaccess.setBaseUrl('https://client.imagin.studio');
            const { url } = await carcloudaccess.getImage({
                make: 'Alfa Romeo',
                model: 'Giulia',
                ...
            });
            console.log({ url });
        };
        demo();
    </script>
</body>
```
