import ky from "ky";

export const getImageData = (imageSrc: string) => {
  return ky
    .post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_MLVISION_API_KEY}`,
      {
        timeout: false,
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: imageSrc.substr("data:image/jpeg;base64,".length)
              },
              features: [
                {
                  type: "TEXT_DETECTION"
                },
                {
                  type: "LOGO_DETECTION"
                }
              ]
            }
          ]
        })
      }
    )
    .then(results => {
      return results
        .json()
        .then(value => value.responses[0])
        .catch(err => {
          console.log(err);
          return null;
        });
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};
