

var admins = [
    {
        id: '1',
        username: 'admin', 
        passwordHash: '$2a$06$6VBvrHvPr61GF/DZg313guozRNKimzK137XQph91jhDOaBAPBmFFG' // 1234
    }
]

const getById = (id) => {

    // simulate db connection
    return new Promise((resolve, reject) => {
        admins.forEach((admin) => {
            if (id == admin.username) {
                resolve(admin);
            }
        });
        reject("User not found");
    })
}

module.exports = {getById};