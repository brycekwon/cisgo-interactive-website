/* referenced from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav_dropdown */
var dropdown = document.getElementsByClassName("dropdown-button");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function(){
        this.classList.toggle("selected");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block"){
            dropdownContent.style.display = "none";
        } 
        else {
        dropdownContent.style.display = "block";
        }
    });
}