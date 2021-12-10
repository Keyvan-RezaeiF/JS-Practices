function convertAgeToDays() {
    var birthYear = prompt("What year were you born, buddy?");
    const now = new Date();
    var ageInDays = (now.getFullYear() - birthYear) * 365
    var textAnswer = document.createTextNode("You're " + ageInDays + " days old.");
    var h1 = document.createElement("h1");
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);
}

function resetResult() {
    document.getElementById("ageInDays").remove();
}