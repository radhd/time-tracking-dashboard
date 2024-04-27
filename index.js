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
};

// FETCHING THE DATA FROM THE DATA.JSON 
// Fetching needs an input of endpoint 


async function fetchData(endpoint) {
    try {

        const response = await fetch(`http://localhost:3000/${endpoint}`);
        const data = await response.json();

        const title = data.title;

        const dailyCurrent = data.timeframes.daily.current;
        const dailyPrevious = data.timeframes.daily.previous;

        const weeklyCurrent = data.timeframes.weekly.current;
        const weeklyPrevious = data.timeframes.weekly.previous;

        const monthlyCurrent = data.timeframes.monthly.current;
        const monthlyPrevious = data.timeframes.monthly.previous;

        return [title, dailyCurrent, dailyPrevious, weeklyCurrent, weeklyPrevious, monthlyCurrent, monthlyPrevious];

    } catch(error) {
        console.error("Error fetching data: ", error);
        return null;
    }
};

//create new h2

const cardTitleImages = document.querySelectorAll(".card-title-image");

cardTitleImages.forEach(async (cardTitleImage, index) => {
    const title = await fetchData(index);

    const newH2 = document.createElement("h2");
    newH2.textContent = title[0];

    cardTitleImage.appendChild(newH2);
});


// This function receives daily, weekly or monthly data, currentTimeFrame from the fetched data and previous time frame from fetched data and shows this data as a cards.

function createTimeframes(dailyWeeklyMonthly, currentTimeframe,previousTimeframe) {
    const selector = document.querySelectorAll(`.${dailyWeeklyMonthly}`);

    selector.forEach(async (element, index) => {
        const responses = await fetchData(index);
        console.log(responses);
        const current = responses[currentTimeframe];
        const previous = responses[previousTimeframe];

        const newSpan = document.createElement("span");
        const newP = document.createElement("p");
        newSpan.textContent = `${current}hrs`;

        if(dailyWeeklyMonthly === "daily") {
            newP.textContent = `Last Day - ${previous}hrs`;
        } else if (dailyWeeklyMonthly === "weekly") {
            newP.textContent = `Last Week - ${previous}hrs`;
        } else {
            newP.textContent = `Last Month - ${previous}hrs`;
        }

        newSpan.classList.add("current-hrs");
        
        element.appendChild(newSpan);
        element.appendChild(newP);

    });
};

createTimeframes('daily', 1, 2);
createTimeframes('weekly', 3, 4);
createTimeframes('monthly', 4, 5);