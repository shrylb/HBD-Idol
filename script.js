document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.card-panel');
    let currentPanel = 0;
    let currentMusic = null;
  
    // Add floating hearts around the edge
    createFloatingHearts();
    
    // Preload images to avoid blurriness
    preloadImages(['bday.png', 'bday1.png', 'bday2.png', 'bday3.png']);
  
    function preloadImages(imageArray) {
      imageArray.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
      });
    }
  
    function navigateToPanel(index) {
      // Hide all panels with fade effect
      panels.forEach(panel => {
        panel.classList.remove('show');
      });
      
      // Show the selected panel
      setTimeout(() => {
        panels[index].classList.add('show');
        // Update current panel index
        currentPanel = index;
      }, 100);
    }
  
    function nextPanel() {
      const nextIndex = (currentPanel + 1) % panels.length;
      navigateToPanel(nextIndex);
    }
  
    // Add click event to the card container
    document.querySelector('.card-container').addEventListener('click', function(e) {
      // Check if the click is on the surprise button
      if (e.target.id !== 'surprise-btn') {
        nextPanel();
      }
    });
  
    // Surprise button functionality
    document.getElementById('surprise-btn')?.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent panel change when clicking the button
      createConfetti();
      playBirthdaySong();
    });
  
    function stopCurrentMusic() {
      if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
      }
    }

  function playBirthdaySong() {
    stopCurrentMusic();
    
    // Create a simple birthday tune with Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Notes of "Happy Birthday" tune
    const notes = [
      { note: 'C4', duration: 0.3 },
      { note: 'C4', duration: 0.3 },
      { note: 'D4', duration: 0.6 },
      { note: 'C4', duration: 0.6 },
      { note: 'F4', duration: 0.6 },
      { note: 'E4', duration: 1.2 },
      { note: 'C4', duration: 0.3 },
      { note: 'C4', duration: 0.3 },
      { note: 'D4', duration: 0.6 },
      { note: 'C4', duration: 0.6 },
      { note: 'G4', duration: 0.6 },
      { note: 'F4', duration: 1.2 },
      { note: 'C4', duration: 0.3 },
      { note: 'C4', duration: 0.3 },
      { note: 'C5', duration: 0.6 },
      { note: 'A4', duration: 0.6 },
      { note: 'F4', duration: 0.6 },
      { note: 'E4', duration: 0.6 },
      { note: 'D4', duration: 0.6 },
      { note: 'Bb4', duration: 0.3 },
      { note: 'Bb4', duration: 0.3 },
      { note: 'A4', duration: 0.6 },
      { note: 'F4', duration: 0.6 },
      { note: 'G4', duration: 0.6 },
      { note: 'F4', duration: 1.2 }
    ];

    // A simple frequency map
    const frequencyMap = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00,
      'Bb4': 466.16, 'C5': 523.25
    };

    // Play the sequence
    let time = audioContext.currentTime;
    
    notes.forEach(noteObj => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequencyMap[noteObj.note];
      
      gainNode.gain.setValueAtTime(0.2, time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + noteObj.duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(time);
      oscillator.stop(time + noteObj.duration);
      
      time += noteObj.duration;
    });
  }

  function createConfetti() {
    const confettiColors = [
      '#ff4da6', '#ffb3d9', '#ff80c1', '#ff99cc', '#ffe6f2',
      '#ff3399', '#ff66b3', '#ffcce6', '#ff1a8c', '#ff4da6'
    ];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-20px';
      confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      confetti.style.opacity = Math.random() * 0.5 + 0.5;
      
      // Random size
      const size = Math.random() * 10 + 5;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      
      // Random shape
      const shapes = ['circle', 'square', 'triangle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = size/2 + 'px solid transparent';
        confetti.style.borderRight = size/2 + 'px solid transparent';
        confetti.style.borderBottom = size + 'px solid ' + confettiColors[Math.floor(Math.random() * confettiColors.length)];
      }
      
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s ease-out forwards`;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  }

  function createFloatingHearts() {
    const positions = [
      { top: '5%', left: '5%' },
      { top: '10%', left: '90%' },
      { top: '85%', left: '8%' },
      { top: '92%', left: '85%' },
      { top: '20%', left: '3%' },
      { top: '30%', left: '95%' },
      { top: '50%', left: '2%' },
      { top: '70%', left: '97%' },
      { top: '80%', left: '5%' },
      { top: '15%', left: '92%' }
    ];

    positions.forEach((pos, index) => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerHTML = '❤️';
      heart.style.top = pos.top;
      heart.style.left = pos.left;
      heart.style.animationDelay = (index * 0.3) + 's';
      document.body.appendChild(heart);
    });
  }
});