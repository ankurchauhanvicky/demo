var jwt = localStorage.getItem("jwt");
if (jwt != null) {
    window.location.href = './index.html'
}
function login_form() {
    alert('login')
    // alert('test')
    $('#submitForm').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8000/api/login_user',
            method: "post",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,

            success: function (data) {
                // console.log(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role);
                // alert(localStorage)
                console.log(data.user.role)

                $(e).find("[type='submit']").html("Login");
                window.location = 'test.html';
                if (data.status) {

                } else {
                    $(".alert").remove();
                    $.each(data.errors, function (key, val) {
                        $("#errors-list").append("<div class='alert alert-danger'>" + val + "</div>");
                    });
                }

            }


        });

    });
}

function token() {
    var tokens = data.token
    console.log(tokens)
}


function get_staff_list() {

    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luX3VzZXIiLCJpYXQiOjE3MDkxMTM0NTcsImV4cCI6MTcwOTExNzA1NywibmJmIjoxNzA5MTEzNDU3LCJqdGkiOiJadzl4SVd0TjBJQno4OXF5Iiwic3ViIjoiNiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.IMpmbXDoUUSi3KW3Hmvfr5god35K59RcyCFyfl2I-M4'; // Replace 'YOUR_BEARER_TOKEN_HERE' with your actual token
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/user",
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')

        },
        dataType: 'json',
        success: function (result, status, xhr) {
            localStorage.UsersList = (JSON.stringify());
            var usersList = localStorage;
            // var usersList = $.parseJSON(usersList)
            console.log(usersList.role == 'User')
            console.log(result)
            if (usersList.role == 'User') {
                var jsonData = result;
                function generateTable(data) {
                    var table = document.getElementById('staff_table');
                    var tbody = table.querySelector('tbody');

                    // Clear existing table data
                    tbody.innerHTML = "";

                    // Generate table rows
                    var row = "<tr>";
                    for (var key in data.result) {
                        row += "<td>" + data.result[key] + "</td>";
                        
                    }
                    // alert(data.result.id)
                    row += '<td><button class = "btn btn-primary" '
                        + 'onclick = "edit_staff(' + data.result.id + ')"   data-bs-toggle="modal" data-bs-target="#myModal"> Edit </button>';
                    row += "</tr>";
                    tbody.innerHTML += row;
                }

                // Call the function with the provided JSON data
                generateTable(jsonData);

            } if (usersList.role == 'Admin') {

                arry_staff = result;
                var html = '';
                arry_staff.forEach(function (item, index) {
                    // console.log(item.id);
                    // alert(index)
                    html += '<tr>';
                    const keys = Object.keys(item);

                    keys.forEach(function (key) {

                        html += '<td> ' + item[key] + ' </td>';
                    })
                    // console.warn(item.id);
                    html += '<td><button class = "btn btn-primary" '
                        + 'onclick = "edit_staff(' + item.id + ')"   data-bs-toggle="modal" data-bs-target="#myModal"> Edit </button>';
                    html += '<button id="delete-record" class = "btn btn-danger" '
                        + 'onclick= "delete_staff(' + item.id + ')">Delete</button></td></tr>';
                })
                $('#staff_table > tbody').html(html);
                // ShowData(result);
            }

            console.log(status)
            console.log(xhr)

        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}



function edit_staff(id) {
    // alert(id);

    const url = 'http://127.0.0.1:8000/api/user/list/' + id;

    $.ajax({
        url: url,
        method: "get",
        data: { id: id },
        dataType: 'json',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function (response) {

            // alert(response);id
            $('#id').val(response.id);
            $('#name').val(response.name); //hold the response in id and show on popup
            $('#email').val(response.email);
            $('#role').val(response.role);
            // $('#show_modal').modal({ backdrop: 'static', keyboard: true, show: true });
        }
    });

}

function update_edit(id) {
    // alert('update');

    $('#forms').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8000/api/update/' + id,
            method: "post",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log(data)
                $('#message').css('display', 'block');
                $('#message').html(data.message);
                $('#message').addClass(data.class_name);

                $('#uploaded_image').html(data.uploaded_image);
                location.reload();

            }


        });

    });
}




function delete_staff(id) {
    // Delete Record
    $(document).on('click', '#delete-record', function () {



        $.ajax({
            async: true,
            type: "GET",
            url: 'http://127.0.0.1:8000/api/delete/' + id,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                location.reload();

            }

        });
    });
}


function create_user() {
    // alert('test')
    window.location.href = 'create.html';

}

function user_post() {
    // alert('test')
    $('#forms').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8000/api/create_user',
            method: "post",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data)
                $('#message').css('display', 'block');
                $('#message').html(data.message);
                $('#message').addClass(data.class_name);

                $('#uploaded_image').html(data.uploaded_image);
                location.href = 'test.html';

            }


        });

    });


}



function logout() {
    // Delete Record
    $(document).on('click', '#logout', function () {

        alert()

        $.ajax({
            async: true,
            type: "POST",
            url: 'http://127.0.0.1:8000/api/logout',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                window.location = 'login.html';

            }

        });
    });
}




//         xmlhttp.open("GET", "ajax.php?q=" + str, true);

// $.ajax({
//     url: "https://us-central1-pycatj.cloudfunctions.net/pycatjify",
//     contentType: "application/json",
//     data: body,
//     dataType: "json",
//     type: 'POST',
//     success: function (response) {
//         $('#myForm').val(response.data)
//     }



// fetch(url)
//   .then(response => response.json())
//   .then(repos => {

//     const reposList = repos;
//     var xxx =   $('#myModal').val(reposList)
//     // alert(reposList.name)
//     console.log(reposList.name)
//     const card = document.createElement('div');
//     card.classList.add('modal');

//     const title = document.createElement('input');
//     title.textContent = reposList.name;

//     const body = document.createElement('p');
//     body.textContent = reposList.email;

//     // card.appendChild(title);
//     // card.appendChild(body);
//     // container.appendChild(card);
//   })
// .catch(err => console.log(err))
// });
