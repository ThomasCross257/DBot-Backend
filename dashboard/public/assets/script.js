function dropDown(){
    document.getElementById("dropdown-content").classList.toggle("showDropdown");
}
window.onclick = function(event){
    if (!event.target.matches('dropbtn')){
        var dropdowns = document.getElementByID("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++){
            var dropdownOpen = dropdowns[i];
            if(dropdownOpen.classList.contains("showDropdown")){
                dropdownOpen.classList.remove("showDropdown");
            }
        }
    }
}