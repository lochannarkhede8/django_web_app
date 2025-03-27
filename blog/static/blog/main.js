document.addEventListener('DOMContentLoaded', function() {
   // Animate cards on page load with staggered delay
   const cards = document.querySelectorAll('.card');
   cards.forEach((card, index) => {
     card.style.setProperty('--card-index', index);
     setTimeout(() => {
       card.classList.add('show');
     }, 100 * index);
   });
   
   // Zoom image on click for mobile devices
   const imgPreviews = document.querySelectorAll('.img-preview');
   imgPreviews.forEach(img => {
     img.addEventListener('click', function(e) {
       if (window.innerWidth < 768) {
         e.preventDefault();
         window.open(this.src, '_blank');
       }
     });
   });
   
   // Add smooth scrolling to pagination links
   const paginationLinks = document.querySelectorAll('.pagination .page-link');
   paginationLinks.forEach(link => {
     link.addEventListener('click', function(e) {
       const href = this.getAttribute('href');
       if (href.includes('page=')) {
         sessionStorage.setItem('scrollPosition', window.scrollY);
       }
     });
   });
   
   // Restore scroll position after page navigation
   if (sessionStorage.getItem('scrollPosition')) {
     window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
     sessionStorage.removeItem('scrollPosition');
   }
 });