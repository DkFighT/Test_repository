let more_fields = document.getElementById("more_fields");

window.addEventListener('click', ()=>{
    if(document.getElementById('mentorenok').checked){
        more_fields.classList.remove('hide');
    }
    else{
        more_fields.classList.add('hide');
    }
})

// Создание бд
var db = openDatabase('course', '1.0', 'test db', 2 * 1024 * 1024);

// Создание таблицы
function createTable(db) { 
    db.transaction(function (t) { 
        t.executeSql("CREATE TABLE uchastn(fio TEXT, groupa TEXT, vk TEXT, phone TEXT, role TEXT, vid TEXT, exp TEXT, post TEXT)", []); 
    });
}
createTable(db);

// Заполнение строки
function insertData(db, fio, groupa, vk, phone, role, vid, exp, post) {
    db.transaction(function (e) { 
        e.executeSql("INSERT INTO uchastn(fio, groupa, vk, phone, role, vid, exp, post) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [fio, groupa, vk, phone, role, vid, exp, post]); 
    }); 
}

function check(){
    let fio = document.iform.fio.value;
    let groupa = document.iform.group.value;
    let vk = document.iform.vk_url.value;
    let phone = document.iform.phone.value;
    let role = document.iform.role.value;
    let vid = document.iform.vid.value;
    let exp = document.iform.area.value;
    let post = document.iform.post.value;
    insertData(db, fio, groupa, vk, phone, role, vid, exp, post);
    alert('Участник зарегестрирован успешно');
    return true;
}


// Вывод данных
function dateView(db){
    let table = document.getElementById('table');
    db.transaction(function (t) { 
        t.executeSql("SELECT * FROM uchastn", [], 
        function (tran, r) {
            for (let i = 0; i < r.rows.length; i++) {
                var fio = r.rows.item(i).fio;
                var groupa = r.rows.item(i).groupa;
                var vk = r.rows.item(i).vk;
                var phone = r.rows.item(i).phone;
                var role = r.rows.item(i).role;
                var vid = r.rows.item(i).vid;
                var exp = r.rows.item(i).exp;
                var post = r.rows.item(i).post;
                table.innerHTML += `<div class="head_row">
                <span>${fio}</span>
                <span>${groupa}</span>
                <span>${vk}</span>
                <span>${phone}</span>
                <span>${role}</span>
                <span>${vid}</span>
                <span>${exp}</span>
                <span>${post}</span>
            </div>`
            }
        }
        );
    });
}

function deleteDate(db){
    db.transaction(function (e) { 
        e.executeSql("DROP TABLE uchastn"); 
    }); 
}