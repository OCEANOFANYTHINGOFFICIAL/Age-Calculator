function getDOB() {
    let data = document.getElementById("inputDob").value;
    let dob = new Date(data);
    let day = dob.getDate();
    let month = dob.getMonth();
    let year = dob.getFullYear();
    let now = new Date(document.getElementById("cdate").value);
    console.log(now.getTime()-dob.getTime())
    // Checking if the date of birth is valid
    if (isNaN(dob.getTime()) || (now.getTime() - dob.getTime()) < 0) {
        window.alert("Invalid Date");
        resetFields(); // Reset fields if the date is invalid
        return; // Exit the function if the date is invalid
    }
    let yearDiff = now.getFullYear() - year;
    let monthDiff = now.getMonth() - month;
    let dateDiff = now.getDate() - day;
    if (monthDiff < 0 || (monthDiff === 0 && dateDiff < 0)) {
        yearDiff--;
        if (now.getMonth() < month || (now.getMonth() === month && now.getDate() < day)) {
            monthDiff = 11 + now.getMonth() - month;
        } else {
            monthDiff = now.getMonth() - month;
        }
        if (now.getDate() < day) {
            let tempDate = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            dateDiff = tempDate - day + now.getDate();
        } else {
            dateDiff = now.getDate() - day;
        }
        // Adjust month difference for February during leap years
        if (month === 1 && now.getFullYear() % 4 === 0) {
            if (now.getDate() < day || (now.getDate() === day && now.getMonth() !== 1)) {
                // If the current date is before the input DOB or not in February
                dateDiff++; // Leap day adjustment
                if (dateDiff >= 29) {
                    monthDiff++;
                    dateDiff -= 29;
                }
            }
        }
    }
    if (dateDiff < 0) {
        monthDiff--;
        let tempDate = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        dateDiff = tempDate + dateDiff; // Adjusting negative date difference
    }
    document.getElementById("year").innerHTML = yearDiff + " years";
    document.getElementById("month").innerHTML = monthDiff + " months";
    document.getElementById("days").innerHTML = dateDiff + " days";
}
// Function to provide default date value 
function currentDate() {
    let d = document.getElementById("cdate");
    d.value = formatted();
}
function formatted(date = new Date()) {
    return [
        date.getFullYear(),
        short(date.getMonth() + 1),
        short(date.getDate()),
    ].join("-");
}
function short(num) {
    return num.toString().padStart(2, "0");
}
function resetFields() {
    document.getElementById("inputDob").value = "2000-01-01";

    // Set the "Current Date" input field to the current date
    let currentDate = new Date();
    document.getElementById("cdate").value = currentDate.toISOString().split('T')[0];

    // document.getElementById("currentAge").innerHTML = "";
    document.getElementById("year").innerText = "Year";
    document.getElementById("month").innerText = "Month";
    document.getElementById("days").innerText = "Days";
}
// Re-enable the "Calculate" button
let calculateButton = document.querySelector(".myBtn button:first-child");
calculateButton.removeAttribute("disabled");
// Calling current date function to set default date value
currentDate();
