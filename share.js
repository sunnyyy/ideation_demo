// $("#mtabs h4").click(function() {
//     //  First remove class "active" from currently active tab
//     $("#mtabs h4").removeClass('active');

//     //  Now add class "active" to the selected/clicked tab
//    $(this).addClass("active");

//     //  Hide all tab content
//     $(".mtab_content").hide();

//     //  Here we get the href value of the selected tab
//     var selected_tab = $(this).find("a").attr("href");

//     //  Show the selected tab content
//     $(selected_tab).fadeIn();

//     //  At the end, we add return false so that the click on the link is not executed
//     return false;
// });
function toggle_visibility(thing1, thing2) {
    var a = document.getElementById(thing1);
    var b = document.getElementById(thing2);
    if (a.style.display == 'block') {
        a.style.display = 'none';
        b.style.display = 'block';
    } else{
        a.style.display = 'block';
        b.style.display = 'none'
    }
}