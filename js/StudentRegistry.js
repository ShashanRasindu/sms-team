$(document).ready(function () {
    loadAllstudentIds();
    loadAllcourseIds();
    loadAllBatchID();
    $("#cmbStudentID").val("");
    $("#cmbCouresID").val("");
    $("#cmbBatchID").val("");

});


$("#btnsavestudent").click(function () {
    var newSID = $("#lblnewStudentID").val();
    var newSname = $("#lblnewStudentName").val();
    var newcontact = $("#lblnewStudentContact").val();

    var flag = true;

    if(newcontact.trim().length==0){
        $("#lblnewStudentContact").select();
        flag = false;
    }

    if(newSname.trim().length==0){
        $("#lblnewStudentName").select();
        flag = false;
    }

    if(newSID.trim().length==0){
       $("#lblnewStudentID").select();
       flag = false;
   }

   if(!flag) return;

   $("#lblnewStudentID,#lblnewStudentName,#lblnewStudentContact").val("");
   $("#lblnewStudentID").focus();
});

function loadAllstudentIds() {
    for (var i = 0; i < register.length; i++) {
        var id = register[i].id;
        var html = '<option value="' + id + '">' + id + '</option>';
        $("#cmbStudentID").append(html);
    }
    $("#cmbStudentID").change(function () {
        var SId = $(this).val();
        for (var i = 0; i < register.length; i++) {
            if (register[i].id == SId) {
                $("#lblStudentName").text(register[i].name);
                break;
            }
        }
    });
}

function loadAllcourseIds() {
    for (var i = 0; i < course.length; i++) {
        var id = course[i].id;
        var html = '<option value="' + id + '">' + id + '</option>';
        $("#cmbCouresID").append(html);
    }
    $("#cmbCouresID").change(function () {
        var courseId = $(this).val();
        for (var i = 0; i < course.length; i++) {
            if (course[i].id == courseId) {
                $("#lblCourseName").text(course[i].name);
                break;
            }
        }
    });
}
function loadAllBatchID() {
    for(var i=0;i<batch.length;i++){
        var id = batch[i].id;
        var html = '<option value="'+ id +'">'+ id + '</option>';
        $("#cmbBatchID").append(html);
    }
    $("#cmbBatchID").change(function () {
        var batchID = $(this).val();
        for(var i=0;i<batch.length;i++){
            if(batch[i].id==batchID){
                $("#lblBatchName").text(batch[i].name);
                break
            }
        }
    });
}

$("#Registerbutton").click(function (eventData) {
    var courseID = $("#cmbCouresID").val();
        var courseName = $("#lblCourseName").text();
        var batchID = $("#cmbBatchID").val();
        var batchName = $("#lblBatchName").text();

        // if($("#cmbStudentID").val("")){
        //     $("#cmbStudentID").focus();
        //     return;
        // }


        var html = '<tr>'+
            '<td>'+courseID+'</td>'+
            '<td>'+courseName+'</td>'+
            '<td>'+batchID+'</td>'+
            '<td>'+batchName+'</td>'+
            '<td><i class="fas fa-trash"></i></td>'+
            '</tr>';

        $("#tblStudentsRegister").append(html);

    $("#cmbStudentID,#cmbBatchID,#cmbCouresID,#lblStudentName,#lblBatchName,#lblCourseName").val("");
    $("#cmbStudentID").focus();

    $("#tblStudentsRegister tbody tr td:last-child").click(function () {
        if(confirm("Are you sure delete this record")) {
            var row = $(this).parent("tr");
            $(this).fadeOut(250, function () {
                row.remove();
            });

        }
    });



});

$("#btnSave").click(function () {
    var studentID = $("#lblnewStudentID").val();
    var studentName = $("#lblnewStudentName").val();
    var studentcontact = $("#lblnewStudentContact").val();

   register.push(
       {
           id:studentID,
           name:studentName,
           contactnumber:studentcontact
       }
   )
});
