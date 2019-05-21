

function loadAllCourseIdsName() {
    for (var i = 0; i < course.length; i++) {
        var id = course[i].id;
        // console.log(id);
        var html = '<option value="' + id + '">' + id + '</option>';
        // console.log(html);
        $("#selectCourse").append(html);
    }
    $("#selectCourse").change(function () {
        var courseID = $(this).val();
        for (var i = 0; i < course.length; i++) {
            if (course[i].id == courseID) {
                $("#txtCourseName").val(course[i].name);
                $("#BatchId").focus();
                break;
            }
        }
    });
}
loadAllCourseIdsName();

deleteRow();
function deleteRow() {
    $("#tblCourse tbody i").off('click');
    $("#tblCourse tbody i").click(function () {
        if (confirm("Are you sure to delete this course?")) {
            var row = $(this).parents("tr");
            row.fadeOut(500, function () {
                row.remove();
            });
        }
    });
}

function loadAllCustomers() {
    $("#tblCourse tbody tr").remove();
    for (var i = 0; i < batch.length; i++) {
        var idB = batch[i].id;
        var nameB = batch[i].name;

        var html = "<tr>" +
            "<td>" + idB + "</td>" +
            "<td>" + nameB + "</td>" +
            "<td>" + batch[i].address + "</td>" +
            "<td><i class=\"fas fa-trash\"></i></td>" +
            "</tr>";
        $("#tblCustomers tbody").append(html);
        attachDeleteCustomerEventListener();

        $("#tblCustomers tbody tr").click(function () {
            var id = $(this).find("td:first-child").text();
            var name = $(this).find("td:nth-child(2)").text();
            var address = $(this).find("td:nth-child(3)").text();

            $("#txtCustomerId").val(id);
            $("#txtCustomerName").val(name);
            $("#txtCustomerAddress").val(address);

            $("#txtCustomerId").attr("disabled", true);
            $("#btnSave").text("Update");
        });

    }
}