const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const ACCESS_TOKEN = process.env.CLARIFAI_PAT;

const handleApiCall = (req, res, input) => {
  if (!input) {
    return res.status(400).json({ error: "No image URL provided" });
  }
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = ACCESS_TOKEN; // Clarifai API key
  // Specify the correct user_id/app_id pairings
  const USER_ID = "ahrinyuan";
  const APP_ID = "My-First-Application";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  const IMAGE_URL = input;
  // To use a local file, assign the location variable
  // const IMAGE_FILE_LOCATION = 'YOUR_IMAGE_FILE_LOCATION_HERE'

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const stub = ClarifaiStub.grpc();

  // This will be used by every Clarifai endpoint call
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key " + PAT);

  // To use a local text file, uncomment the following lines
  // const fs = require("fs");
  // const imageBytes = fs.readFileSync(IMAGE_FILE_LOCATION);

  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      model_id: MODEL_ID,
      version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
              // base64: imageBytes,
              allow_duplicate_url: true,
            },
          },
        },
      ],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Failed to process the image" });
      }

      if (response.status.code !== 10000) {
        console.error("Clarifai API Error:", response.status.description);
        return res.status(400).json({ error: response.status.description });
      }

      
     // Collect all regions into an array
      const regions = response.outputs[0].data.regions;

      // check regions
      if (!regions || regions.length === 0) {
        return res.status(200).json({ message: "No faces detected" });
      }

      const boxes = regions.map((region) => {
        const boundingBox = region.region_info.bounding_box;
        return {
          name: region.data.concepts[0].name,
          value: region.data.concepts[0].value.toFixed(4),
          boundingBox: boundingBox,
          topRow: boundingBox.top_row.toFixed(3),
          leftCol: boundingBox.left_col.toFixed(3),
          bottomRow: boundingBox.bottom_row.toFixed(3),
          rightCol: boundingBox.right_col.toFixed(3),
        };
      });

      //Send the collected data back once
      res.status(200).json(boxes[0]);
    }
  );
};

module.exports = {
    handleApiCall: handleApiCall
}