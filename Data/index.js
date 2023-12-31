
// PRELOADER 
document.addEventListener("DOMContentLoaded", function() {
  const preloader = document.getElementById("preloader");
  const pageContent = document.getElementById("pageContent")

  if (preloader) {
      preloader.classList.add('hide');
      pageContent.classList.remove('hide');
  }
});

// RESIZE TABLE AS SCREEN SHRINKS
// ------------------------------------------------------

const table = document.querySelector('table');
const tableImages = document.querySelectorAll('td');
const tbody = document.querySelector('tbody');
  const resizeScreen = () => {
  if (window.innerWidth <= 700 && !table.classList.contains('rotateTable')) {
    table.classList.add('rotateTable');
  } else {
    if (window.innerWidth >= 700 && table.classList.contains('rotateTable')) {
      table.classList.remove('rotateTable');
    }
  }
}


// SCROLL CONNECTED TO CONTACT
// ------------------------------------------------------
let contact = document.getElementById("contact");
contact.onclick = function (e) {
  e.preventDefault();
  let element_to_scroll_to = document.querySelector("footer");
  element_to_scroll_to.scrollIntoView();
}
// ------------------------------------------------------


// ONLOAD FUNCTIONS
// ------------------------------------------------------

window.onload = function() {
  resizeScreen();
  const navbar = document.querySelector('nav.navbar');
  const video = document.getElementById('video');
  const blackTitle = document.querySelector('h1.black');
  const creativeTitle = document.querySelector('.homescreenTitleCreative');
  const webTitle = document.querySelector('.homescreenTitleWeb');
  const developerTitle = document.querySelector('.homescreenTitleDeveloper');
  setTimeout(() => {
    document.querySelector('.containerTitle').classList.remove('invisible');
  }, 500);
  navbar.classList.add('hide');
  video.classList.add('scaleIn');
  blackTitle.classList.add('scaleOut');
  creativeTitle.classList.add('hide');
  webTitle.classList.add('hide');
  developerTitle.classList.add('hide');

  setTimeout(() => {
    creativeTitle.classList.add('slideLeft');
    creativeTitle.classList.remove('hide');
    webTitle.classList.add('slideRight');
    webTitle.classList.remove('hide');

    setTimeout(() => {
      developerTitle.classList.add('slideInFromUpTwo');
      developerTitle.classList.remove('hide');
    }, 800);
  }, 100);
};

// ------------------------------------------------------


// EFFECTIVELY CALL RESIZE FUNCTION
window.onresize = resizeScreen;
// ------------------------------------------------------




// NAVBAR SPECIFIC HIDE OR SHOW
// ------------------------------------------------------

window.addEventListener("scroll", function (e) {
  e.preventDefault();
  document.querySelector('nav.navbar').classList.remove('disAppearNav');
  if (document.querySelector('nav.navbar').classList.contains('hide') && window.scrollY > 30) {
  document.querySelector('nav.navbar').classList.remove('hide');
  }
  if (!document.querySelector('nav.navbar').classList.contains('hide') && window.scrollY < 30) {
    document.querySelector('nav.navbar').classList.add('disAppearNav');
    setTimeout(() => {
      document.querySelector('nav.navbar').classList.add('hide');
    }, 1900); 
  }
  })
// ------------------------------------------------------




//video settings:
// ------------------------------------------------------
document.getElementById("video").playbackRate = 0.8;
document.getElementById("video").controls = false;




// SCROLLING ANIMATION WITH TEXT BUBBLES
// ------------------------------------------------------

const firstP = document.getElementById("move");

