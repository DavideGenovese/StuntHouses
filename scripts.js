let currentIndex = 2; // Inizia con l'evento al centro
const events = document.querySelectorAll('.event-item');
const slider = document.querySelector('.event-slider');

function showEvent(index) {
    events.forEach((event, i) => {
        event.classList.remove('active');
    });
    events[index].classList.add('active');
    const offset = (index - 2) * -20; // Calcola lo spostamento per avere l'evento al centro
    slider.style.transform = `translateX(${offset}%)`;
}

function nextEvent() {
    currentIndex = (currentIndex + 1) % events.length;
    showEvent(currentIndex);
}

setInterval(nextEvent, 3000); // Cambia l'evento in rilievo ogni 3 secondi

// Mostra il primo evento in rilievo inizialmente
showEvent(currentIndex);



let newCurrentIndex = 0;
function scrollNewEvents(direction) {
    const newEventWrapper = document.getElementById('newEventWrapper');
    const newItems = document.querySelectorAll('.new-event-item');
    const newTotalItems = newItems.length;
    const newItemsPerView = 3;

    newCurrentIndex += direction;

    if (newCurrentIndex < 0) {
        newCurrentIndex = 0;
    } else if (newCurrentIndex > newTotalItems - newItemsPerView) {
        newCurrentIndex = newTotalItems - newItemsPerView;
    }

    newEventWrapper.style.transform = `translateX(-${newCurrentIndex * (100 / newItemsPerView)}%)`;
}
const button=document.createElement("button");
    document.body.appendChild(button)
    button.innerHTML='<i class="fas fa-chevron-up"></i>'
    button.style.position="fixed"
    button.style.bottom="20px"
    button.style.right="20px"
    button.addEventListener("click",()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    })
    button.addEventListener("scroll",()=>{
        if(window.scrollY>500){
            button.style.display="block"
        } else{
            button.style.display="none"
        }
    })
    AOS.init();


    document.addEventListener('DOMContentLoaded', () => {
        updateProgressBars();
    
        window.addEventListener('storage', updateProgressBars);
    
        function updateProgressBars() {
            const event1Investment = parseInt(localStorage.getItem('event1Investment') || '0');
            const event2Investment = parseInt(localStorage.getItem('event2Investment') || '0');
    
            const totalInvestment1 = 10000; // example total needed for event 1
            const totalInvestment2 = 20000; // example total needed for event 2
    
            const percentage1 = Math.min((event1Investment / totalInvestment1) * 100, 100);
            const percentage2 = Math.min((event2Investment / totalInvestment2) * 100, 100);
    
            document.getElementById('progress-bar-1').style.setProperty('--progress', `${percentage1}%`);
            document.getElementById('progress-bar-1').style.width = `${percentage1}%`;
            document.getElementById('progress-text-1').textContent = `${percentage1.toFixed(2)}%`;
    
            document.getElementById('progress-bar-2').style.setProperty('--progress', `${percentage2}%`);
            document.getElementById('progress-bar-2').style.width = `${percentage2}%`;
            document.getElementById('progress-text-2').textContent = `${percentage2.toFixed(2)}%`;
        }
    
        setInterval(updateProgressBars, 2000); // Update progress bars every 5 seconds
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('investment-form');
        const eventSelect = document.getElementById('event-select');
        const investmentAmount = document.getElementById('investment-amount');
        const currentProgress = document.getElementById('current-progress');
    
        eventSelect.addEventListener('change', updateCurrentProgress);
        form.addEventListener('submit', handleFormSubmit);
    
        function updateCurrentProgress() {
            const selectedEvent = eventSelect.value;
            const investment = parseInt(localStorage.getItem(`${selectedEvent}Investment`) || '0');
            const totalNeeded = selectedEvent === 'event1' ? 10000 : 20000;
            const percentage = Math.min((investment / totalNeeded) * 100, 100);
            currentProgress.textContent = `${percentage.toFixed(2)}%`;
        }
    
        function handleFormSubmit(event) {
            event.preventDefault();
            const selectedEvent = eventSelect.value;
            const amount = parseInt(investmentAmount.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid investment amount.');
                return;
            }
            let currentInvestment = parseInt(localStorage.getItem(`${selectedEvent}Investment`) || '0');
            currentInvestment += amount;
            localStorage.setItem(`${selectedEvent}Investment`, currentInvestment);
    
            updateCurrentProgress();
    
            // Trigger a storage event to update the other page
            localStorage.setItem('lastUpdated', new Date().toISOString());
        }
    
        // Initialize the current progress display
        updateCurrentProgress();
    });

    
