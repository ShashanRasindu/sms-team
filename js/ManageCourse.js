$(document).ready(function () {
    $("#txtCourseID").focus();
    loadAllCourses();

});
function loadAllCourses() {

for (var i = 0; i< courses.length; i++){
    var html =  "<td>" +
    "<td>" + courses[i].id + "</td>" +
    "<td>" + courses[i].name + "</td>" +
    "<td>" + courses[i].description + "</td>" +
    "<td>" + courses[i].duration+ "</td>" +
        "<td><i class=\"fas fa-trash\"></i></td>"

    $("#tblCourse tbody").append(html);
    attachDeleteCustomerEventListener();

    $("#tblCourse tbody tr").click(function () {
        var id = $(this).find("td:first-child").text();
        var name = $(this).find("td:nth-child(2)").text();
        var description = $(this).find("td:nth-child(3)").text();
        var duration = $(this).find("td:nth-child(4)").text();

        $("#txtCourseID").val(id);
        $("#txtCourseName").val(name);
        $("#txtDescription").val(description);
        $("#txtDuration").val(duration);

        $("#txtCustomerId").attr("disabled", true);
        $("#btnSave").text("Update");
    });

}
}

function attachDeleteCustomerEventListener() {
    $("#tblCustomers tbody i").off('click');
    $("#tblCustomers tbody i").click(function () {
        if (confirm("Are you sure to delete this customer?")) {
            var row = $(this).parents("tr");
            row.fadeOut(500, function () {
                row.remove();
            });
        }
    });
}

$("#btnSave").click(function () {

    var customerId = $("#txtCustomerId").val();
    var customerName = $("#txtCustomerName").val();
    var customerAddress = $("#txtCustomerAddress").val();





}
    
}