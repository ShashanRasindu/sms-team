$(document).ready(function () {
    $("#txtCustomerId").focus();
    loadAllCustomers();
});

function loadAllCustomers() {
    $("#tblCustomers tbody tr").remove();
    for (var i = 0; i < customers.length; i++) {
        var html = "<tr>" +
            "<td>" + customers[i].id + "</td>" +
            "<td>" + customers[i].name + "</td>" +
            "<td>" + customers[i].address + "</td>" +
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

    var flag = true;

    if (customerAddress.trim().length == 0) {
        $("#txtCustomerAddress").select();
        flag = false;
    }

    if (customerName.trim().length == 0) {
        $("#txtCustomerName").select();
        flag = false;
    }

    if (customerId.trim().length == 0) {
        $("#txtCustomerId").select();
        flag = false;
    }

    if ($("#btnSave").text() !== "Update") {
        $("#tblCustomers tbody tr td:first-child").each(function () {
            var id = $(this).text();
            if (id === customerId) {
                alert("Customer Id is already exists in the table");
                $("#txtCustomerId").select();
                flag = false;

            }
        });
    }

    if (!flag) return;

    if ($("#btnSave").text() === "Update") {
        var customer = customers.find(function (customer) {
            return customer.id == customerId;
        });

        customer.name = customerName;
        customer.address = customerAddress;
        $("#btnSave").text("Save");
        $("#txtCustomerId").attr("disabled",false);

        // for (var i = 0; i < customers.length ; i++) {
        //     if (customers[i].id == customerId){
        //
        //     }
        // }


    } else {
        customers.push({
            id: customerId,
            name: customerName,
            address: customerAddress
        });
    }

    loadAllCustomers();

    $("#txtCustomerId, #txtCustomerName, #txtCustomerAddress").val("");
    $("#txtCustomerId").focus();

});
