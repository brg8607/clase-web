
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}


function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(nombre, email, password) {
    const users = getUsers();
    

    if (users.find(user => user.email === email)) {
        return { success: false, message: 'Este correo ya está registrado' };
    }
    

    const newUser = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        password: password,
        fechaRegistro: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Usuario registrado exitosamente' };
}


function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {

        const session = {
            userId: user.id,
            nombre: user.nombre,
            email: user.email,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentSession', JSON.stringify(session));
        return { success: true, user: user };
    }
    
    return { success: false, message: 'Correo o contraseña incorrectos' };
}


function getCurrentSession() {
    const session = localStorage.getItem('currentSession');
    return session ? JSON.parse(session) : null;
}


function logoutUser() {
    localStorage.removeItem('currentSession');
}


function isLoggedIn() {
    return getCurrentSession() !== null;
}