window.addEventListener('scroll', () => {
  const toScrollContainer = document.querySelector('.container-who');
  const childElements = toScrollContainer.querySelectorAll('p');

  childElements.forEach((child, index) => {
    const childTop = child.getBoundingClientRect().top;
    const childBottom = child.getBoundingClientRect().bottom;
    const childLeft = child.getBoundingClientRect().left;
    const childRight = child.getBoundingClientRect().right;

    if (childTop < window.innerHeight && childBottom > 0 && childLeft < window.innerWidth && childRight > 0) {
      const scrollAmount = Math.max(0, Math.min(1, 1 - childTop / window.innerHeight));
      let moveValueX = 0;
      let moveValueY = 0;
      let moveValueRot = 0;

      if (index === 0) {
        moveValueX = -scrollAmount * 200;
        moveValueY = -scrollAmount * 100;
        moveValueRot = -scrollAmount * 25;
      } else if (index === 1) {
        moveValueX = scrollAmount * 100;
        moveValueY = -scrollAmount * 100;
        moveValueRot = scrollAmount * 25;
      } else if (index === 2) {
        moveValueX = -scrollAmount * 200;
        moveValueY = scrollAmount * 100;
        moveValueRot = -scrollAmount * 25;
      } else if (index === 3) {
        moveValueX = scrollAmount * 200;
        moveValueY = scrollAmount * 200;
        moveValueRot = scrollAmount * 25;
      }else if (index === 4) {
        moveValueX = scrollAmount * 0;
        moveValueY = scrollAmount * 800;
        moveValueRot = -scrollAmount * 40;
      }

      child.style.transform = `translate(${moveValueX}%, ${moveValueY}%) rotate(${moveValueRot}deg)`;
    }
  });
});
// ------------------------------------------------------






// GALLERY TABLE WITH ZOOM EFFECT
// ------------------------------------------------------

const displayGalleryTable = () => {
  const boardPlace = document.querySelector('tbody');
  let table = '';

  const allowedRanges = [
    { min: 11, max: 15 },
    { min: 21, max: 25 },
    { min: 31, max: 35 }
  ];

  const allNumbers = [];

  // Generate and shuffle all possible numbers within the specified ranges
  allowedRanges.forEach(range => {
    for (let num = range.min; num <= range.max; num++) {
      allNumbers.push(num);
    }
  });

  shuffleArray(allNumbers);

  let numberIndex = 0;

  for (let i = 1; i <= 3; i++) {
    table += '<tr>';
    for (let j = 1; j <= 5; j++) {
      if (numberIndex >= allNumbers.length) {
        // If all numbers have been used, shuffle and reset
        shuffleArray(allNumbers);
        numberIndex = 0;
      }

      const randomNum = allNumbers[numberIndex++];
      
      table += (window.innerWidth <= 700)
      ? `<td class="galleryImage rotateTableMin" id="${i}${j}"><img src="Style/img/dynamicGalleryImage${randomNum}.png"></td>`
      : `<td class="galleryImage" id="${i}${j}"><img src="Style/img/dynamicGalleryImage${randomNum}.png"></td>`
    }
    table += '</tr>';
  }

  boardPlace.innerHTML = table;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

displayGalleryTable();


const tableElement = document.querySelector('tbody');
let intervalId; // Variable to store the interval ID



function startGalleryEffect() {
  // Call the function every second and store the interval ID
  intervalId = setInterval(displayGalleryTable, 650);
}

function stopGalleryEffect() {
  // Clear the interval to pause the effect
  clearInterval(intervalId);
}

// Add event listeners for mouseover and mouseout
tableElement.addEventListener('mouseover', stopGalleryEffect);
tableElement.addEventListener('mouseout', startGalleryEffect);

// Call the function initially to start the effect
startGalleryEffect();


const tbodyElement = document.querySelector('tbody');
const maxZoom = 2.0; 
let zoomed = false;

tbodyElement.addEventListener('mousemove', zoomIn);
tbodyElement.addEventListener('mouseout', resetZoom);

function zoomIn(e) {
  const rect = tbodyElement.getBoundingClientRect();
  const centerX = (e.clientX - rect.left) / rect.width;
  const centerY = (e.clientY - rect.top) / rect.height;

  if (!zoomed) {
    zoomed = true;
    tbodyElement.style.transition = 'transform 0.5s ease';
  }

  tbodyElement.style.transformOrigin = `${centerX * 100}% ${centerY * 100}%`;
  tbodyElement.style.transform = `scale(${maxZoom})`;
}

function resetZoom() {
  zoomed = false;
  tbodyElement.style.transition = 'transform 0.5s ease';
  tbodyElement.style.transform = 'scale(1)';
}

// ------------------------------------------------------











// FOLDING PAPER ANIMATION
// ------------------------------------------------------

const resumeOne = document.getElementById('resume-one');
const resumeTwo = document.getElementById('resume-two');
const resumeThree = document.getElementById('resume-three');
const downloadResume = document.getElementById('wrap');
downloadResume.classList.add('invisible');
const resumeThreeContainer = document.querySelector('.resume-three-container');
let allowRotation = false;

const options = {
    threshold: 0.5, 
};

const resumeOneObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        // 
    }
}, options);

const resumeTwoObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        allowRotation = true; 
    }
}, options);

const resumeThreeObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        allowRotation = true; 
        console.log('i"m here tho');
        downloadResume.classList.remove('invisible');
        downloadResume.classList.add('slideInFromUpTwo');
    }
}, options);



resumeOneObserver.observe(resumeOne);
resumeTwoObserver.observe(resumeTwo);
resumeThreeObserver.observe(resumeThree);

resumeThreeContainer.style.transform = 'rotateX(90deg)';

const handleScroll = () => {
    const windowHeight = window.innerHeight;

    const offsetTop = resumeTwo.getBoundingClientRect().top;
    const rotation = (offsetTop / windowHeight) * 90;
    const rotationTwo = (offsetTop / windowHeight) * 60;
    if(offsetTop <= 550) {
    if (rotation >= 59) {
        resumeTwo.style.transition = 'none';
    } else {
        resumeTwo.style.transition = 'transform 0.3s';
    }

    resumeTwo.style.transform = `rotateX(-${rotation}deg)`;

    if (allowRotation) {
        if (rotation <= 0) {
            resumeThreeContainer.style.transition = 'none';
            resumeThreeContainer.style.transform = 'rotateX(0deg)';
        } else if (rotation >= 0) {
            resumeThreeContainer.style.transition = 'transform 0.3s';
            resumeThreeContainer.style.transform = `rotateX(-${rotationTwo}deg)`;
            resumeThreeContainer.style.marginTop = `-${(rotation*3)}px`;
        }
    }
}};

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
window.addEventListener('load', handleScroll);
// ------------------------------------------------------




// COPY TO CLIPBOARD FOOTER
// ------------------------------------------------------
function copyToClipboard(elementId) {
  var text = document.getElementById(elementId).textContent;

  // Create a temporary textarea element to hold the text to copy
  var textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // Make it invisible
  document.body.appendChild(textarea);

  // Select and copy the text
  textarea.select();
  document.execCommand("copy");

  // Clean up and remove the temporary textarea
  document.body.removeChild(textarea);

  // Optionally, provide some visual feedback to the user
}
const shitNeedsBeCopied = document.querySelector('p#copy');
shitNeedsBeCopied.addEventListener("mouseover", function(e) {
  document.querySelector('.footerContainerCenterChild p').innerHTML = "click to copy";
  document.querySelector('.footerContainerCenterChild p').classList.add('slideInFromUpThree');
});
document.getElementById('copy').addEventListener("mouseout", function(e) {
  document.querySelector('.footerContainerCenterChild p').innerHTML = "LET's GET TO KNOW EACHOTHER";
  document.querySelector('.footerContainerCenterChild p').classList.remove('slideInFromUpThree');

});
// ------------------------------------------------------



// DOWNLOAD FILE CODE
document.getElementById('downloadButton').addEventListener('click', function(e) {
  e.preventDefault();
  var pdfUrl = './CV_VVT.pdf';
  var hiddenElement = document.createElement('a');
  hiddenElement.href = pdfUrl;
  hiddenElement.target = '_blank';
  hiddenElement.download = 'resumeViktorVT.pdf';
  hiddenElement.style.display = 'none';
  document.body.appendChild(hiddenElement);
  hiddenElement.click();
  document.body.removeChild(hiddenElement);
});



// mouseover cameraroll animation
// --------------------------------------

let containerSeriesBoxes = document.querySelectorAll(".containerSeriesBox");

containerSeriesBoxes.forEach((containerSeriesBox) => {
  let cameraRollPhoto = containerSeriesBox.querySelectorAll(".focus");
  let getMainPhoto = containerSeriesBox.querySelector(".boxRight");

  cameraRollPhoto.forEach((photo) => {
    photo.addEventListener("mouseover", function () {
      let getPhotoCss = window.getComputedStyle(photo);
      let getFullImgUrl = getPhotoCss.getPropertyValue("background-image");
      console.log(getFullImgUrl);
      getMainPhoto.style.backgroundImage = getFullImgUrl;
    });
  });
});
