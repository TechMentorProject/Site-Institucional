
  function aplicarScrollReveal() {
    if (window.innerWidth > 800) {
      var slideLeft = {
        distance: '500%',
        origin: 'left',
        opacity: null,
        delay: 300,
        reset: true
      };

      var slideLeft2 = {
        distance: '500%',
        origin: 'left',
        opacity: null,
        delay: 500,
        reset: true
      };

      var slideLeft3 = {
        distance: '1000%',
        origin: 'left',
        opacity: null,
        delay: 800,
        reset: true
      };

      var slideRight = {
        distance: '150%',
        origin: 'right',
        opacity: null,
        delay: 600,
        reset: true
      };

      var slideRight1 = {
        distance: '500%',
        origin: 'right',
        opacity: null,
        delay: 300,
        reset: true,
      };

      var slideRight2 = {
        distance: '500%',
        origin: 'right',
        opacity: null,
        delay: 500,
        reset: true
      };

      var slideRight3 = {
        distance: '500%',
        origin: 'right',
        opacity: null,
        delay: 800,
        reset: true
      };

      var slideUp = {
        distance: '150%',
        origin: 'bottom',
        opacity: null,
        delay: 300,
        reset: true
      };

      ScrollReveal().reveal('.secao2', slideRight);
      ScrollReveal().reveal('.bloco1', slideLeft);
      ScrollReveal().reveal('.bloco2', slideLeft2);
      ScrollReveal().reveal('.bloco3', slideLeft3);
      ScrollReveal().reveal('.secao4', slideRight);
      ScrollReveal().reveal('.elementos-secao5', slideLeft);
      ScrollReveal().reveal('.caixa1', slideLeft);
      ScrollReveal().reveal('.caixa2', slideLeft2);
      ScrollReveal().reveal('.caixa3', slideLeft3);
    }
  }


  aplicarScrollReveal();

  window.addEventListener('resize', function() {
    aplicarScrollReveal();
  });

