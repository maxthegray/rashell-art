Rachel's art site. 

To add or remove pictures, edit artworks.json:

```json
{ "title": "Coral Reef", "size": "24\" x 25\"", "file": "images/gallery/CoralReef.jpg" }
```

Drop the image in `images/gallery/` (and a small copy in `images/gallery/thumbs/` if you want the grid to load fast).

To look at it locally: `python3 -m http.server`, then http://localhost:8000
