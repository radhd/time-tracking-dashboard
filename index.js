// Make Button Active

const buttonsTag = document.getElementsByTagName('button');
const containers = document.getElementsByClassName('hours-text')
const daily = document.getElementsByClassName('daily');

const buttons = Array.from(buttonsTag);


activeButton();

// Make button active 
function activeButton() {
    buttons.forEach(button => {
    
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                
                if(btn !== button) {
                    btn.classList.remove('active');
                }

            });
            button.classList.add('active');
            // showInfo(button.textContent);
            showInfo(button.textContent);
        });
    });
};

// Provide information following the button clicked

function showInfo(buttonContentString) {

    const dailyElements = document.querySelectorAll('.daily');
    const weeklyElements = document.querySelectorAll('.weekly');
    const monthlyElements = document.querySelectorAll('.monthly');


    if (buttonContentString === "Daily") {
        showClickedElement(dailyElements, "flex");
        showClickedElement(weeklyElements, "none");
        showClickedElement(monthlyElements, "none");
    } 

    if (buttonContentString === "Weekly") {
        showClickedElement(weeklyElements, "flex");
        showClickedElement(dailyElements, "none");
        showClickedElement(monthlyElements, "none");
    }

    if (buttonContentString === "Monthly") {
        showClickedElement(monthlyElements, "flex");
        showClickedElement(dailyElements, "none");
        showClickedElement(weeklyElements, "none");
    }

    function showClickedElement(elements, displayedInfo) {
        elements.forEach(element => {
            element.style.display = displayedInfo;
        });
    };
}