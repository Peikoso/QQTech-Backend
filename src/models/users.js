export class Users {
    constructor(user){
        this.id = user.id;
        this.firebase_uid = user.firebase_uid ?? user.firebaseUid;
        this.name = user.name;
        this.matricula = user.matricula;
        this.email = user.email;
        this.phone = user.phone;
        this.picture = user.picture;
        this.profile = user.profile;
        this.roles = user.roles;
        this.pending = user.pending;
        this.createdAt = user.created_at ?? user.createdAt;
        this.updatedAt = user.updated_at ?? user.updatedAt;
    }

    static fromArray(usersArray) {
        return usersArray.map((user) => new Users(user));
    }
}