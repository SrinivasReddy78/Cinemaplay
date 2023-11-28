                        /* navbar js */

   // Login pop-up

   let loginButton = document.querySelector("#login-btn");
   let loginPopup = document.querySelector("#login-popup");

   loginButton.addEventListener("click", function () {
       signupPopup.classList.remove("active1");
       loginPopup.classList.add("active");
   });

   let closeBtn = document.querySelector(".popup-close");
   closeBtn.addEventListener("click", function () {
       loginPopup.classList.remove("active");
       document.querySelector('input[name="login-username"]').value = '';
       document.querySelector('input[name="login-password"]').value = '';
   });

   // Signup pop-up

   let signupButton = document.querySelector("#signup-btn");
   let signupPopup = document.querySelector("#signup-popup");

   signupButton.addEventListener("click", function () {
       loginPopup.classList.remove("active");
       signupPopup.classList.add("active1");
   });

   let closeBtn1 = document.querySelector(".popup-close1");
   closeBtn1.addEventListener("click", function () {
       signupPopup.classList.remove("active1");
       document.querySelector('input[name="signup-username"]').value = '';
       document.querySelector('input[name="signup-password"]').value = '';
       document.querySelector('input[name="signup-confirm"]').value = '';
   });


 /* carousel js */

 let slideIndex = 0;
 // automatic slider function
 const slides = document.getElementsByClassName("items")
 function show(){
     for(let i =0;i<slides.length;i++){
         slides[i].style.display = "none";
     }
     slideIndex++;
     if(slideIndex>slides.length){slideIndex=1;}
     if(slideIndex<1){slideIndex=slides.length;}
     slides[slideIndex-1].style.display = "flex";
     setTimeout(show,3000)
 }
 function changeSlide(offset) {
         slideIndex += offset;
         if (slideIndex > slides.length) { slideIndex = 1; }
         if (slideIndex < 1) { slideIndex = slides.length; }
         for (let i = 0; i < slides.length; i++) {
             slides[i].style.display = "none";
         }
         slides[slideIndex - 1].style.display = "flex";
     }
 show();

//  trending row 

  // Get references to the relevant elements
  const trendingRow = document.querySelector('.trending');
  const controlPrev = document.querySelector('.prev');
  const controlNext = document.querySelector('.next');

  // Variable to keep track of the current position
  let currentPosition = 0;
  const cardWidth = 300; // Adjust this value as needed
  const cardsToScroll = 5;

  // Function to handle navigation (previous or next)
  function action(e) {
      const maxPosition = trendingRow.scrollWidth - trendingRow.clientWidth;
      let newPosition = currentPosition + e * cardsToScroll * cardWidth;
      
      // Ensure newPosition stays within bounds
      newPosition = Math.max(newPosition, 0);
      newPosition = Math.min(newPosition, maxPosition);

      currentPosition = newPosition;

      trendingRow.scrollTo({
          left: currentPosition,
          behavior: 'smooth', // Add smooth scrolling effect
      });
    }

// genresButtons-based-filter

const buttons = document.querySelectorAll('.btns');
const generCards = document.querySelectorAll('.gener-card');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const genre = button.textContent.toLowerCase();
        generCards.forEach(card => {
            const cardGenre = card.querySelector('.title').getAttribute('data-genre').toLowerCase();
            if (genre === 'all' || cardGenre === genre) {
                card.style.display = 'block'; // Show the card container
            } else {
                card.style.display = 'none'; // Hide the card container
            }
        });
    });
});

// movies-row

 // Get references to the relevant elements
 const moviesRow = document.querySelector('.movies-row');

 // Variable to keep track of the current position
 let startPosition = 0;
 const cardWidth1 =300; // Adjust this value as needed
 const cardsToScroll1 = 5;

 // Function to handle navigation (previous or next)
 function scrollCards2(e) {
     const maxPosition = moviesRow.scrollWidth - moviesRow.clientWidth;
     let newPosition = startPosition + e * cardsToScroll1 * cardWidth1;
     
     // Ensure newPosition stays within bounds
     newPosition = Math.max(newPosition, 0);
     newPosition = Math.min(newPosition, maxPosition);

     startPosition = newPosition;

     moviesRow.scrollTo({
         left: startPosition,
         behavior: 'smooth', // Add smooth scrolling effect
     });
 }

// tvshows & Anime rows

   // Get references to the relevant elements
   const tvShowRow = document.getElementById('tvShowRow');
   const animeRow = document.getElementById('animeRow');

  // Variable to keep track of the current position
  let currentPosition2 = 0;
  const cardWidth2 =300; // Adjust this value as needed
  const cardsToScroll2 = 5;

  // Function to handle navigation (previous or next)

  function scrollCards(e) {
      const maxPosition = tvShowRow.scrollWidth - tvShowRow.clientWidth;
      let newPosition = currentPosition2 + e * cardsToScroll2 * cardWidth2;
      
      // Ensure newPosition stays within bounds
      newPosition = Math.max(newPosition, 0);
      newPosition = Math.min(newPosition, maxPosition);

      currentPosition2 = newPosition;

      tvShowRow.scrollTo({
          left: currentPosition2,
          behavior: 'smooth', // Add smooth scrolling effect
      });
  }

  function scrollCards1(e) {
      const maxPosition = animeRow.scrollWidth - animeRow.clientWidth;
      let newPosition = currentPosition2 + e * cardsToScroll2 * cardWidth2;
      
      // Ensure newPosition stays within bounds
      newPosition = Math.max(newPosition, 0);
      newPosition = Math.min(newPosition, maxPosition);

      currentPosition2 = newPosition;

      animeRow.scrollTo({
          left: currentPosition2,
          behavior: 'smooth', // Add smooth scrolling effect
      });
  }