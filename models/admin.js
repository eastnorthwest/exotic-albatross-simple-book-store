

const Admin = () => {

    var admins = [
        {
            id: '1',
            username: 'admin', 
            passwordHash: '$2a$06$6VBvrHvPr61GF/DZg313guozRNKimzK137XQph91jhDOaBAPBmFFG' // 1234
        }
    ]

    const getById = (id) => {
        admins.forEach((admin) => {
            if (id == admin.id) {
                return admin;
            }
        })
        return false;
    }
}

module.exports = Admin;