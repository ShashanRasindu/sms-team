$("#spnOrderDate").text(new Date().toLocaleDateString());

loadAllCustomersIds();
$("#cmbCustomerId").val("");
loadAllItemCodes();
$("#cmbItemCode").val("");

function loadAllCustomersIds() {
    for (var i = 0; i < customers.length; i++) {
        var id = customers[i].id;
        var html = '<option value="' + id + '">' + id + '</option>';
        $("#cmbCustomerId").append(html);
    }
    $("#cmbCustomerId").change(function () {
        var customerId = $(this).val();
        for (var i = 0; i < customers.length; i++) {
            if (customers[i].id == customerId) {
                $("#lblCustomerName").text(customers[i].name);
                break;
            }
        }
    });
}

function loadAllItemCodes() {
    for (var i = 0; i < items.length; i++) {
        var code = items[i].code;
        var html = '<option value="' + code + '">' + code + '</option>';
        $("#cmbItemCode").append(html);
    }
    $("#cmbItemCode").change(function () {
        var itemCode = $(this).val();
        for (var i = 0; i < items.length; i++) {
            if (items[i].code == itemCode) {
                $("#lblDescription").text(items[i].description);
                $("#lblUnitPrice").text(items[i].unitPrice);
                $("#lblQtyOnHand").text(items[i].qtyOnHand);
                $("#txtQty").select();
                break;
            }
        }
    });
}

$("#txtQty").keypress(function (eventData) {
    if (eventData.which == 13) {

        var code = $("#cmbItemCode").val();
        var unitPrice = parseFloat($("#lblUnitPrice").text());
        var qty = parseInt($(this).val());
        var description = $("#lblDescription").text();
        var qtyOnHand = parseInt($("#lblQtyOnHand").text());

        if (qty <= 0 && qty > qtyOnHand) {
            alert("Invalid qty. Please enter valid Qty");
            $(this).select();
            return;
        }

        var disabled = $("#cmbItemCode").attr("disabled");
        if (disabled) {

            $("#tblOrderDetails tbody tr td:first-child").each(function () {
                var itemCode = $(this).text();
                if (itemCode == code) {

                    var oldQty = parseInt($(this).parents("tr").find("td:nth-child(3)").text());
                    $(this).parents("tr").find("td:nth-child(3)").text(qty);
                    $(this).parents("tr").find("td:nth-child(5)").text(qty * unitPrice);

                    var item = items.find(function (item) {
                        return item.code == code;
                    });
                    item.qtyOnHand += oldQty;
                    item.qtyOnHand = item.qtyOnHand - qty;
                }
            });

        } else {
            var isExist = false;
            $("#tblOrderDetails tbody tr td:first-child").each(function () {
                var itemCode = $(this).text();
                if (itemCode == code) {
                    var oldQty = parseInt($(this).parents("tr").find("td:nth-child(3)").text());
                    $(this).parents("tr").find("td:nth-child(3)").text(oldQty + qty);
                    $(this).parents("tr").find("td:nth-child(5)").text(qty * unitPrice);
                    isExist = true;
                }
            });
            if (!isExist) {
                var html = '<tr>' +
                    '<td>' + code + '</td>' +
                    '<td>' + description + '</td>' +
                    '<td>' + qty + '</td>' +
                    '<td>' + unitPrice + '</td>' +
                    '<td>' + qty * unitPrice + '</td>' +
                    '<td><i class="fas fa-trash"></i></td>' +
                    '</tr>';
                $("#tblOrderDetails tbody").append(html);

                $("#tblOrderDetails tbody tr:last-child").click(function () {
                    var code = $(this).find("td:first-child").text();
                    var qty = $(this).find("td:nth-child(3)").text();
                    $("#txtQty").val(qty);
                    $("#cmbItemCode").val(code);
                    $("#cmbItemCode").trigger('change');
                    $("#cmbItemCode").attr('disabled', true);
                });

                $("#tblOrderDetails tbody tr:last-child td:last-child i").click(function () {

                    var item = items.find(function (item) {
                        return item.code == code;
                    });

                    var qty = parseInt($(this).parents("tr").find("td:nth-child(3)").text());
                    item.qtyOnHand += qty;

                    var row = $(this).parents("tr");
                    row.fadeOut(500, function () {
                        row.remove();
                        clearTextFields();
                        calculateTotal();
                    });

                });
            }
            var item = items.find(function (item) {
                return item.code == code;
            });
            item.qtyOnHand = item.qtyOnHand - qty;
        }

        clearTextFields();
        calculateTotal();

    }
});

function clearTextFields() {
    $("#cmbItemCode").val("");
    $("#lblDescription").text("");
    $("#lblUnitPrice").text("");
    $("#lblQtyOnHand").text("");
    $("#txtQty").val("");
    $("#cmbItemCode").focus();
    $("#cmbItemCode").attr('disabled', false);
}

function calculateTotal() {
    var total = 0;
    $("#tblOrderDetails tbody tr td:nth-child(5)").each(function () {
        total += parseFloat($(this).text());
    });
    $("#spnTotal").text(total);
}


