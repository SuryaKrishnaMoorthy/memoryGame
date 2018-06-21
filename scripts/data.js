let imagesArray = ["100.jpg", "101.jpg", "200.jpg", "201.jpg", "202.jpg", "204.jpg", "206.jpg", "207.jpg", "300.jpg", "301.jpg", "302.jpg", "303.jpg", "304.jpg", "305.jpg", "307.jpg", "400.jpg", "401.jpg", "402.jpg", "403.jpg", "404.jpg", "405.jpg", "406.jpg", "408.jpg", "409.jpg", "410.jpg", "411.jpg", "412.jpg", "413.jpg", "414.jpg", "415.jpg", "416.jpg", "417.jpg", "418.jpg", "420.jpg", "421.jpg", "423.jpg", "424.jpg", "425.jpg", "426.jpg", "427.jpg", "431.jpg", "444.jpg", "450.jpg", "451.jpg", "500.jpg", "502.jpg", "503.jpg", "504.jpg", "506.jpg", "507.jpg", "508.jpg", "509.jpg", "511.jpg"];

/* Function to generate random 8 indexes for fetching images from the main images array */
function getRandomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Select random 8 images */
let imageSet = new Set();
let images = new Array();
do {
    imageSet.add(getRandomIndex(0, (imagesArray.length - 1)));
}
while (imageSet.size < 8);
imageSet.forEach(value => {
    images.push(imagesArray[value]);
});

// Create an array with images duplicated
const duplicatedImages = [...images, ...images];

// Shuffle the images
function shuffleArray(duplicatedImages) {
    for (let i = duplicatedImages.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = duplicatedImages[randomIndex];
        duplicatedImages[randomIndex] = duplicatedImages[i];
        duplicatedImages[i] = itemAtIndex;
    }
    return duplicatedImages;
}

images = shuffleArray(duplicatedImages);

module.exports = images;
