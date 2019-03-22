Dummy data consists of 5 latest collections data from Unsplash API valid on 20-03-2019.

  ./results.json - list of 5 latest collections

Each collection consists of up to 20 photos information

  ./:collection_ID/photos.json - 20 (or [total_photos] if less) 
    photos information that are part of this collection

Additionally there are available photo details for 10 photos (2 of each collection)

  ./photos/:photo_ID/result.json - details about given photo