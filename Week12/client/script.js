const API_URL = 'http://localhost:3001';

let token = localStorage.getItem('token');
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            currentUser = JSON.parse(userStr);
            showDashboard();
        } else {
            showLogin();
        }
    } else {
        showLogin();
    }
});


function showLogin() {
    document.getElementById('auth-view').classList.remove('hidden');
    document.getElementById('dashboard-view').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    
    document.getElementById('user-info').textContent = 
        `Hi, ${currentUser.email} (${currentUser.role})`;
    
    loadData();
}


async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            token = data.token;
            currentUser = data.user;
            // 存入 LocalStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(currentUser));
            
            alert('登入成功！');
            showDashboard();
        } else {
            alert('登入失敗: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('伺服器連線錯誤');
    }
}

async function handleRegister() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    try {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        const data = await res.json();

        if (res.ok) {
            alert('註冊成功！請切換到登入分頁進行登入。');
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-password').value = '';
        } else {
            alert('註冊失敗: ' + data.error);
        }
    } catch (err) {
        alert('伺服器連線錯誤');
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token = null;
    currentUser = null;
    showLogin();
}

async function loadData() {
    try {
        const res = await fetch(`${API_URL}/api/signup`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.status === 401) {
            alert('Token 過期，請重新登入');
            handleLogout();
            return;
        }

        const list = await res.json();
        renderList(list);
    } catch (err) {
        console.error(err);
    }
}

async function handleAdd() {
    const name = document.getElementById('add-name').value;
    const phone = document.getElementById('add-phone').value;

    if (!name || !phone) return alert('請輸入完整資料');

    try {
        const res = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, phone })
        });

        if (res.ok) {
            document.getElementById('add-name').value = '';
            document.getElementById('add-phone').value = '';
            loadData(); 
        } else {
            alert('新增失敗');
        }
    } catch (err) {
        console.error(err);
    }
}

async function handleDelete(id) {
    if (!confirm('確定要刪除這筆資料嗎？')) return;

    try {
        const res = await fetch(`${API_URL}/api/signup/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            alert('刪除成功');
            loadData();
        } else {
            const data = await res.json();
            alert('刪除失敗: ' + data.error); 
        }
    } catch (err) {
        console.error(err);
    }
}

function renderList(data) {
    const tbody = document.getElementById('data-list');
    const emptyMsg = document.getElementById('empty-msg');
    
    tbody.innerHTML = ''; 

    if (data.length === 0) {
        emptyMsg.classList.remove('hidden');
    } else {
        emptyMsg.classList.add('hidden');
        data.forEach(item => {
            const tr = document.createElement('tr');
            const shortId = item._id.slice(-4);
            const isMine = item.ownerId === currentUser.id;
            const ownerDisplay = isMine ? '<span class="badge bg-success">我</span>' : `<small>${item.ownerId.slice(-4)}</small>`;

            tr.innerHTML = `
                <td>...${shortId}</td>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>${ownerDisplay}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="handleDelete('${item._id}')">刪除</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}